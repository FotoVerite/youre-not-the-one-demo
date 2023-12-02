import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ANTAGONIST_IF_BLOCKED } from "../routes/routes";

export const why_dont_you_respond2 = {
  id: ANTAGONIST_IF_BLOCKED.WHY_DONT_YOU_RESPOND2,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM2]: {
      routes: {
        [ANTAGONIST_IF_BLOCKED.WHY_DONT_YOU_RESPOND]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
          timeSince: 12000,
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
      messages: [
        {
          type: MESSAGE_CONTENT.STRING,
          content: "Why don't you reply?",
        },
        {
          type: MESSAGE_CONTENT.STRING,
          content: "You just want to ignore me",
        },
      ],
    },
  ],
};
