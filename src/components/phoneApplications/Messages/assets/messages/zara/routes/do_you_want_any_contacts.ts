import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { NotificationRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";
import { MICHAEL_IDS } from "../../michael/routes/routes";

export const zara_do_you_want_any_contacts: NotificationRouteType = {
  id: ZARA_ROUTE_IDS.DO_YOU_WANT_ANY_CONTACTS,
  delay: 2500,
  conditions: {
    [MESSAGE_CONTACT_NAME.MICHAEL]: {
      routes: {
        [MICHAEL_IDS.ABOUT_TONIGHT_REPLY]: { finished: true },
      },
    },
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.I_AM_BEING_HARASSED]: { finished: true },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["Do you want any of our mutual contacts"],
    },
  ],
};
