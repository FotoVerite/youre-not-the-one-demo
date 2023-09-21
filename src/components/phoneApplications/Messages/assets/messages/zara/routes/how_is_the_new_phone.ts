import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { NotificationRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";
import { LEO_ROUTE_IDS } from "../../leo/routes/routes";

export const how_is_the_phone_coming: NotificationRouteType = {
  id: ZARA_ROUTE_IDS.HOW_IS_THE_PHONE_COMING,
  delay: 1000,
  conditions: {
    [MESSAGE_CONTACT_NAME.LEO]: {
      routes: { [LEO_ROUTE_IDS.FIRST_MONOLOGUE]: { finished: true } },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["How's the new phone coming along?"],
    },
  ],
};
