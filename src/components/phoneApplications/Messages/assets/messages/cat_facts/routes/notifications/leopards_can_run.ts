import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { ZARA_ROUTE_IDS } from "../../../zara/routes/routes";
import { CAT_FACT_IDS } from "../routes";

export const leopards_can_run = {
  id: CAT_FACT_IDS.LEOPARDS_CAN_RUN,
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
        "A Leopard can run 36 miles an hour.",
        "How fast can you run?",
      ],
    },
  ],
};
