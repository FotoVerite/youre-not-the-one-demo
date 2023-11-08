import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  NotificationRouteFileType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "../../../spam1/routes/routes";
import { LENNY_ROUTE_IDS } from "../routes";

export const my_ahri_build: NotificationRouteFileType = {
  id: LENNY_ROUTE_IDS.MY_AHRI_BUILD,
  delay: 2000,
  conditions: [
    {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.WHAT_IS_WITH_THIS_SERIAL_STALKER_BULLSHIT]: {
            status: ROUTE_STATUS_TYPE.FINISHED,
          },
        },
      },
    },
    {
      [MESSAGE_CONTACT_NAME.SPAM1]: {
        routes: {
          [SPAM1_IDS.DID_SEND_IMAGES_NOTIFICATION]: {
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
        "So I've been fucking around somewhat with Ahri, ELO still shit but she seems very OP in laning phase but falls off very hard after around 20 mins, especially if enemy botlane is fed, I'm thinking if you learn Maokai finally we might have some good synergy",
      ],
    },
  ],
};
