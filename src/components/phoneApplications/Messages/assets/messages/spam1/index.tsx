import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import moment from "moment";

import { spam1_exchange_one } from "./routes/spam1_exchange_one";
import { spam1_exchange_two } from "./routes/spam_exchange_two";
import { spam1_introduction } from "./routes/spam_introduction";

const NAME = MESSAGE_CONTACT_NAME.SPAM1;
const SELF = MESSAGE_CONTACT_NAME.SELF;
export const spam1: ConversationFileType = {
  name: NAME,
  tags: [NAME],
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
  heroImage: MESSAGE_CONTACT_INFO[NAME].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[NAME].colors[0],
  notificationRoutes: [spam1_introduction],
  exchanges: [
    {
      time: moment().subtract(3, "years"),
      exchanges: [
        {
          name: NAME,
          messages: ["Hi my name is Kaori and I'm new to the area."],
        },
        {
          name: SELF,
          messages: [
            "Sometimes I doubt I'll make it to forty",
            "Like I haven't earned the right to continue",
            "Nothing I do seems to effect anyone",
            "Every relationship fails",
            "Every relationship fails",
          ],
        },
        {
          name: NAME,
          messages: ["Why do you act like you need permission to thrive?"],
        },
        {
          name: SELF,
          messages: ["Because I feel like I need permission"],
        },
      ],
    },
  ],
  routes: [spam1_exchange_one, spam1_exchange_two],
};
