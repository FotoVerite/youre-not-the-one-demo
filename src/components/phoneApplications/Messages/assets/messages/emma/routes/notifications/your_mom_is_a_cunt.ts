import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteFileType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { LENNY_ROUTE_IDS } from "../../../lenny/routes/routes";
import { EMMA_ROUTE_IDS } from "../routes";

export const your_mom_is_a_cunt: NotificationRouteFileType = {
  id: EMMA_ROUTE_IDS.YOUR_MOM_IS_A_CUNT,
  delay: 2000,
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.YES_EXACTLY]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.EMMA,
      messages: ["Your Mom is a raging cunt. :D"],
    },
  ],
};
