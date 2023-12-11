// Description: OP and his brother discuss a reddit creepypaste/rumor.
// Point: Give context for the setting of the game and set tone of the horror. Also so how fractured his family is

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import cat_facts from "../../assets/cat_facts.png";
import { LENNY_ROUTE_IDS } from "../routes";

const LENNY = MESSAGE_CONTACT_NAME.LENNY;
const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Did you sign me up for cat facts?",
  B = "Are you messaging me as cat facts to mess with me.",
}

const baseEndpoint = [
  {
    name: LENNY,
    messages: ["Wut?"],
  },
  {
    name: SELF,
    messages: ["Oh, c'mon dude. I use reddit too. I recognize the meme."],
  },
  {
    name: LENNY,
    messages: ["Wut?"],
  },
  {
    name: SELF,
    messages: [
      "Thank You for signing up for Cat Facts! You will now receive daily facts about cats! >o<",
    ],
  },
  {
    name: LENNY,
    messages: ["Wut?"],
  },
  {
    name: SELF,
    messages: ["Are you intentionally being dense"],
  },
  {
    name: LENNY,
    messages: [
      "I'll say again slowly",
      "wut",
      "the",
      "fuck",
      "you going on about.",
    ],
  },
  {
    name: LENNY,
    messages: ["What do you think I did. What is cat facts?"],
  },
  {
    name: SELF,
    messages: [{ type: MESSAGE_CONTENT.IMAGE, content: cat_facts }],
  },
  {
    name: LENNY,
    messages: ["No, I didn't send you this image."],
  },
];

export const why_am_i_getting_cat_facts: ChoosableRouteType = {
  id: LENNY_ROUTE_IDS.WHY_AM_I_GETTING_CAT_FACTS,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.MIDNIGHT_SOCIETY]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
    ]
      .concat(baseEndpoint)
      .concat([
        {
          name: SELF,
          messages: ["NO, DID YOU SIGN ME UP TO A JOKE SPAM LIST"],
        },
        {
          name: LENNY,
          messages: ["Um no, why would I do that?"],
        },
      ]),
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
    ]
      .concat(baseEndpoint)
      .concat([
        {
          name: SELF,
          messages: [
            "NO, DID YOU SEND THE MESSAGE. `Thank You for signing up for Cat Facts! You will now receive daily facts about cats! >o<`",
          ],
        },
        {
          name: LENNY,
          messages: ["Um no, why would I do that?"],
        },
      ]),
  },
};
