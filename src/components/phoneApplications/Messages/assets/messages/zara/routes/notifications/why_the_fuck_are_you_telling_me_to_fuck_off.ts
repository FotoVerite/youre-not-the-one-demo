import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { NotificationRouteFileType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "../routes";

export const zara_why_are_you_telling_me_to_fuck_off: NotificationRouteFileType =
  {
    id: ZARA_ROUTE_IDS.WHY_ARE_YOU_TELLING_ME_TO_FUCK_OFF,
    delay: 2500,
    conditions: {},
    exchanges: [
      {
        name: MESSAGE_CONTACT_NAME.ZARA,
        messages: ["Why are you telling me to fuck off?"],
      },
    ],
  };
