import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  EFFECT_TYPE,
  MESSAGE_CONTENT,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";
import creepyBabyThree from "../../spam1/assets/creepyBaby3.jpeg";
import { SPAM1_IDS } from "../../spam1/routes/routes";
import { SPAM1_SECOND_EXCHANGE_OPTIONS } from "../../spam1/routes/spam_exchange_two";
export enum ZARA_I_FELL_FOR_SPAM_OPTIONS {
  A = "I actually fell for a spam txt",
}

const NOT_OPTIONS = ZARA_I_FELL_FOR_SPAM_OPTIONS;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

const did_not_send_images = {
  [NOT_OPTIONS.A]: [
    { name: SELF, messages: [NOT_OPTIONS.A] },
    { name: ZARA, messages: ["I always wondered who those people were."] },
    {
      name: SELF,
      messages: [
        "I guess one response back isn’t falling for them. I just feel fucking dumb, like accidentally picking up a scam likely call.",
      ],
    },
    {
      name: ZARA,
      messages: [
        "Oh but I love them, Scam’s great parties, if a bit awkward and prone to repeating themselves. I remember last time they were just droning on and on about this Nigerian Prince they met.",
      ],
    },
    {
      name: SELF,
      messages: ["I mean if you want to clear a room they’re your guy."],
    },
  ],
};

const did_not_send_images_and_blocked = {
  [NOT_OPTIONS.A]: [
    { name: SELF, messages: [NOT_OPTIONS.A] },
    { name: ZARA, messages: ["I always wondered who those people were."] },
    {
      name: SELF,
      messages: [
        "I guess one response back isn’t falling for them. I just feel fucking dumb, like accidentally picking up a scam likely call.",
        "I did block and report, like it does anything.",
      ],
    },
    {
      name: ZARA,
      messages: [
        "Oh but I love them, Scam’s great parties, if a bit awkward and prone to repeating themselves. I remember last time they were just droning on and on about this Nigerian Prince they met.",
      ],
    },
    {
      name: SELF,
      messages: ["I mean if you want to clear a room they’re your guy."],
    },
  ],
};

const did_send_images = {
  [NOT_OPTIONS.A]: [
    { name: SELF, messages: [NOT_OPTIONS.A] },
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
      messages: [
        "I've started to send them creepy baby images/ads in response",
      ],
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
  ],
};

export const i_fell_for_spam: MessageRouteType = {
  id: ZARA_ROUTE_IDS.I_FELL_FOR_SPAM,
  options: Object.values(NOT_OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM1]: {
      routes: {
        [SPAM1_IDS.EXCHANGE_TWO]: { finished: true },
      },
    },
  },
  effects: [
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: did_not_send_images_and_blocked,
      conditions: {
        [MESSAGE_CONTACT_NAME.SPAM1]: {
          blocked: true,
        },
      },
    },
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: did_not_send_images,
      conditions: {
        [MESSAGE_CONTACT_NAME.SPAM1]: {
          blocked: false,
          routes: {
            [SPAM1_IDS.EXCHANGE_TWO]: {
              chosen: [SPAM1_SECOND_EXCHANGE_OPTIONS.B],
            },
          },
        },
      },
    },
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: did_send_images,
      conditions: {
        [MESSAGE_CONTACT_NAME.SPAM1]: {
          blocked: false,
          routes: {
            [SPAM1_IDS.EXCHANGE_TWO]: {
              chosen: [SPAM1_SECOND_EXCHANGE_OPTIONS.A],
            },
          },
        },
      },
    },
  ],
  routes: {},
};
