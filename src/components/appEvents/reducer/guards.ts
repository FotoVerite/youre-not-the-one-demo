import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { MessageRouteEventDataType } from "./types";

const PROCESSED_TYPE = [ROUTE_STATUS_TYPE.STARTED, ROUTE_STATUS_TYPE.FINISHED];

export const isChosenEvent = (
  event?: MessageRouteEventDataType
): event is MessageRouteEventDataType & {
  chosen: string;
  status: ROUTE_STATUS_TYPE.STARTED | ROUTE_STATUS_TYPE.FINISHED;
} => {
  return event != null && event.chosen != null;
};
export const isProcessedEvent = (
  event?: MessageRouteEventDataType
): event is MessageRouteEventDataType & {
  status: ROUTE_STATUS_TYPE.STARTED | ROUTE_STATUS_TYPE.FINISHED;
} => {
  return event != null && PROCESSED_TYPE.includes(event.status);
};

export const isFinishedRouteEvent = (
  event?: MessageRouteEventDataType
): event is MessageRouteEventDataType & {
  status: ROUTE_STATUS_TYPE.FINISHED;
} => {
  return event != null && event.status === ROUTE_STATUS_TYPE.FINISHED;
};

export const hasLogline = (
  event?: MessageRouteEventDataType
): event is MessageRouteEventDataType & {
  logline: string;
} => {
  return event != null && event.logline != null;
};
