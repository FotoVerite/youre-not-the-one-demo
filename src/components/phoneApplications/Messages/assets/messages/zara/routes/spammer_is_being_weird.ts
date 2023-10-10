import {
  MESSAGE_CONTACT_NAME,
  SNAPSHOT_NAMES,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { ChoosableRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";
import { SPAM1_IDS } from "../../spam1/routes/routes";

export enum SPAMMER_IS_BEING_WEIRD_OPTIONS {
  A = "That spammer is getting weird",
}

const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const spammer_is_being_weird: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.SPAMMER_BEING_WEIRD,
  options: Object.values(SPAMMER_IS_BEING_WEIRD_OPTIONS),
  conditions: [
    {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            finished: true,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.BEAUTIFUL_IMAGES]: {
            finished: true,
          },
        },
      },
    },
  ],
  routes: {
    [SPAMMER_IS_BEING_WEIRD_OPTIONS.A]: [
      {
        name: SELF,
        messages: [SPAMMER_IS_BEING_WEIRD_OPTIONS.A],
      },
      {
        name: ZARA,
        messages: ["In what way?"],
      },
      {
        name: SELF,
        messages: [
          "They're responding very creepily.",
          {
            type: MESSAGE_CONTENT.BACKGROUND_SNAPSHOT,
            content: {
              filename: SNAPSHOT_NAMES.SERIAL_SNAPSHOT,
              backup: "false",
            },
          },
        ],
      },
      {
        name: ZARA,
        messages: ["Like spammers?"],
      },
      {
        name: SELF,
        messages: [
          "No, it's much more directed",
          "Much nastier shit",
          "I've blocked them twice already",
        ],
      },
      {
        name: ZARA,
        messages: ["Have you pissed someone off?"],
      },
      {
        name: SELF,
        messages: [
          "No... Why is that the first thing you ask?",
          "There's more... I mean...",
        ],
      },
      {
        name: ZARA,
        messages: [
          {
            type: MESSAGE_CONTENT.STRING,
            content: "What the fuck is this?",
            typingDelay: 7500,
          },
        ],
      },
      {
        name: SELF,
        messages: [
          "I'm not exactly sure.",
          "It sounds like something I'd write",
          "But I don't remember writing it",
          "Is it in your message history",
        ],
      },
      {
        name: ZARA,
        messages: [
          "He sent you a image of messages between us?",
          "I'm so confused",
          "Whats with the distortion with the last text",
        ],
      },
      {
        name: SELF,
        messages: [
          "No it's not an image, they're actual txts, and it's like a glitch.",
          "I thought it could be a gif but it's not it's like a real sms message",
        ],
      },
      {
        name: ZARA,
        messages: ["None of that is possible"],
      },
    ],
  },
};