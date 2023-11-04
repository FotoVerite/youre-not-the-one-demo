import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { ZARA_ROUTE_IDS } from "../../../zara/routes/routes";
import { CAT_FACT_IDS } from "../routes";

export const the_big_four = {
  id: CAT_FACT_IDS.THE_BIG_FOUR,
  delay: 2500,
  conditions: {
    [MESSAGE_CONTACT_NAME.MICHAEL]: {
      routes: {
        [ZARA_ROUTE_IDS.ZARA_AM_I_REALLY_TALKING_TO_YOU]: {},
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.CAT_FACTS,
      messages: [
        "Tigers are the largest wild cats in the world.",
        "Adults tigers can weight up to 800lbs and be over 10 feet; that's like 2 of you isn't it?",
      ],
    },
  ],
};
