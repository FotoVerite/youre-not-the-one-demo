// Description: OP and ZARA discuss OP feelings of alienation.
// Point: Gives more personality to OP and discuss some central themes.

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ExchangeBlockType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { ZARA_ROUTE_IDS } from "./routes";

export enum ZARA_DO_WITH_MYSELF {
  A = "I joke but...",
  B = "I'm bored, make them fix my account faster!",
}

const OPTIONS = ZARA_DO_WITH_MYSELF;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

const exchanges: ExchangeBlockType[] = [
  {
    name: ZARA,
    messages: [
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I'm just speaking the truth",
        typingDelay: -400,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content: "You just hate to hear it",
        typingDelay: -500,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content: "And that's why you keep putting up with it.",
        typingDelay: -600,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content: "Plus I actually message you.",
        typingDelay: -700,
      },
      {
        type: MESSAGE_CONTENT.EMOJI,
        content: "😉",
      },
    ],
  },
  {
    name: SELF,
    messages: [
      {
        type: MESSAGE_CONTENT.STRING,
        content: "Okay point",
        reaction: { name: "heart", color: "#f487d3", delay: 3000 },
        contentDelay: 1500,
      },
    ],
  },
];

export const i_dont_know_what_to_do_with_myself: MessageRouteType = {
  id: ZARA_ROUTE_IDS.I_REALLY_DONT_KNOW_WHAT_TO_DO_WITH_MYSELF,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [
          OPTIONS.A,
          "It's weird realizing how much my life revolves around my contact list",
          "Also how much I initiate everything with everyone",
        ],
      },
      {
        name: ZARA,
        messages: [
          "My dude it's been what, six hours max",
          "How are you having an existential breakdown?",
          "Go doom scroll or something",
        ],
      },
      {
        name: SELF,
        messages: [
          "I'm being serious, It's less that nobody has txted me and more realizing they might never txt me",
        ],
      },
      {
        name: ZARA,
        messages: ["Wow... thats deep. Go and watch some cute cat videos"],
      },
      {
        name: SELF,
        messages: ["Zara, you're such a good friend"],
      },
    ].concat(exchanges),
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
      {
        name: ZARA,
        messages: [
          "Why do you sound like an annoying side character from an action film",
        ],
      },
      {
        name: SELF,
        messages: [
          "I don't know, I'm just frustrated I think.",
          "Frustrated in general",
          "Like I'm waiting for something",
          "Not even for something to happen, just for something",
        ],
      },
      {
        name: ZARA,
        messages: ["Hmmm, is this something named Godot?"],
      },
      {
        name: SELF,
        messages: ["Hah"],
      },
      {
        name: ZARA,
        messages: [
          "I don't know why, you're life is pretty sweet, if we don't include your annoying boyfriend",
        ],
      },
      {
        name: SELF,
        messages: ["Zara... we talked about this."],
      },
    ].concat(exchanges),
  },
};
