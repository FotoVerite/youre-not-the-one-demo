// Description: OP and his brother discuss a reddit creepypaste/rumor.
// Point: Give context for the setting of the game and set tone of the horror. Also so how fractured his family is

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { CAT_FACT_IDS } from "../../../cat_facts/routes/routes";
import { LENNY_ROUTE_IDS } from "../routes";

const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Because you think it's funny",
}

export const because_you_think_its_funny: ChoosableRouteType = {
  id: LENNY_ROUTE_IDS.BECAUSE_YOU_THINK_ITS_FUNNY,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.WHY_AM_I_GETTING_CAT_FACTS]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [
          OPTIONS.A,
          {
            type: MESSAGE_CONTENT.STRING,
            content:
              "Ugh, another one, I need to block it. Clowder of cats my ass",
            conditions: {
              [MESSAGE_CONTACT_NAME.CAT_FACTS]: {
                routes: {
                  [CAT_FACT_IDS.CLOWDER_OF_CATS]: {
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
