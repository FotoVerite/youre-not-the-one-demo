import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ANTAGONIST_IF_BLOCKED } from "../routes/routes";

export const why_dont_you_respond = {
  id: ANTAGONIST_IF_BLOCKED.WHY_DONT_YOU_RESPOND,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM2]: {
      routes: {
        [ANTAGONIST_IF_BLOCKED.DONT_YOU_MISS_ME]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
          timeSince: 15000,
        },
        [ANTAGONIST_IF_BLOCKED.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
          status: ROUTE_STATUS_TYPE.AVAILABLE,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.SPAM2,
      messages: ["Why don't you reply?", "You just want to ignore me"],
    },
  ],
};
