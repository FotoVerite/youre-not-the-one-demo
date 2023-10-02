import { AppEventsType } from "@Components/appEvents/reducer/types";

import { DigestedConversationType, hasBlockableConditions } from "./types";
import { messageAppConditionsMet } from "../../routes/conditionals";

export const blockableConditionsMet = (
  draft: DigestedConversationType,
  events: AppEventsType,
) => {
  if (!hasBlockableConditions(draft)) return draft.blockable;
  return messageAppConditionsMet(events.Messages, draft.blockable.conditions)
    ? true
    : draft.blockable;
};
