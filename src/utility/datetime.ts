import moment, { Moment } from "moment";

export const formatNotificationDate = (date: Moment): string => {
  const now = moment();
  if (now.diff(date, "day") === 0) {
    return date.format("h:mm a");
  } else if (now.diff(date, "week") === 0) {
    return date.format("dddd");
  } else {
    return date.format("MM/DD/YYYY");
  }
};
