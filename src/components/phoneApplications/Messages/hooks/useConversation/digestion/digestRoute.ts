import { MessageAppEventsContainerType } from "@Components/appEvents/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import moment, { Moment } from "moment";

import { createSkBubbleFromPayload } from "./SkFunctions/createSkBubble";
import { createTimeStampLabel } from "./SkFunctions/createTimeStampLabel";
import {
  BaseConfigType,
  DigestedConversationListItem,
  DigestedConversationType,
  MessagePayloadType,
  SkItemConfigurationType,
} from "./types";
import { digestBlockAndFilterSkipped, getListHeight } from "./utility";
import { isChoosableRoute } from "../../routes/guards";
import {
  FinishedRouteType,
  StartedRouteType,
  DigestedRoutesType,
  ChoosableRouteType,
  NotificationRouteType,
  ROUTE_TYPE,
  ROUTE_STATE_TYPE,
  DigestedRouteType,
  OptionsWithConditionals,
} from "../../routes/types";
import { convertMessageToString } from "../../useConversations/determineLogLine";
import {
  ConversationExchangeType,
  ConversationType,
  ExchangeBlockType,
} from "../../useConversations/types";

export const appendSeenRoutes = (
  digested: DigestedConversationType,
  seenRoutes: FinishedRouteType[],
  config: BaseConfigType
) => {
  return seenRoutes.reduce((digestedExchanges, route) => {
    return appendFromDigestedRoute(
      digestedExchanges,
      route,
      digested.group,
      config
    );
  }, digested.exchanges);
};

export const appendFromDigestedRoute = (
  exchanges: DigestedConversationListItem[],
  route: FinishedRouteType | StartedRouteType,
  group: boolean = false,
  config: BaseConfigType
) => {
  const offset = getListHeight(exchanges);
  const itemConfiguration: SkItemConfigurationType = {
    font: config.font,
    emojiFont: config.emojiFont,
    width: config.width,
    offset,
    group,
  };
  return exchanges.concat(
    convertFromPayloadsToSkItems(
      itemConfiguration,
      route.exchanges,
      route.createdAt
    )
  );
};

export const convertBlockToMessagePayloadType = (
  block: ExchangeBlockType[],
  time?: Moment
) => {
  let blockIndex = 0;
  const timestamp = time ? time : undefined;
  return block.reduce((ret, exchange) => {
    const name = exchange.name;
    const size = exchange.messages.length - 1;
    return ret.concat(
      exchange.messages.map((messageContent, index) => {
        const message = {
          messageContent,
          name,
          isLastInExchange: size === index,
          index: blockIndex,
          timestamp: timestamp ? timestamp.toISOString() : undefined,
        } as MessagePayloadType;
        blockIndex += 1;
        if (timestamp) timestamp.add(30);
        return message;
      })
    );
  }, [] as MessagePayloadType[]);
};

export const convertFromPayloadsToSkItems = (
  configuration: SkItemConfigurationType,
  payloads: MessagePayloadType[],
  time: string | Date
) => {
  const skTime = createTimeStampLabel(
    time,
    configuration.width,
    configuration.offset
  );
  configuration.offset += skTime.height;
  return payloads.reduce(
    (ret, payload) => {
      const item = createSkBubbleFromPayload(configuration, payload);
      configuration.offset += item.height + item.paddingBottom;
      ret.push(item);
      return ret;
    },
    [skTime] as DigestedConversationListItem[]
  );
};

export const digestExchanges = (
  configuration: BaseConfigType,
  conversationExchanges: ConversationExchangeType[],
  group: boolean = false,
  offset: number = 50
) => {
  const itemConfiguration: SkItemConfigurationType = {
    font: configuration.font,
    emojiFont: configuration.emojiFont,
    width: configuration.width,
    offset,
    group,
  };
  return conversationExchanges.reduce((ret, block) => {
    const payloads = convertBlockToMessagePayloadType(
      block.exchanges,
      moment(block.time)
    );
    return ret.concat(
      convertFromPayloadsToSkItems(itemConfiguration, payloads, block.time)
    );
  }, [] as DigestedConversationListItem[]);
};

export const convertRoutesToDigestedRoutes = (
  conversation: ConversationType,
  events: MessageAppEventsContainerType
) => {
  const ret = conversation.routes.reduce(reduceRoute(conversation, events), {
    seen: [],
    available: {},
    started: undefined,
  });
  conversation.notificationRoutes?.reduce(
    reduceRoute(conversation, events),
    ret
  );
  return [
    ret.available,
    ret.seen.sort((a, b) => a.position - b.position),
    ret.started,
  ] as const;
};

