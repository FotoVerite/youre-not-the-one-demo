import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  OptionsWithConditionals,
} from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ExchangeBlockType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { ZARA_ROUTE_IDS } from "./routes";
import creepyBabyThree from "../../spam1/assets/creepyBaby3.jpeg";
import { SPAM1_IDS } from "../../spam1/routes/routes";
import { SPAM1_SECOND_EXCHANGE_OPTIONS } from "../../spam1/routes/spam_exchange_two";
export enum ZARA_I_FELL_FOR_SPAM_OPTIONS {
  DID_SEND_IMAGES = "Fucking Spammers",
  DID_NOT_SEND_IMAGES = "I fell for spam",
}

const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

const OPTIONS: OptionsWithConditionals[] = [
  {
    conditions: {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.EXCHANGE_TWO]: {
            chosen: [SPAM1_SECOND_EXCHANGE_OPTIONS.B],
          },
        },
      },
    },
    options: [ZARA_I_FELL_FOR_SPAM_OPTIONS.DID_NOT_SEND_IMAGES],
  },
  {
    conditions: {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.EXCHANGE_TWO]: {
            chosen: [SPAM1_SECOND_EXCHANGE_OPTIONS.A],
          },
        },
      },
    },
    options: [ZARA_I_FELL_FOR_SPAM_OPTIONS.DID_SEND_IMAGES],
  },
];
const did_not_send_images: ExchangeBlockType[] = [
  {
    name: SELF,
    messages: [
      ZARA_I_FELL_FOR_SPAM_OPTIONS.DID_NOT_SEND_IMAGES,
      "I can't believe I fell for a `How are you doing`",
    ],
  },
  { name: ZARA, messages: ["I always wondered who those people were."] },
  {
    name: SELF,
    messages: [
      "I guess one response back isn’t falling for them. I just feel fucking dumb, like accidentally picking up a scam likely call.",
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I did block and report, like it does anything.",
        conditions: { [MESSAGE_CONTACT_NAME.SPAM1]: { blocked: true } },
      },
    ],
  },
  {
    name: ZARA,
    messages: [
      "Why you gotta hate on Scam, he's a lovely guy. Just called me 30 minutes ago asking for me to signup for Spectrum for the 30th time. Last time he tried to introduce me to His Brother 'The Nigerian Price' Mark Likely",
    ],
  },
  {
    name: SELF,
    messages: [
      "Yeah... you should really not write your own jokes for your channel",
    ],
  },
  {
    name: ZARA,
    messages: [{ type: MESSAGE_CONTENT.EMOJI, content: "😤" }],
  },
];

const did_send_images: ExchangeBlockType[] = [
  { name: SELF, messages: [ZARA_I_FELL_FOR_SPAM_OPTIONS.DID_SEND_IMAGES] },
  { name: ZARA, messages: ["I always wondered who those people were."] },
  {
    name: SELF,
    messages: [
      "They make me so angry, who are these fuckers trying to phish or bother people",
    ],
  },
  {
    name: ZARA,
    messages: [
      "I think mostly underpaid people working in call centers in China or Russia? I remember reading an article a long time ago. Could be 100% wrong of course",
    ],
  },
  {
    name: SELF,
    messages: ["I've started to send them creepy baby images/ads in response"],
  },
  {
    name: ZARA,
    messages: ["Really?"],
  },
  {
    name: SELF,
    messages: ["Yeah, more rewarding then blocking them"],
  },

  {
    name: ZARA,
    messages: ["What do you mean by creepy baby ads"],
  },
  {
    name: SELF,
    messages: [{ type: MESSAGE_CONTENT.IMAGE, content: creepyBabyThree }],
  },
  {
    name: ZARA,
    messages: ["OMG that's terrifying.", "I need some brainbleech now"],
  },
  {
    name: SELF,
    messages: ["Hey you asked"],
  },
];

export const i_fell_for_spam: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.I_FELL_FOR_SPAM,
  options: OPTIONS,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM1]: {
      routes: {
        [SPAM1_IDS.EXCHANGE_TWO]: { finished: true },
      },
    },
  },
  routes: {
    [ZARA_I_FELL_FOR_SPAM_OPTIONS.DID_SEND_IMAGES]: did_send_images,
    [ZARA_I_FELL_FOR_SPAM_OPTIONS.DID_NOT_SEND_IMAGES]: did_not_send_images,
  },
};
