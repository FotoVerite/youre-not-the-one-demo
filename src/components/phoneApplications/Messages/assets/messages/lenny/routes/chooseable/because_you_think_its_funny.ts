// Description: OP and his brother discuss a reddit creepypaste/rumor.
// Point: Give context for the setting of the game and set tone of the horror. Also so how fractured his family is

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  MESSAGE_CONTENT,
  NEXT_MESSAGE_EFFECT_TYPE,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { CAT_FACT_IDS } from "../../../cat_facts/routes/routes";
import { LENNY_ROUTE_IDS } from "../routes";

const LENNY = MESSAGE_CONTACT_NAME.LENNY;
const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Because you think it's funny",
}

const baseEndpoint = [
  {
    name: LENNY,
    messages: ["You really think I would do that?"],
  },
  {
    name: SELF,
    messages: ["Yes, it's the kind of juvenile puerile humour you love."],
  },
  {
    name: LENNY,
    messages: [
      "Why do you insist on always sounding like an even more stuck up Fraiser Crane?",
      "Who uses juvenile puerile humor as an actual sentence.",
      "ALSO MOTHERFUCKER IT'S HUMOR.",
      "You grew up in Watertown not in Oxford",
      "Next you'll start saying calling your car a bloody lorry",
    ],
  },
  {
    name: SELF,
    messages: [
      {
        type: MESSAGE_CONTENT.STRING,
        content: "I'm sorry ",
        nextMessageEffect: {
          type: NEXT_MESSAGE_EFFECT_TYPE.RETYPE,
          data: [
            "You always overreact to anything negative I say",
            "You always deflect",
            "You always try to make me feel bad",
            "I CAN'T TALK TO YOU.",
          ],
        },
      },
    ],
  },
  {
    name: LENNY,
    messages: [
      "Thank you",
      "Also I would be more imaginative then a 8 year old meme.",
    ],
  },
];

export const because_you_think_its_funny: ChoosableRouteType = {
  id: LENNY_ROUTE_IDS.BECAUSE_YOU_THINK_ITS_FUNNY,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.WANT_TO_HEAR_SOMETHING_SCARY]: {
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
