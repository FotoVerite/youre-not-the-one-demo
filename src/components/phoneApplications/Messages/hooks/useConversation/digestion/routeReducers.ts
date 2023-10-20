import {
  isChosenEvent,
  isFinishedRouteEvent,
  isProcessedEvent,
} from "@Components/appEvents/reducer/guards";
import {
  MessageAppEventsContainerType,
  MessageAppEventsType,
  MessageRouteEventDataType,
} from "@Components/appEvents/reducer/types";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ImageCacheType } from "src/contexts/imageCache/types";

import { convertBlockToMessagePayloadType } from "./convert";
import { MessagePayloadType } from "./types";
import { digestBlockAndFilterSkipped } from "./utility";
import {
  isChoosableRoute,
  isFinishedRoute,
  isStartedRoute,
  isUntriggeredRoute,
} from "../../routes/guards";
import { resolveSnapshotPayload } from "../../routes/resolver";
import {
  ChoosableRouteType,
  NotificationRouteType,
  ROUTE_TYPE,
  ROUTE_STATUS_TYPE,
  FinishedRouteType,
  AbstractDigestedRouteType,
  UntriggeredRouteType,
  StartedRouteType,
} from "../../routes/types";
import { convertMessageToString } from "../../useConversations/determineLogLine";
import {
  ConversationFileType,
  ConversationType,
} from "../../useConversations/types";

type ReturnType = {
  seen: FinishedRouteType[];
  untriggered: { [id: string]: UntriggeredRouteType };
  started?: StartedRouteType;
};

export const reduceAndSortRoutes = (
  conversation: ConversationType | ConversationFileType,
  events: MessageAppEventsContainerType,
  cache: ImageCacheType
) => {
  const routes = [
    ...conversation.routes,
    ...(conversation.notificationRoutes || []),
  ];
  const ret = routes.reduce(reduceRoute(conversation.name, events, cache), {
    seen: [] as FinishedRouteType[],
    untriggered: {},
    started: undefined,
  });
  return [
    ret.untriggered,
    ret.seen.sort((a, b) => a.position - b.position),
    ret.started,
  ] as const;
};

export const reduceRoute =
  (
    name: MESSAGE_CONTACT_NAME,
    events: MessageAppEventsContainerType,
    cache: ImageCacheType
  ) =>
  (ret: ReturnType, route: ChoosableRouteType | NotificationRouteType) => {
    let builtRoute: AbstractDigestedRouteType;
    if (isChoosableRoute(route)) {
      builtRoute = {
        ...{ name, type: ROUTE_TYPE.CHOOSE as const },
        ...digestChoosableRoute(route, events[name], cache),
      };
    } else {
      builtRoute = {
        ...{ name, type: ROUTE_TYPE.NOTIFICATION as const },
        ...digestNotificationRoute(route, events[name], cache),
      };
    }
    sortDigestedRoute(ret, builtRoute);
    return ret;
  };

const createStartedRoute = (
  event: MessageRouteEventDataType & { chosen: string },
  cache: ImageCacheType,
  route: ChoosableRouteType
) => {
  const atIndex = event.atIndex || 0;
  const payloads = convertBlockToMessagePayloadType(route.routes[event.chosen]);
  const seen = payloads.splice(0, atIndex);
  const snapshotResolver = resolveSnapshotPayload(cache);
  return {
    id: route.id.toString(),
    createdAt: event.createdAt,
    exchanges: seen.reduce((acc, payload) => {
      if (event.messageTimestamps[payload.index]) {
        payload.timestamp = event.messageTimestamps[payload.index];
        payload = snapshotResolver(payload);
        acc.push(payload);
      }
      return acc;
    }, [] as MessagePayloadType[]),
    status: ROUTE_STATUS_TYPE.STARTED as const,
    indexAt: atIndex,
    nextMessageInQueue: convertMessageToString(payloads[0].messageContent),
    pending: payloads,
    position: event.position,
    updatedAt: event.updatedAt,
  };
};

const digestNotificationRoute = (
  route: NotificationRouteType,
  events: MessageAppEventsType,
  cache: ImageCacheType
) => {
  const { id, exchanges } = route;
  const routeId = id.toString();
  const routeEvent = events.routes[routeId];
  const snapshotResolver = resolveSnapshotPayload(cache);
  if (!isProcessedEvent(routeEvent)) {
    return {
      id: routeId,
      exchanges: convertBlockToMessagePayloadType(exchanges),
      status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET as const,
    };
  }
  return {
    id: routeId,
    createdAt: routeEvent.createdAt,
    exchanges: digestBlockAndFilterSkipped(
      exchanges,
      routeEvent.messageTimestamps
    ).map(snapshotResolver),
    status: ROUTE_STATUS_TYPE.FINISHED as const,
    position: routeEvent.position,
    updatedAt: routeEvent.updatedAt,
  };
};

const digestChoosableRoute = (
  route: ChoosableRouteType,
  events: MessageAppEventsType,
  cache: ImageCacheType
) => {
  const { id, routes } = route;
  const routeId = id.toString();
  const routeEvent = events.routes[id.toString()];
  const snapshotResolver = resolveSnapshotPayload(cache);

  if (!isChosenEvent(routeEvent)) {
    const payloads = Object.entries(routes).reduce(
      (ret, [choice, route]) => {
        ret[choice] = convertBlockToMessagePayloadType(route);
        return ret;
      },
      {} as { [choice: string]: MessagePayloadType[] }
    );
    return {
      ...route,
      id: routeId,
      routes: payloads,
      status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET as const,
    };
  }
  if (isFinishedRouteEvent(routeEvent)) {
    return {
      id: routeId,
      createdAt: routeEvent.createdAt,
      exchanges: digestBlockAndFilterSkipped(
        routes[routeEvent.chosen],
        routeEvent.messageTimestamps
      ).map(snapshotResolver),
      status: ROUTE_STATUS_TYPE.FINISHED as const,
      position: routeEvent.position,
      updatedAt: routeEvent.updatedAt,
    };
  }
  return createStartedRoute(routeEvent, cache, route);
};

const sortDigestedRoute = (
  ret: ReturnType,
  route: AbstractDigestedRouteType
) => {
  if (isFinishedRoute(route)) {
    ret.seen.push(route);
  }
  if (isStartedRoute(route)) {
    ret.started = route;
  }
  if (isUntriggeredRoute(route)) {
    ret.untriggered[route.id] = route;
  }
};
