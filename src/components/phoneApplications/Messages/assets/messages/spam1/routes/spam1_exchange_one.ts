import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ExchangeBlockType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { SPAM1_IDS } from "./routes";
import spam1_image from "../assets/spam1.png";

export enum SPAM1_FIRST_EXCHANGE_OPTIONS {
  A = "New Phone, Who Dis",
  B = "Sorry, who is this?",
  C = "I'm doing okay. How are you doing today?",
}

const OPTIONS = SPAM1_FIRST_EXCHANGE_OPTIONS;
const SPAM1 = MESSAGE_CONTACT_NAME.SPAM1;
const SELF = MESSAGE_CONTACT_NAME.SELF;

const exchanges: ExchangeBlockType[] = [
  {
    name: SPAM1,
    messages: [
      "Hi my name is Kaori and I'm new to the area.",
      { type: MESSAGE_CONTENT.IMAGE, content: spam1_image },
    ],
  },
];

export const spam1_exchange_one: ChoosableRouteType = {
  id: SPAM1_IDS.EXCHANGE_ONE,
  options: Object.values(OPTIONS),
  conditions: {
    [SPAM1]: {
      routes: {
        [SPAM1_IDS.SPAM_INTRODUCTION]: { status: ROUTE_STATUS_TYPE.FINISHED },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [{ name: SELF, messages: [OPTIONS.A] }].concat(exchanges),
    [OPTIONS.B]: [{ name: SELF, messages: [OPTIONS.B] }].concat(exchanges),
    [OPTIONS.C]: [{ name: SELF, messages: [OPTIONS.C] }].concat(exchanges),
  },
};
