import {
  MESSAGE_CONTACT_NAME,
  SNAPSHOT_NAMES,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "../../../spam1/routes/routes";
import { ZARA_ROUTE_IDS } from "../routes";

export enum SPAMMER_IS_BEING_WEIRD_OPTIONS {
  A = "That spammer is getting weird",
  B = "That spammer is freaking me out",
  C = "That spammer is fucking with me",
}

const blockConditions = {
  none: { [MESSAGE_CONTACT_NAME.SPAM1]: { blocked: false } },
  one: {
    [MESSAGE_CONTACT_NAME.SPAM1]: { blocked: true },
    [MESSAGE_CONTACT_NAME.SPAM2]: { blocked: false },
  },
  two: {
    [MESSAGE_CONTACT_NAME.SPAM2]: { blocked: true },
    [MESSAGE_CONTACT_NAME.SPAM3]: { blocked: false },
  },
  two_or_more: {
    [MESSAGE_CONTACT_NAME.SPAM2]: { blocked: true },
  },
  three: {
    [MESSAGE_CONTACT_NAME.SPAM3]: { blocked: true },
    [MESSAGE_CONTACT_NAME.SPAM4]: { blocked: false },
  },
  four: {
    [MESSAGE_CONTACT_NAME.SPAM4]: { blocked: true },
    [MESSAGE_CONTACT_NAME.SPAM5]: { blocked: false },
  },

  five: {
    [MESSAGE_CONTACT_NAME.SPAM5]: { blocked: true },
    [MESSAGE_CONTACT_NAME.SPAM6]: { blocked: false },
  },
};

const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

const baseMessages = [
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
    messages: ["???, why haven't you blocked them yet?"],
  },
  {
    name: SELF,
    messages: [
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I have, they just continue to message from new numbers",
        conditions: blockConditions.five,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I have, FOUR FUCKING TIMES!",
        conditions: blockConditions.four,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I have,three times.",
        conditions: blockConditions.three,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I have, twice",
        conditions: blockConditions.two,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I have, doesn't change how creepy it is?",
        conditions: blockConditions.one,
      },
      {
        type: MESSAGE_CONTENT.STRING,
        content:
          "I don't know, I'm so unsettled. I'm worried that blocking it will somehow escalate it further.",
        conditions: blockConditions.none,
      },
    ],
  },
  {
    name: ZARA,
    messages: ["Have you pissed someone off?"],
  },
  {
    name: SELF,
    messages: ["No... Why is that the first thing you ask?"],
  },
  {
    name: ZARA,
    messages: ["It's a pretty normal question when you're being harassed"],
  },
  {
    name: SELF,
    messages: ["Yeah, you're right, I'm just on edge"],
  },
  {
    name: ZARA,
    messages: ["I'm sure they'll get bored if you just don't respond"],
  },
  {
    name: SELF,
    messages: ["Maybe..."],
  },
  {
    name: ZARA,
    messages: ["Have you talked to anyone else. Do you want any mutuals?"],
  },
  {
    name: SELF,
    messages: ["I don't know, I don't know if I want to talk to anyone now."],
  },
  {
    name: ZARA,
    messages: ["Don't let this asshole control what you do dude."],
  },
];

export const spammer_is_being_weird: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.SPAMMER_BEING_WEIRD,
  options: [
    {
      label: SPAMMER_IS_BEING_WEIRD_OPTIONS.A,
      value: SPAMMER_IS_BEING_WEIRD_OPTIONS.A,
      conditions: blockConditions.none,
    },
    {
      label: SPAMMER_IS_BEING_WEIRD_OPTIONS.B,
      value: SPAMMER_IS_BEING_WEIRD_OPTIONS.B,
      conditions: blockConditions.one,
    },
    {
      label: SPAMMER_IS_BEING_WEIRD_OPTIONS.C,
      value: SPAMMER_IS_BEING_WEIRD_OPTIONS.C,
      conditions: blockConditions.two_or_more,
    },
  ],
  conditions: [
    {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM2]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM3]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM4]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM5]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM6]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.BEAUTIFUL_IMAGES]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
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
    ].concat(baseMessages),
    [SPAMMER_IS_BEING_WEIRD_OPTIONS.B]: [
      {
        name: SELF,
        messages: [SPAMMER_IS_BEING_WEIRD_OPTIONS.B],
      },
    ].concat(baseMessages),
    [SPAMMER_IS_BEING_WEIRD_OPTIONS.C]: [
      {
        name: SELF,
        messages: [SPAMMER_IS_BEING_WEIRD_OPTIONS.C],
      },
    ].concat(baseMessages),
  },
};
