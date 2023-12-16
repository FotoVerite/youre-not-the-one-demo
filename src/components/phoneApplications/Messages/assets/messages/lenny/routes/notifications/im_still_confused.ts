import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteFileType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { LENNY_ROUTE_IDS } from "../routes";

export const im_still_confused: NotificationRouteFileType = {
  id: LENNY_ROUTE_IDS.IM_STILL_CONFUSED,
  delay: 2000,
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.BECAUSE_YOU_THINK_ITS_FUNNY]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.LENNY,
      messages: [
        "I'm still confused. You're getting spam messages from cat facts?",
      ],
    },
  ],
};
