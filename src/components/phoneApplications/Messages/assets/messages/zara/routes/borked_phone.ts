import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";

export enum BORKED_PHONE_OPTIONS {
  A = "OMG human interaction!",
}

const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

// Description: OP and ZARA discuss why OP has no contacts in his phone.
// Point: Give context for the setting of the game and set tone of most messages.

export const borked_phone: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.BORKED_PHONE,
  options: Object.values(BORKED_PHONE_OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.HOW_IS_THE_PHONE_COMING]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  routes: {
    [BORKED_PHONE_OPTIONS.A]: [
      {
        name: SELF,
        messages: [BORKED_PHONE_OPTIONS.A],
      },
      {
        name: ZARA,
        messages: ["Well, that's a reaction!"],
      },
      {
        name: SELF,
        messages: [
          "I'm loosing my mind, my sanity!",
          "I kinda sorta...",
          "froze my account and lost all my contacts...",
          "and now I don't know what to do",
          { type: MESSAGE_CONTENT.EMOJI, content: "💀" },
        ],
      },
      {
        name: ZARA,
        messages: [
          "Poor baby",
          "It sounds so hard to be you",
          "So how did this happen?",
        ],
      },
      {
        name: SELF,
        messages: ["Via stupidity"],
      },
      {
        name: ZARA,
        messages: ["No, really, how?"],
      },
      {
        name: SELF,
        messages: [
          "Unsure, I think my keychain was using a stale password and I just kept trying to enter it till it locked me out for the next…",
          "5 hours I think.",
        ],
      },
      {
        name: ZARA,
        messages: ["What will you do?"],
      },
      {
        name: SELF,
        messages: ["Probably kill myself."],
      },
      {
        name: ZARA,
        messages: [{ type: MESSAGE_CONTENT.EMOJI, content: "😦" }],
      },
      {
        name: SELF,
        messages: [
          "I’m trying to find some of my contacts in the meantime, but I was overzealous with inbox zero.",
        ],
      },

      {
        name: ZARA,
        messages: ["Inbox what?"],
      },
      {
        name: SELF,
        messages: ["I deleted nearly all my emails instead of archiving."],
      },
      {
        name: ZARA,
        messages: ["That sounds like an amazing system"],
      },
    ],
  },
};
