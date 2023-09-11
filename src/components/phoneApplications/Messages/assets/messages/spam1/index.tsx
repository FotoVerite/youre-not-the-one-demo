import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import moment from "moment";

import { spam1_exchange_one } from "./routes/spam1_exchange_one";
import { spam1_exchange_two } from "./routes/spam_exchange_two";
import { spam1_introduction } from "./routes/spam_introduction";

const name = MESSAGE_CONTACT_NAME.SPAM1;

export const spam1: ConversationFileType = {
  name,
  tags: [name],
  // conditions: {
  //   [CONTACT_NAMES.ZOLA]: {
  //     routes: {
  //       [ZARA_ROUTE_IDS.YOUR_NEW_VIDEO]: {},
  //     },
  //   },
  // },
  // effects: [
  //   {
  //     type: EFFECT_TYPE.LOGLINE_REPLACEMENT,
  //     conditions: {
  //       [CONTACT_NAMES.MICHAEL]: { views: { gt: 1 } },
  //       [CONTACT_NAMES.ZOLA]: { views: { gt: 8 } },
  //     },
  //     data: <Jumbled message="You'll never be good enough" />,
  //   },
  //   {
  //     type: EFFECT_TYPE.LOGLINE_REPLACEMENT,
  //     conditions: { [CONTACT_NAMES.MICHAEL]: { views: { gt: 1 } } },
  //     data: <P>You're not the one</P>,
  //   },
  // ],
  heroImage: MESSAGE_CONTACT_INFO[name].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[name].colors[0],
  notificationRoutes: [spam1_introduction],
  exchanges: [
    {
      time: moment().subtract(3, "years"),
      exchanges: [
        {
          name: MESSAGE_CONTACT_NAME.SPAM1,
          messages: ["Hi my name is Kaori and I'm new to the area."],
        },
      ],
    },
  ],
  routes: [spam1_exchange_one, spam1_exchange_two],
};
