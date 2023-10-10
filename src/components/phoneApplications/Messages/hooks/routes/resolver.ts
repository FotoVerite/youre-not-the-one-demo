import { AppEventsType } from "@Components/appEvents/reducer/types";

import { removeMessagesThatConditionsHaveNotBeenMet } from "./conditionals";
import { isDigestedChoosableRoute } from "./guards";
import {
  DigestedChoosableRouteType,
  DigestedNotificationRouteType,
} from "./types";
import { resolveSnapshotPayload } from "../useConversation/digestion/snapshotResolver";
import { MessagePayloadType } from "../useConversation/digestion/types";

type PathsType = { [id: string]: MessagePayloadType[] };

export const resolveRoutePath = async (
  width: number,
  events: AppEventsType,
  payloads: MessagePayloadType[]
) => {
  const resolver = new Promise<MessagePayloadType[]>((resolve, reject) => {
    resolve([] as MessagePayloadType[]);
  });
  return removeMessagesThatConditionsHaveNotBeenMet(events, payloads).reduce(
    resolveSnapshotPayload(width),
    resolver
  );
};

export const asyncResolveRoutes = async (
  width: number,
  events: AppEventsType,
  route: DigestedChoosableRouteType
) => {
  return await Object.entries(route.routes).reduce(
    async (memo, [id, route]) => {
      const acc = await memo;
      const payload = await resolveRoutePath(width, events, route);
      acc[id] = payload;
      return acc;
    },
    Promise.resolve({} as PathsType)
  );
};

export const resolveRoutesPath = async <
  AvailableRouteType extends
    | DigestedChoosableRouteType
    | DigestedNotificationRouteType,
>(
  width: number,
  events: AppEventsType,
  route: AvailableRouteType
) => {
  if (isDigestedChoosableRoute(route)) {
    return await asyncResolveRoutes(width, events, route);
  } else {
    return await resolveRoutePath(width, events, route.exchanges);
  }
};
