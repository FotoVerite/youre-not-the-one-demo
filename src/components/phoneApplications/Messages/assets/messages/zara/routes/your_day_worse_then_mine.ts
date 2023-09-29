import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { NotificationRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";

export const your_day_worse_then_mine: NotificationRouteType = {
  id: ZARA_ROUTE_IDS.YOUR_DAY_WORSE_THEN_MINE,
  delay: 3000,
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: { [ZARA_ROUTE_IDS.BORKED_PHONE]: { finished: true } },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["Trying to decide if your day is worse then mine..."],
    },
  ],
};
