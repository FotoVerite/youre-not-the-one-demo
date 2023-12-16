// Description: OP and his brother discuss a reddit creepypaste/rumor.
// Point: Give context for the setting of the game and set tone of the horror. Also so how fractured his family is

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { LENNY_ROUTE_IDS } from "../routes";

const LENNY = MESSAGE_CONTACT_NAME.LENNY;
const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Yes exactly",
}

export const yes_exactly: ChoosableRouteType = {
  id: LENNY_ROUTE_IDS.YES_EXACTLY,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.IM_STILL_CONFUSED]: {
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
      {
        name: LENNY,
        messages: ["I'm insulted you'd think I'd do something so lame"],
      },
      {
        name: SELF,
        messages: ["Well who else would do it?"],
      },
      {
        name: LENNY,
        messages: [
          "I don't know, you're boyfriend, maybe Chris he's always been humor challenged",
        ],
      },
      {
        name: SELF,
        messages: ["I don't think Michael would do that"],
      },
      {
        name: LENNY,
        messages: [
          "How would I know, you barely talk about him. It's been six months and I still haven't met him",
        ],
      },
      {
        name: SELF,
        messages: ["We've been over this."],
      },
      {
        name: LENNY,
        messages: ["Are you ever going to introduce him to mom"],
      },
      {
        name: SELF,
        messages: ["Do you want him to break up with me."],
      },
      {
        name: LENNY,
        messages: ["She's not that bad....", "Emma loves her."],
      },
      {
        name: SELF,
        messages: ["If you say so, so you really didn't"],
      },
      {
        name: LENNY,
        messages: ["No!"],
      },
    ],
  },
};
