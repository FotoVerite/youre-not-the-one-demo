import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "./routes";

export enum SPAM1_WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT_OPTIONS {
  A = "What the fuck are you on?",
}

const OPTIONS = SPAM1_WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT_OPTIONS;
const SPAM1 = MESSAGE_CONTACT_NAME.SPAM1;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const what_is_with_this_serial_killer_bullshit: MessageRouteType = {
  id: SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM1]: {
      routes: {
        [SPAM1_IDS.DID_NOT_SEND_IMAGES_NOTIFICATION]: { finished: true },
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
        messages: ["What is with this serial stalker bullshit?!"],
      },
      {
        name: SPAM1,
        messages: ["That's not very nice"],
      },
    ],
  },
};
