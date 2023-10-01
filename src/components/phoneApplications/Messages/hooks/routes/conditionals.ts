import {
  AppEventsType,
  MessageAppEventsContainerType,
  MessageRouteEventDataType,
} from "@Components/appEvents/reducer/types";

import {
  MessageRouteType,
  NotificationRouteType,
  RouteConditionsType,
} from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import { EFFECT_TYPE } from "../contentWithMetaTypes";
import { choosableRoute } from "../useConversation/digestion/types";
import { ExchangeBlockType } from "../useConversations/types";

const contactHasBeenViewedCheck = (
  name: MESSAGE_CONTACT_NAME,
  messageEvents: MessageAppEventsContainerType,
  conditions: RouteConditionsType
) => {
  const viewCondition = conditions[name]?.views;
  if (viewCondition == null) {
    return true;
  }
  const viewedAmount = messageEvents[name]?.views.length || 0;
  let ret = true;
  if (viewCondition.lt) {
    ret = ret && viewedAmount < viewCondition.lt;
  }
  if (viewCondition.lte) {
    ret = ret && viewedAmount <= viewCondition.lte;
  }
  if (viewCondition.gt) {
    ret = ret && viewedAmount > viewCondition.gt;
  }
  if (viewCondition.gte) {
    ret = ret && viewedAmount >= viewCondition.gte;
  }
  return ret;
};

const routeChosenSelected = (
  chosen?: string[],
  viewed?: MessageRouteEventDataType
) => {
  if (!viewed) {
    return false;
  }

  if (chosen == null) {
    return true;
  }

  if (!viewed.chosen) {
    return false;
  }
  return chosen.includes(viewed.chosen);
};

const routeNotChosenSelected = (
  not_chosen?: string[],
  viewed?: MessageRouteEventDataType
) => {
  if (!viewed) {
    return false;
  }

  if (not_chosen == null) {
    return true;
  }

  if (!viewed.chosen) {
    return false;
  }
  return !not_chosen.includes(viewed.chosen);
};

const routeFinished = (
  finished?: boolean,
  viewed?: MessageRouteEventDataType
) => {
  if (!viewed) {
    return false;
  }

  if (finished == null) {
    return true;
  }
  return finished === viewed.finished;
};

const routeHasBeenBlockedCheck = (
  name: MESSAGE_CONTACT_NAME,
  messageEvents: MessageAppEventsContainerType,
  conditions: RouteConditionsType
) => {
  const blockCondition = conditions[name]?.blocked;
  if (!blockCondition) {
    return true;
  }
  const blockedBoolean = messageEvents[name]?.blocked || false;
  return blockedBoolean === blockCondition;
};

const routeHasBeenChosenCheck = (
  name: MESSAGE_CONTACT_NAME,
  messageEvents: MessageAppEventsContainerType,
  conditions: RouteConditionsType
) => {
  const routeConditions = conditions[name]?.routes || {};
  const routeConditionsKeys = Object.keys(routeConditions);
  if (routeConditionsKeys.length === 0) {
    return true;
  }
  const viewedRoutes = messageEvents[name]?.routes || {};
  return routeConditionsKeys.reduce((acc, key) => {
    const routeCondition = routeConditions[key] || [];
    return (
      acc &&
      viewedRoutes[key] != null &&
      routeFinished(routeCondition.finished, viewedRoutes[key]) &&
      routeChosenSelected(routeCondition.chosen, viewedRoutes[key]) &&
      routeNotChosenSelected(routeCondition.not_chosen, viewedRoutes[key])
    );
  }, true);
};

export const messageAppConditionsMet = (
  state: MessageAppEventsContainerType,
  conditions?: RouteConditionsType
) => {
  let ret = true;
  if (conditions == null) {
    return ret;
  }
  Object.keys(conditions).forEach((key: string) => {
    ret =
      ret &&
      contactHasBeenViewedCheck(key as MESSAGE_CONTACT_NAME, state, conditions);
    ret =
      ret &&
      routeHasBeenChosenCheck(key as MESSAGE_CONTACT_NAME, state, conditions);
    ret =
      ret &&
      routeHasBeenBlockedCheck(key as MESSAGE_CONTACT_NAME, state, conditions);
  });
  return ret;
};

export const mergeEffects = <
  AvailableRouteType extends NotificationRouteType | MessageRouteType,
>(
  route: AvailableRouteType,
  events: AppEventsType
): AvailableRouteType => {
  if (!choosableRoute(route)) return route;
  const exchange = route.effects?.filter(
    (effect) =>
      effect.type === EFFECT_TYPE.CONDITIONAL_EXCHANGE &&
      messageAppConditionsMet(events.Messages, effect.conditions)
  )[0];
  if (exchange)
    return {
      ...route,
      ...{
        routes: exchange.data as {
          [key: string]: ExchangeBlockType[];
        },
      },
    };
  return route;
};
