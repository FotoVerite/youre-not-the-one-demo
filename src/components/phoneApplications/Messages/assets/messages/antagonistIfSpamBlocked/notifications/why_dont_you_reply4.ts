import {
  MESSAGE_CONTACT_NAME,
  SNAPSHOT_NAMES,
} from "@Components/phoneApplications/Messages/constants";
import {
  EFFECT_TYPE,
  MESSAGE_CONTENT,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ANTAGONIST_IF_BLOCKED } from "../routes/routes";

export const why_dont_you_respond4 = {
  id: ANTAGONIST_IF_BLOCKED.WHY_DONT_YOU_RESPOND4,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM2]: {
      routes: {
        [ANTAGONIST_IF_BLOCKED.WHY_DONT_YOU_RESPOND3]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
          timeSince: 5000,
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
          content: "You're right to feel so out of Michael's league",
        },
      ],
    },
  ],
};
