import {
  MESSAGE_CONTACT_NAME,
  SNAPSHOT_NAMES,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "../routes";

export enum ZARA_WHAT_ARE_YOU_TALKING_ABOUT_OPTIONS {
  A = "What are you talking about",
}

const OPTIONS = ZARA_WHAT_ARE_YOU_TALKING_ABOUT_OPTIONS;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;
const SPAM = MESSAGE_CONTACT_NAME.SPAM4;

export const zara_what_are_you_talking_about: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.WHAT_ARE_YOU_TALKING_ABOUT,
  options: Object.values(ZARA_WHAT_ARE_YOU_TALKING_ABOUT_OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.WHY_ARE_YOU_TELLING_ME_TO_FUCK_OFF]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
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
          "I don't know.",
          "You texting me out of the blue at calling me a creep, a liar and how you think my videos are shit",
        ],
      },
      {
        name: SELF,
        messages: ["I did no such thing"],
      },
      {
        name: ZARA,
        messages: [
          "Suuuure",
          {
            type: MESSAGE_CONTENT.BACKGROUND_SNAPSHOT,
            content: {
              filename: SNAPSHOT_NAMES.ZARA_FUCK_OFF,
              backup: "false",
            },
          },
          "Are you going to blame this on your mysterious stalker",
        ],
      },
      {
        name: SELF,
        messages: [
          "Wut...",
          "That's not even in my history",
          "And yes, you really think I'd do this?",
        ],
      },
      {
        name: ZARA,
        messages: [
          "This isn't a movie, randos can't just hack the phone system to do what they want",
          "You're just using it as cover.",
          "Like a Zlister claiming they're hacked when they say something racist",
        ],
      },
      {
        name: SELF,
        messages: ["Why would I..."],
      },
      {
        name: ZARA,
        messages: [
          "You're such a waste of space you know that. Nothing you do matters. I'm actually going places",
          "I don't know why I listen to you on how to shoot, you just sabotage me because you don't want me to succeed",
        ],
      },
      {
        name: SELF,
        messages: ["Zara?"],
      },
      {
        name: SPAM,
        messages: ["Too much?", "Yeah too much."],
      },
    ],
  },
};
