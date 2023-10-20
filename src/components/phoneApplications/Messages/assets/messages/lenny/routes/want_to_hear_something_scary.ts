import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { LENNY_ROUTE_IDS } from "./routes";
import { ZARA_ROUTE_IDS } from "../../zara/routes/routes";

export const lenny_want_to_hear_something_scary: NotificationRouteType = {
  id: LENNY_ROUTE_IDS.WANT_TO_HEAR_SOMETHING_SCARY,
  delay: 12000,
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.BORKED_PHONE]: { status: ROUTE_STATUS_TYPE.FINISHED },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.LENNY,
      messages: ["I read the most fucked up shit on reddit today"],
    },
  ],
};
