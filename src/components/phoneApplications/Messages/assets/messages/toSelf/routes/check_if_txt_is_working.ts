import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  EFFECT_TYPE,
  MESSAGE_CONTENT,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { MILEENA_ROUTE_IDS } from "@Components/phoneApplications/Messages/mileena/routes/routes";
import {
  leo_monologue_replacement_one,
  leo_monologue_replacement_two,
  leo_monologue_replacement_three,
  leo_monologue_replacement_four,
} from "./monologue_replacement";
import { TO_SELF_IDS } from "./routes";
import { ZARA_ROUTE_IDS } from "../../zara/routes/routes";

const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Okay, lets try it now without wifi",
}

export const check_if_txt_is_working: MessageRouteType = {
  id: TO_SELF_IDS.CHECK_IF_TEXT_IS_WORKING,
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
        messages: [OPTIONS.A, "And now lets try texting from my computer"],
      },
    ],
  },
};
