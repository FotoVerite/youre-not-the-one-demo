import {
  MESSAGE_CONTACT_NAME,
  SNAPSHOT_NAMES,
} from "@Components/phoneApplications/Messages/constants";
import {
  EFFECT_TYPE,
  MESSAGE_CONTENT,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  OPTION_EFFECT_TYPE,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { leo_monologue_replacement_one } from "./monologue_replacement";
import { TO_SELF_IDS } from "./routes";
import { ZARA_ROUTE_IDS } from "../../zara/routes/routes";

const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Okay, lets try it now without wifi",
}

export const check_if_txt_is_working: ChoosableRouteType = {
  id: TO_SELF_IDS.CHECK_IF_TEXT_IS_WORKING,
  options: [{ label: OPTIONS.A, value: OPTIONS.A }],
  effects: [
    {
      type: EFFECT_TYPE.CONDITIONAL_EXCHANGE,
      data: {
        [OPTIONS.A]: leo_monologue_replacement_one,
      },
      conditions: {
        [MESSAGE_CONTACT_NAME.ZARA]: {
          routes: { [ZARA_ROUTE_IDS.I_AM_BEING_HARASSED]: {} },
        },
      },
    },
  ],
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [
          OPTIONS.A,
          "And now lets try texting from my computer",
          {
            type: MESSAGE_CONTENT.STRING,
            content: "This is conditional",
            conditions: {
              [MESSAGE_CONTACT_NAME.ZARA]: {
                routes: {
                  [ZARA_ROUTE_IDS.I_AM_BEING_HARASSED]: {
                    status: ROUTE_STATUS_TYPE.FINISHED,
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
};
