import {
  MESSAGE_CONTACT_NAME,
  SNAPSHOT_NAMES,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";
import { SPAM1_IDS } from "../../spam1/routes/routes";

export enum SPAMMER_IS_BEING_WEIRD_OPTIONS {
  A = "That spammer is getting weird",
}

const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const spammer_is_being_weird: ChoosableRouteType = {
  id: ZARA_ROUTE_IDS.SPAMMER_BEING_WEIRD,
  options: Object.values(SPAMMER_IS_BEING_WEIRD_OPTIONS),
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
            content: "I have, doesn't change how creepy it is?",
            conditions: { [MESSAGE_CONTACT_NAME.SPAM1]: { blocked: true } },
          },
          {
            type: MESSAGE_CONTENT.STRING,
            content:
              "I don't know, I'm so unsettled. I'm worried that blocking it will somehow escalate it further.",
            conditions: { [MESSAGE_CONTACT_NAME.SPAM1]: { blocked: false } },
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
    ],
  },
};
