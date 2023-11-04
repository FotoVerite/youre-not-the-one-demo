import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { NotificationRouteFileType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";

export const update_on_the_phone: NotificationRouteFileType = {
  id: ZARA_ROUTE_IDS.UPDATE_ON_PHONE,
  delay: 1000,
  conditions: {
    [MESSAGE_CONTACT_NAME.SPAM3]: {
      blocked: true,
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["How's the phone situation"],
    },
  ],
};
