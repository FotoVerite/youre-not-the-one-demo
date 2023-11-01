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
        "Leopards, Jaguars and Tigers all sneak up on their prey and ‘ambush’ them.",
        "Lions are known as ‘pursuit’ predators.They will stalk their prey and wait for the right time to pounce.",
        "Am I a lion or am I like the other big cats",
      ],
    },
  ],
};
