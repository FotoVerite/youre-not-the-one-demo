import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { LENNY_ROUTE_IDS } from "../../../lenny/routes/routes";
import { CAT_FACT_IDS } from "../routes";

export const clowder_of_cats = {
  id: CAT_FACT_IDS.CLOWDER_OF_CATS,
  delay: 5000,
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.WHY_AM_I_GETTING_CAT_FACTS]: {
          status: ROUTE_STATUS_TYPE.STARTED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.CAT_FACTS,
      messages: ["A group of cats is known as a clowder."],
    },
  ],
};