const reduceRoute =
  (conversation: ConversationType, events: MessageAppEventsContainerType) =>
  (
    ret: DigestedRoutesType,
    route: ChoosableRouteType | NotificationRouteType
  ) => {
    const { id, ...routeProps } = route;
    const routeID = id.toString();
    const baseRoute = {
      ...routeProps,
      ...{
        id: routeID,
        name: conversation.name,
        order: Object.keys(ret).length + 1,
      },
    };
    let builtRoute;
    if (isChoosableRoute(route)) {
      builtRoute = {
        ...baseRoute,
        ...{ type: ROUTE_TYPE.CHOOSE as const },
        ...digestChoosableRoute(
          conversation.name,
          routeID,
          route.options,
          route.routes,
          events
        ),
      };
    } else {
      builtRoute = {
        ...baseRoute,
        ...{ type: ROUTE_TYPE.NOTIFICATION as const },
        ...digestNotificationRouteType(
          conversation.name,
          routeID,
          route.exchanges,
          events
        ),
      };
    }
    sortDigestedRoute(ret, builtRoute);
    return ret;
  };

const digestChoosableRoute = (
  name: MESSAGE_CONTACT_NAME,
  routeId: string,
  options: string[] | OptionsWithConditionals[],
  routes: { [choice: string]: ExchangeBlockType[] },
  events: MessageAppEventsContainerType
) => {
  const routeEvent = events[name].routes[routeId];
  if (routeEvent == null || !routeEvent.chosen) {
    const payloads = Object.entries(routes).reduce(
      (ret, [choice, route]) => {
        ret[choice] = convertBlockToMessagePayloadType(route);
        return ret;
      },
      {} as { [choice: string]: MessagePayloadType[] }
    );
    return {
      routes: payloads,
      options,
      finished: ROUTE_STATE_TYPE.NOT_STARTED as const,
    };
  }
  if (routeEvent.finished) {
    return {
      createdAt: routeEvent.createdAt,
      exchanges: digestBlockAndFilterSkipped(
        routes[routeEvent.chosen],
        routeEvent.messageTimestamps
      ),
      finished: ROUTE_STATE_TYPE.FINISHED as const,
      position: routeEvent.position,
      updatedAt: routeEvent.updatedAt,
    };
  }
  const atIndex = routeEvent.atIndex || 0;
  const payloads = convertBlockToMessagePayloadType(routes[routeEvent.chosen]);
  const seen = payloads.splice(0, atIndex);
  return {
    createdAt: routeEvent.createdAt,
    exchanges: seen.reduce((acc, payload) => {
      if (routeEvent.messageTimestamps[payload.index]) {
        payload.timestamp = routeEvent.messageTimestamps[payload.index];
        acc.push(payload);
      }
      return acc;
    }, [] as MessagePayloadType[]),
    finished: ROUTE_STATE_TYPE.STARTED as const,
    indexAt: atIndex,
    nextMessageInQueue: convertMessageToString(payloads[0].messageContent),
    pending: payloads,
    position: routeEvent.position,
    updatedAt: routeEvent.updatedAt,
  };
};

const digestNotificationRouteType = (
  name: MESSAGE_CONTACT_NAME,
  routeId: string,
  exchanges: ExchangeBlockType[],
  events: MessageAppEventsContainerType
) => {
  const routeEvent = events[name].routes[routeId];
  if (routeEvent == null || !routeEvent.finished) {
    return {
      exchanges: convertBlockToMessagePayloadType(exchanges),
      finished: ROUTE_STATE_TYPE.NOT_STARTED as const,
    };
  }
  return {
    createdAt: routeEvent.createdAt,
    exchanges: digestBlockAndFilterSkipped(
      exchanges,
      routeEvent.messageTimestamps
    ),
    finished: ROUTE_STATE_TYPE.FINISHED as const,
    position: routeEvent.position,
    updatedAt: routeEvent.updatedAt,
  };
};

const sortDigestedRoute = (
  ret: DigestedRoutesType,
  route: DigestedRouteType | FinishedRouteType | StartedRouteType
) => {
  if (route.finished === ROUTE_STATE_TYPE.FINISHED) {
    ret.seen.push(route);
  }
  if (route.finished === ROUTE_STATE_TYPE.STARTED) {
    ret.started = route;
  }
  if (route.finished === ROUTE_STATE_TYPE.NOT_STARTED) {
    ret.available[route.id] = route;
  }
};
