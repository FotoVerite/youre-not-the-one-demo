import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_CONTACT_CONVERSATIONS_OPTIONS } from "./contact_conversation";
import { ZARA_ROUTE_IDS } from "./routes";

export enum ZARA_I_NEED_CHRIS_OPTIONS {
  A = "I actually could use Chris' contact also",
}

const OPTIONS = ZARA_I_NEED_CHRIS_OPTIONS;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const can_i_have_chris: MessageRouteType = {
  id: ZARA_ROUTE_IDS.CAN_I_HAVE_CHRIS,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.CONTACT_CONVERSATION]: {
          not_chosen: [ZARA_CONTACT_CONVERSATIONS_OPTIONS.B],
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      { name: SELF, messages: [OPTIONS.A] },
      {
        name: ZARA,
        messages: [
          "Alrighty.",
          {
            type: MESSAGE_CONTENT.VCARD,
            content: MESSAGE_CONTACT_NAME.CHRIS,
          },
        ],
      },
    ],
  },
};
