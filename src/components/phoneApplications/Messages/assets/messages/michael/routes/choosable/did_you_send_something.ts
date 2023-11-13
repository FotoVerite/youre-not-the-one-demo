import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ExchangeBlockType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { MICHAEL_IDS } from "../routes";

export enum MICHAEL_ABOUT_TONIGHT_REPLY_OPTIONS {
  A = "I told you to send nudes on gridr",
  B = "Did you send something",
  C = "I don't want to deal with this right now",
}

const OPTIONS = MICHAEL_ABOUT_TONIGHT_REPLY_OPTIONS;
const MICHAEL = MESSAGE_CONTACT_NAME.MICHAEL;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const did_you_send_somehing: ChoosableRouteType = {
  id: MICHAEL_IDS.DID_YOU_SEND_SOMETHING,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.MICHAEL]: {
      routes: {
        [MICHAEL_IDS.FIRST_TEXT]: { status: ROUTE_STATUS_TYPE.FINISHED },
      },
    },
  },
  routes: {
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
      {
        name: MICHAEL,
        messages: [
          "No?",
          {
            type: MESSAGE_CONTENT.STRING,
            typingDelay: 2000,
            content: "Did you send something for me?",
          },
          "I don't see it?",
          "You send it on Grindr?",
          "I have it silenced",
          "You know I don't go on without talking to you first",
        ],
      },
      {
        name: SELF,
        messages: ["No I...", "I haven't had time yet"],
      },
      {
        name: MICHAEL,
        messages: ["No time like the present"],
      },
    ],
  },
};
