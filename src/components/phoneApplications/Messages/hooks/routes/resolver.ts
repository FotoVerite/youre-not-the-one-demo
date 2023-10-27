import { AppEventsType } from "@Components/appEvents/reducer/types";
import { produce } from "immer";
import { isSkImage } from "src/contexts/imageCache/guards";
import { ImageCacheType } from "src/contexts/imageCache/types";

import {
  removeMessagesThatConditionsHaveNotBeenMet,
  removeOptionsThatConditionsHaveNotBeenMet,
} from "./conditionals";
import {
  isDigestedChoosableRoute,
  isDigestedNotificationRoute,
} from "./guards";
import { AbstractDigestedRouteType, DigestedChoosableRouteType } from "./types";
import { isSnapshot } from "../contentWithMetaTypes";
import { MessagePayloadType } from "../useConversation/digestion/types";

type PathsType = { [id: string]: MessagePayloadType[] };

export const resolveRoutePath = (
  events: AppEventsType,
  cache: ImageCacheType,
  payloads: MessagePayloadType[]
) => {
  const mapper = resolveSnapshotPayload(cache);
  return removeMessagesThatConditionsHaveNotBeenMet(events, payloads).map(
    mapper
  );
};

export const resolveSnapshotPayload =
  (cache: ImageCacheType) => (payload: MessagePayloadType) => {
    if (isSnapshot(payload.messageContent)) {
      const image = cache[payload.messageContent.content.filename];
      if (image && isSkImage(image)) {
        return produce(payload, (draft) => {
          if (isSnapshot(draft.messageContent)) {
            draft.messageContent.content.image = image;
          }
          return draft;
        });
      }
    }
    return payload;
  };

export const resolveRoutes = (
  events: AppEventsType,
  cache: ImageCacheType,

  route: DigestedChoosableRouteType
) => {
  return Object.entries(route.routes).reduce((acc, [id, route]) => {
    const payload = resolveRoutePath(events, cache, route);
    acc[id] = payload;
    return acc;
  }, {} as PathsType);
};

export const resolveRoutesPath = (
  events: AppEventsType,
  cache: ImageCacheType,
  route: AbstractDigestedRouteType
) => {
  if (isDigestedChoosableRoute(route)) {
    route.options = removeOptionsThatConditionsHaveNotBeenMet(
      events,
      route.options
    );
    route.routes = resolveRoutes(events, cache, route);
  }
  if (isDigestedNotificationRoute(route)) {
    route.exchanges = resolveRoutePath(events, cache, route.exchanges);
  }
  return route;
};
