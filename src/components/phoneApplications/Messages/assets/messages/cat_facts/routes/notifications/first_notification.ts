import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { MICHAEL_IDS } from "../../../michael/routes/routes";
import { CAT_FACT_IDS } from "../routes";

export const cat_facts_first_notification = {
  id: CAT_FACT_IDS.FIRST_NOTIFICATION,
  delay: 5500,
  conditions: {
    [MESSAGE_CONTACT_NAME.MICHAEL]: {
      routes: {
        [MICHAEL_IDS.ABOUT_TONIGHT_REPLY]: {
          status: ROUTE_STATUS_TYPE.STARTED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.CAT_FACTS,
      messages: [
        "Thank You for signing up for Cat Facts! You will now receive daily facts about cats! >o<",
      ],
    },
  ],
};
