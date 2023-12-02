import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "../../spam1/routes/routes";
import { ZARA_ROUTE_IDS } from "../../zara/routes/routes";
import { ANTAGONIST_IF_BLOCKED } from "../routes/routes";

export const dont_you_miss_me = {
  id: ANTAGONIST_IF_BLOCKED.DONT_YOU_MISS_ME,
  delay: 500,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM1]: {
      blocked: true,
      routes: {
        [SPAM1_IDS.DID_SEND_IMAGES_NOTIFICATION]: {
          status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET,
        },
        [SPAM1_IDS.DID_NOT_SEND_IMAGES_NOTIFICATION]: {
          status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET,
        },
      },
    },
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.I_DONT_FEEL_SECURE]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.SPAM2,
      messages: ["Don't you miss me?"],
    },
  ],
};
