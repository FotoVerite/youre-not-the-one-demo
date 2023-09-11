import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "./routes";
import creepyBabyTwo from "../assets/creepyBaby2.jpeg";
import creepyBabyThree from "../assets/creepyBaby3.jpeg";
import creepyBabyOne from "../assets/creepy_baby1.jpg";

export enum SPAM1_SECOND_EXCHANGE_OPTIONS {
  A = "Send Image",
  B = "Of Fucking Course",
}

const OPTIONS = SPAM1_SECOND_EXCHANGE_OPTIONS;
const SPAM1 = MESSAGE_CONTACT_NAME.SPAM1;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const spam1_exchange_two: MessageRouteType = {
  id: SPAM1_IDS.EXCHANGE_TWO,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [{ type: MESSAGE_CONTENT.IMAGE, content: creepyBabyOne }],
      },
      {
        name: SPAM1,
        messages: [
          {
            type: MESSAGE_CONTENT.STRING,
            content: "Huh?",
            typingDelay: 3000,
          },
        ],
      },
      {
        name: SELF,
        messages: [{ type: MESSAGE_CONTENT.IMAGE, content: creepyBabyTwo }],
      },
      {
        name: SPAM1,
        messages: [
          {
            type: MESSAGE_CONTENT.STRING,
            content: "Why are you sending these?",
            typingDelay: 2000,
          },
        ],
      },
      {
        name: SELF,
        messages: [{ type: MESSAGE_CONTENT.IMAGE, content: creepyBabyThree }],
      },
    ],
    [OPTIONS.B]: [{ name: SELF, messages: [OPTIONS.B] }],
  },
};