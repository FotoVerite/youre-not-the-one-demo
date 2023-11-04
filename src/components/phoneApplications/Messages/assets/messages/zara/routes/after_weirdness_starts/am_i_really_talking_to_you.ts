import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ChoosableRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_CONTACT_CONVERSATIONS_OPTIONS } from "../contact_conversation";
import { ZARA_ROUTE_IDS } from "../routes";

export enum ZARA_AM_I_REALLY_OPTIONS {
  A = "Am I really talking to you?",
}

const OPTIONS = ZARA_AM_I_REALLY_OPTIONS;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const am_i_really_talking_to_you: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.ZARA_AM_I_REALLY_TALKING_TO_YOU,
  options: Object.values(ZARA_AM_I_REALLY_OPTIONS),
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
        messages: ["You're starting to scare me!, Of course you are."],
      },
      {
        name: SELF,
        messages: [
          "I'm scaring myself",
          "Some of these txts seem impossible.",
          "They've been watching me for years",
        ],
      },
      {
        name: ZARA,
        messages: [
          "Honey, all your chats are backed up. They just combed them",
          "I know this is scary but you aren't in a horror film. It's just some bored kid",
          "They probably done some psychology/hot reading research",
        ],
      },
      {
        name: SELF,
        messages: [
          "You fucking rationalizing this isn't helping. When you find me with a knife stuck in  my ribs this rationalization will really help staunch the bleeding",
        ],
      },
      {
        name: ZARA,
        messages: ["You really believe they're coming to kill you?"],
      },
      {
        name: SELF,
        messages: ["They just seem to really hate me.", "It seems personal"],
      },
    ],
  },
};
