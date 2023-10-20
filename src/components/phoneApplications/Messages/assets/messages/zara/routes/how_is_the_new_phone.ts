import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";
import { TO_SELF_IDS } from "../../toSelf/routes/routes";

export const how_is_the_phone_coming: NotificationRouteType = {
  id: ZARA_ROUTE_IDS.HOW_IS_THE_PHONE_COMING,
  delay: 1000,
  conditions: {
    [MESSAGE_CONTACT_NAME.MY_SELF]: {
      routes: {
        [TO_SELF_IDS.CHECK_IF_TEXT_IS_WORKING]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["How's the new phone coming along?"],
    },
  ],
};
