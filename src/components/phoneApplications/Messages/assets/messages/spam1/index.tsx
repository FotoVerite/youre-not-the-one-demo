import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import {
  did_not_send_images,
  sent_images,
} from "./routes/notifications/additional_notifications";
import { spam1_introduction } from "./routes/notifications/spam_introduction";
import { SPAM1_IDS } from "./routes/routes";
import { spam1_exchange_one } from "./routes/spam1_exchange_one";
import {
  SPAM1_SECOND_EXCHANGE_OPTIONS,
  spam1_exchange_two,
} from "./routes/spam_exchange_two";
import { what_is_with_this_serial_killer_bullshit } from "./routes/what_is_with_this_serial_stalker_bullshit";
import { ZARA_ROUTE_IDS } from "../zara/routes/routes";

const NAME = MESSAGE_CONTACT_NAME.SPAM1;
export const spam1: ConversationFileType = {
  name: NAME,
  tags: [NAME],
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
  notificationRoutes: [spam1_introduction, sent_images, did_not_send_images],
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
  routes: [
    spam1_exchange_one,
    spam1_exchange_two,
    what_is_with_this_serial_killer_bullshit,
  ],
};
