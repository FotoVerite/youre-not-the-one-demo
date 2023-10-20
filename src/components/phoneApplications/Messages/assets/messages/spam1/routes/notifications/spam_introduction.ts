import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "../../../zara/routes/routes";
import { SPAM1_IDS } from "../routes";

export const spam1_introduction: NotificationRouteType = {
  id: SPAM1_IDS.SPAM_INTRODUCTION,
  delay: 5000,
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.YOUR_NEW_VIDEO]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.SPAM1,
      messages: ["How's is today going?"],
    },
  ],
};
