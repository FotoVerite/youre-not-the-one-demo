import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { MICHAEL_IDS } from "../../../michael/routes/routes";
import { ZARA_ROUTE_IDS } from "../../../zara/routes/routes";
import { SPAM1_IDS } from "../routes";
import { SPAM1_SECOND_EXCHANGE_OPTIONS } from "../spam_exchange_two";

export const sent_images: NotificationRouteType = {
  id: SPAM1_IDS.DID_SEND_IMAGES_NOTIFICATION,
  delay: 2500,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM1]: {
      routes: {
        [SPAM1_IDS.EXCHANGE_TWO]: { chosen: [SPAM1_SECOND_EXCHANGE_OPTIONS.A] },
      },
    },
    [MESSAGE_CONTACT_NAME.MICHAEL]: {
      routes: {
        [MICHAEL_IDS.ABOUT_TONIGHT_REPLY]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.SPAM1,
      messages: ["I'm starting to see the beauty in these images"],
    },
  ],
};

export const did_not_send_images: NotificationRouteType = {
  id: SPAM1_IDS.DID_NOT_SEND_IMAGES_NOTIFICATION,
  delay: 2500,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM1]: {
      routes: {
        [SPAM1_IDS.EXCHANGE_TWO]: { chosen: [SPAM1_SECOND_EXCHANGE_OPTIONS.B] },
      },
    },
    [MESSAGE_CONTACT_NAME.MICHAEL]: {
      routes: {
        [MICHAEL_IDS.ABOUT_TONIGHT_REPLY]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.I_DONT_FEEL_SECURE]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.SPAM1,
      messages: ["Why so quiet?", "Aren't we friends?"],
    },
  ],
};
