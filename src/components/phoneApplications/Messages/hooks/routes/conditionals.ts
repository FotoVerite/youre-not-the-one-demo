import {
  AppEventsType,
  MessageAppEventsContainerType,
  MessageRouteEventDataType,
} from "@Components/appEvents/reducer/types";
import { Draft, produce } from "immer";
import moment, { Moment } from "moment";

import {
  areResolvedOptions,
  isDigestedChoosableRoute,
  isDigestedNotificationRoute,
} from "./guards";
import {
  RouteConditionsType,
  OptionsWithConditionals,
  ROUTE_STATUS_TYPE,
  AbstractDigestedRouteType,
} from "./types";
import { MESSAGE_CONTACT_NAME } from "../../constants";
import { EFFECT_TYPE, isContentWithMeta } from "../contentWithMetaTypes";
import { MessagePayloadType } from "../useConversation/digestion/types";

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
  status?: ROUTE_STATUS_TYPE,
  viewed?: MessageRouteEventDataType
) => {
  if (!viewed) {
    return false;
  }

  if (status == null) {
    return true;
  }
  return status === viewed.status;
};

const routeHasBeenBlockedCheck = (
  name: MESSAGE_CONTACT_NAME,
  messageEvents: MessageAppEventsContainerType,
  conditions: RouteConditionsType,
  conditionTime?: Moment
) => {
  const blockCondition = conditions[name]?.blocked;
  if (!blockCondition) {
    return true;
  }
  const blockedBoolean = messageEvents[name]?.blocked || false;
  const blockedAt = moment(messageEvents[name]?.blockedAt);
  conditionTime = conditionTime || moment();
  return blockedBoolean === blockCondition && conditionTime >= blockedAt;
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
      routeFinished(routeCondition.status, viewedRoutes[key]) &&
      routeChosenSelected(routeCondition.chosen, viewedRoutes[key]) &&
      routeNotChosenSelected(routeCondition.not_chosen, viewedRoutes[key])
    );
  }, true);
};

const checkConditions = (
  state: MessageAppEventsContainerType,
  conditions: RouteConditionsType
) => {
  let ret = true;
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
export const messageAppConditionsMet = (
  state: MessageAppEventsContainerType,
  conditions?: RouteConditionsType | RouteConditionsType[]
) => {
  const ret = true;
  if (conditions == null) {
    return ret;
  }
  if (Array.isArray(conditions)) {
    return conditions.reduce(
      (ret, condition) => ret || checkConditions(state, condition),
      false
    );
  }
  return ret && checkConditions(state, conditions);
};

export const mergeConditionalExchanges = (
  events: AppEventsType,
  draft: Draft<AbstractDigestedRouteType>
) => {
  if (!isDigestedChoosableRoute(draft)) return;
  const effect = draft.effects?.filter(
    (effect) =>
      effect.type === EFFECT_TYPE.CONDITIONAL_EXCHANGE &&
      messageAppConditionsMet(events.Messages, effect.conditions)
  )[0];
  if (effect) draft.routes = { ...draft.routes, ...effect.data };
};

export const removeMessagesThatConditionsHaveNotBeenMet = (
  events: AppEventsType,
  exchanges: MessagePayloadType[]
) =>
  exchanges.filter(
    (message) =>
      !isContentWithMeta(message.messageContent) ||
      messageAppConditionsMet(
        events.Messages,
        message.messageContent.conditions
      )
  );

export const removeOptionsThatConditionsHaveNotBeenMet = (
  events: AppEventsType,
  options: string[] | OptionsWithConditionals[]
) => {
  if (areResolvedOptions(options)) {
    return options;
  }
  return options
    .filter((option) => {
      return messageAppConditionsMet(events.Messages, option.conditions);
    })
    .reduce(
      (choices, optionsArray) => choices.concat(optionsArray.options),
      [] as string[]
    );
};

export const messagesConditionalCheck = (
  events: AppEventsType,
  route: AbstractDigestedRouteType
) => {
  return produce(route, (draft) => {
    mergeConditionalExchanges(events, draft);
    if (isDigestedChoosableRoute(draft)) {
      for (const option in draft.routes) {
        draft.routes[option] = removeMessagesThatConditionsHaveNotBeenMet(
          events,
          draft.routes[option]
        );
      }
    }
    if (isDigestedNotificationRoute(draft)) {
      draft.exchanges = removeMessagesThatConditionsHaveNotBeenMet(
        events,
        draft.exchanges
      );
    }
    return draft;
  });
};
