import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteFileType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "../routes";

export const your_day_worse_then_mine: NotificationRouteFileType = {
  id: ZARA_ROUTE_IDS.YOUR_DAY_WORSE_THEN_MINE,
  delay: 3000,
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.BORKED_PHONE]: { status: ROUTE_STATUS_TYPE.FINISHED },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["Trying to decide if your day is worse then mine..."],
    },
  ],
};
