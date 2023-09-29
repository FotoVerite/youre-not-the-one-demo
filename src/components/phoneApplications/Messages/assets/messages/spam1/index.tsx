import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import moment from "moment";

import { spam1_exchange_one } from "./routes/spam1_exchange_one";
import {
  SPAM1_SECOND_EXCHANGE_OPTIONS,
  spam1_exchange_two,
} from "./routes/spam_exchange_two";
import { spam1_introduction } from "./routes/spam_introduction";
import { ZARA_ROUTE_IDS } from "../zara/routes/routes";
import { SPAM1_IDS } from "./routes/routes";

const NAME = MESSAGE_CONTACT_NAME.SPAM1;
const SELF = MESSAGE_CONTACT_NAME.SELF;
export const spam1: ConversationFileType = {
  name: NAME,
  tags: [NAME],
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.YOUR_NEW_VIDEO]: {},
      },
    },
  },
  // effects: [
  //   {
  //     type: EFFECT_TYPE.LOGLINE_REPLACEMENT,
  //     conditions: {
  //       [MESSAGE_CONTACT_NAME.MICHAEL]: { views: { gt: 1 } },
  //       [MESSAGE_CONTACT_NAME.ZARA]: { views: { gt: 8 } },
  //     },
  //     data: <Jumbled message="You'll never be good enough" />,
  //   },
  //   {
  //     type: EFFECT_TYPE.LOGLINE_REPLACEMENT,
  //     conditions: { [MESSAGE_CONTACT_NAME.MICHAEL]: { views: { gt: 1 } } },
  //     data: <P>You're not the one</P>,
  //   },
  // ],
  heroImage: MESSAGE_CONTACT_INFO[NAME].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[NAME].colors[0],
  notificationRoutes: [spam1_introduction],
  blockable: {
    conditions: {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.EXCHANGE_TWO]: {
            chosen: [SPAM1_SECOND_EXCHANGE_OPTIONS.B],
            finished: true,
          },
        },
      },
    },
  },
  exchanges: [],
  routes: [spam1_exchange_one, spam1_exchange_two],
};
