import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_CONTACT_CONVERSATIONS_OPTIONS } from "./contact_conversation";
import { ZARA_ROUTE_IDS } from "./routes";

export enum ZARA_CAN_I_HAVE_MILEENA {
  A = "Can I have Mel's number also.",
}

const OPTIONS = ZARA_CAN_I_HAVE_MILEENA;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const can_i_have_mileena: MessageRouteType = {
  id: ZARA_ROUTE_IDS.CAN_I_HAVE_MILEENA,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.CONTACT_CONVERSATION]: {
          not_chosen: [ZARA_CONTACT_CONVERSATIONS_OPTIONS.A],
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A, "I need to talk to her about our workout"],
      },
      {
        name: ZARA,
        messages: [
          "Ok, let me know if you need anyone else.",
          { type: MESSAGE_CONTENT.EMOJI, content: "🏋🏼‍♀️" },

          {
            type: MESSAGE_CONTENT.VCARD,
            content: MESSAGE_CONTACT_NAME.MILEENA,
          },
        ],
      },
    ],
  },
};
