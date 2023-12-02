import {
  AppEventsType,
  MessageAppEventsContainerType,
  MessageRouteEventDataType,
} from "@Components/appEvents/reducer/types";
import { Draft, produce } from "immer";
import moment, { Moment } from "moment";

import {
  isDigestedChoosableRoute,
  isDigestedNotificationRoute,
} from "./guards";
import {
  RouteConditionsType,
  ROUTE_STATUS_TYPE,
  AbstractDigestedRouteType,
  OptionType,
  DigestedNotificationRouteType,
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
  if (chosen == null) {
    return true;
  }

  if (!viewed) {
    return false;
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
  if (not_chosen == null) {
    return true;
  }
  if (!viewed) {
    return false;
  }
  if (!viewed.chosen) {
    return false;
  }
  return !not_chosen.includes(viewed.chosen);
};

const routeStatus = (
  status?: ROUTE_STATUS_TYPE,
  viewed?: MessageRouteEventDataType
) => {
  //There will be no record if the conditions have not been met
  if (status === ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET && !viewed) {
    return true;
  }

  if (!viewed) {
    return false;
  }

  if (status == null) {
    return true;
  }
  return status === viewed.status;
};

const routeTimeSince = (
  timeSinceInMilliseconds?: number,
  viewed?: MessageRouteEventDataType
) => {
  if (!timeSinceInMilliseconds) {
    return true;
  }
  if (!viewed) {
    return false;
  }
  return (
    moment(viewed.updatedAt).add(timeSinceInMilliseconds, "milliseconds") <
    moment()
  );
};

const routeHasBeenBlockedCheck = (
  name: MESSAGE_CONTACT_NAME,
  messageEvents: MessageAppEventsContainerType,
  conditions: RouteConditionsType,
  conditionTime?: Moment
) => {
  const blockCondition = conditions[name]?.blocked;
  if (blockCondition == null) {
    return true;
  }
  if (blockCondition === false) {
    return !messageEvents[name]?.blocked;
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
      routeStatus(routeCondition.status, viewedRoutes[key]) &&
      routeTimeSince(routeCondition.timeSince, viewedRoutes[key]) &&
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

export const repeatableTimePassed = (
  state: MessageAppEventsContainerType,
  route: DigestedNotificationRouteType
) => {
  const ret = true;
  if (route?.repeatable == null) {
    return ret;
  }
  const name = route.name;
  const viewedRoutes = state[name]?.routes || {};
  const eventCreated = viewedRoutes[route.id]?.createdAt;
  if (!eventCreated) {
    return ret;
  }
  const timeToRepeat = moment(eventCreated).add(
    route.repeatable,
    "millisecond"
  );
  return timeToRepeat < moment();
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
  options: OptionType[]
) => {
  return options.filter((option) => {
    return messageAppConditionsMet(events.Messages, option.conditions);
  });
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
