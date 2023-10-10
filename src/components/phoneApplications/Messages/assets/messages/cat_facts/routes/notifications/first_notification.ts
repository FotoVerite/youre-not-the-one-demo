import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { MICHAEL_IDS } from "../../../michael/routes/routes";
import { CAT_FACT_IDS } from "../routes";

export const cat_facts_first_notification = {
  id: CAT_FACT_IDS.FIRST_NOTIFICATION,
  delay: 2500,
  conditions: {
    [MESSAGE_CONTACT_NAME.MICHAEL]: {
      routes: {
        [MICHAEL_IDS.ABOUT_TONIGHT_REPLY]: {},
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
