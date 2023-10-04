import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { ChoosableRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";

export enum ZARA_CONTACT_CONVERSATIONS_OPTIONS {
  A = "Yeah, give me Mileena",
  B = "Yeah I need to talk to Chris",
}

const OPTIONS = ZARA_CONTACT_CONVERSATIONS_OPTIONS;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const zara_contact_conversation: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.CONTACT_CONVERSATION,
  options: Object.values(OPTIONS),
  conditions: {
    [ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.DO_YOU_WANT_ANY_CONTACTS]: {},
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      { name: SELF, messages: [OPTIONS.A] },
      {
        name: ZARA,
        messages: [
          "Okay.",
          {
            type: MESSAGE_CONTENT.VCARD,
            content: MESSAGE_CONTACT_NAME.MILEENA,
            reaction: { name: "heart", color: "#dc1d1d", delay: 3000 },
          },
        ],
      },
    ],
    [OPTIONS.B]: [
      { name: SELF, messages: [OPTIONS.B] },
      {
        name: ZARA,
        messages: [
          "Okay.",
          {
            type: MESSAGE_CONTENT.VCARD,
            content: MESSAGE_CONTACT_NAME.CHRIS,
            reaction: { name: "heart", color: "#dc1d1d", delay: 3000 },
          },
        ],
      },
    ],
  },
};
