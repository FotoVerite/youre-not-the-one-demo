import { AppEventsType } from "@Components/appEvents/reducer/types";

import {
  convertBlockToMessagePayloadType,
  convertFromPayloadsToSkItems,
} from "./digestRoute";
import {
  BaseConfigType,
  DigestedConversationType,
  MessagePayloadType,
  SkItemConfigurationType,
} from "./types";
import { getListHeight } from "./utility";
import { getUnfinishedRouteID } from "../../routes/seen";
import { convertMessageToString } from "../../useConversations/determineLogLine";

export const digestUnfinishedRoute = (
  digested: DigestedConversationType,
  events: AppEventsType,
  config: BaseConfigType
) => {
  const unfinishedID = getUnfinishedRouteID(
    digested.name,
    events,
    digested.routes || []
  );
  if (unfinishedID) {
    const skConfig = {
      ...config,
      ...{
        group: digested.group || false,
        offset: getListHeight(digested.exchanges),
      },
    };
    digestPathFromUnfinishedID(unfinishedID, digested, events, skConfig);
  }
  return digested;
};

export const digestPathFromUnfinishedID = (
  ID: string,
  digested: DigestedConversationType,
  events: AppEventsType,
  config: SkItemConfigurationType
) => {
  const event = events.Messages[digested.name].routes[ID];
  const route = digested.routes?.find((r) => r.id.toString() === ID);
  if (event && route && event.chosen && event.atIndex) {
    const path = convertBlockToMessagePayloadType(route.routes[event.chosen]);
    const seen = path.splice(0, event.atIndex);
    appendUnfinishedPath(
      config,
      digested,
      event.chosen,
      event.updatedAt,
      seen,
      path
    );
  }
  return digested;
};

const appendUnfinishedPath = (
  config: SkItemConfigurationType,
  digested: DigestedConversationType,
  chosen: string,
  timestamp: string | Date,
  seen: MessagePayloadType[],
  pending: MessagePayloadType[]
) => {
  digested.exchanges = digested.exchanges.concat(
    convertFromPayloadsToSkItems(config, seen, timestamp)
  );

  digested.routeAtIndex = seen.length;
  digested.chosenRoute = chosen;
  digested.activePath = pending;
  digested.nextMessageInQueue = convertMessageToString(
    pending[0].messageContent
  );
};
