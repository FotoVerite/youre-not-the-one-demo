import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { EFFECT_TYPE } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import {
  leo_monologue_replacement_one,
  leo_monologue_replacement_two,
  leo_monologue_replacement_three,
  leo_monologue_replacement_four,
} from "./monologue_replacement";
import { LEO_ROUTE_IDS } from "./routes";
import { ZARA_ROUTE_IDS } from "../../zara/routes/routes";
import { MILEENA_ROUTE_IDS } from "@Components/phoneApplications/Messages/mileena/routes/routes";

const LEO = MESSAGE_CONTACT_NAME.LEO;
const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "I mean I really don't",
}

export const leo_first_monologue: MessageRouteType = {
  id: LEO_ROUTE_IDS.FIRST_MONOLOGUE,
  options: Object.values(OPTIONS),
  effects: [
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_one,
      },
      conditions: {
        [MESSAGE_CONTACT_NAME.ZARA]: {
          views: { gt: 0, lt: 5 },
          routes: { [ZARA_ROUTE_IDS.BORKED_PHONE]: {} },
        },
      },
    },
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_two,
      },
      conditions: {
        [MESSAGE_CONTACT_NAME.ZARA]: {
          views: { gte: 5, lt: 8 },
          routes: { [ZARA_ROUTE_IDS.BORKED_PHONE]: {} },
        },
      },
    },
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_three,
      },
      conditions: {
        [MESSAGE_CONTACT_NAME.ZARA]: {
          views: { gte: 8, lt: 10 },
          routes: { [ZARA_ROUTE_IDS.BORKED_PHONE]: {} },
        },
      },
    },
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_four,
      },
      conditions: {
        [MESSAGE_CONTACT_NAME.ZARA]: {
          views: { gte: 10 },
          routes: {
            [ZARA_ROUTE_IDS.BORKED_PHONE]: {},
            [MILEENA_ROUTE_IDS.MY_QUADS]: {},
          },
        },
      },
    },
  ],
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: SELF,
        messages: [
          "I'm so angry",
          "all the time",
          "What the fuck is wrong with me",
        ],
      },
      {
        name: SELF,
        messages: [
          "Leo I...",
          "Why am I doing this",
          "Why am I doing any of this?",
        ],
      },
      {
        name: SELF,
        messages: [
          "I'm just txting myself",
          "Why at my worst do I always think of you",
          "I loose access to my account and I don't even know what to do with myself.",
        ],
      },

      {
        name: SELF,
        messages: [
          "I miss you Leo, every day",
          "I know it's not my fault",
          "I know...",
        ],
      },
    ],
  },
};
