import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { ChoosableRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";

export enum I_AM_BEING_HARASSED_OPTIONS {
  A = "Help I'm being harassed",
}

const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

// Description: OP and ZARA discuss why OP has no contacts in his phone.
// Point: Give context for the setting of the game and set tone of most messages.

export const i_am_being_harassed: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.I_AM_BEING_HARASSED,
  options: Object.values(I_AM_BEING_HARASSED_OPTIONS),
  routes: {
    [I_AM_BEING_HARASSED_OPTIONS.A]: [
      {
        name: SELF,
        messages: [I_AM_BEING_HARASSED_OPTIONS.A],
      },
      {
        name: ZARA,
        messages: ["Um, wut?"],
      },
      {
        name: SELF,
        messages: ["Somebody is sending anonymous texts to me"],
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
        name: SELF,
        messages: [
          {
            type: MESSAGE_CONTENT.BACKGROUND_SNAPSHOT,
            content: { filename: "SPAM2", backup: "SPAM2" },
          },
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
