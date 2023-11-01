import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { ZARA_ROUTE_IDS } from "../../../zara/routes/routes";
import { CAT_FACT_IDS } from "../routes";

export const jaguars_can_bite = {
  id: CAT_FACT_IDS.JAGUARS_CAN_BITE,
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
        "Jaguars have the strongest jaw muscles of all of the big cats. Their bite force is around 1,500 pounds per square inch, which is about double that of a tiger!",
        "It only takes 6 pounds of pressure to fracture the human skull in the right area",
      ],
    },
  ],
};
