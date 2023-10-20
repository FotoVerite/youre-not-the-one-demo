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
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "./routes";

export enum SPAM1_WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT_OPTIONS {
  A = "What the fuck are you on?",
}

const OPTIONS = SPAM1_WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT_OPTIONS;
const SPAM1 = MESSAGE_CONTACT_NAME.SPAM1;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const what_is_with_this_serial_killer_bullshit: ChoosableRouteType = {
  id: SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM1]: {
      routes: {
        [SPAM1_IDS.DID_NOT_SEND_IMAGES_NOTIFICATION]: {
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
        name: SPAM1,
        messages: [
          "I'm just being friendly",
          "Much more friendlier than you",
          "You really have a very shoddy vocabulary",
        ],
      },
      {
        name: SELF,
        messages: [
          {
            type: MESSAGE_CONTENT.STRING,
            content: "What is with this serial stalker bullshit?!",
            effect: {
              type: EFFECT_TYPE.BACKGROUND_SNAPSHOT,
              data: { filename: SNAPSHOT_NAMES.SERIAL_SNAPSHOT },
            },
          },
        ],
      },
      {
        name: SPAM1,
        messages: ["That's not very nice"],
      },
    ],
  },
};
