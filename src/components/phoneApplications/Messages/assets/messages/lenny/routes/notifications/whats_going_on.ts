import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteFileType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { LENNY_ROUTE_IDS } from "../routes";

export const my_ahri_build: NotificationRouteFileType = {
  id: LENNY_ROUTE_IDS.WHATS_GOING_ON,
  delay: 12000,
  conditions: [
    {
      [MESSAGE_CONTACT_NAME.LENNY]: {
        routes: {
          [LENNY_ROUTE_IDS.NO_IDEA]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
  ],
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.LENNY,
      messages: [
        "Are you okay?",
        "You can't just send a txt like that and go silent.",
      ],
    },
  ],
};
