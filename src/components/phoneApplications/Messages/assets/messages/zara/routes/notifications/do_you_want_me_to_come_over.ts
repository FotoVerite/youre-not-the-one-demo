import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteFileType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "../routes";

export const zara_do_you_want_any_contacts: NotificationRouteFileType = {
  id: ZARA_ROUTE_IDS.DO_YOU_WANT_ME_TO_COME_OVER,
  delay: 2500,

  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["Do you want me to come over?"],
    },
  ],
};
