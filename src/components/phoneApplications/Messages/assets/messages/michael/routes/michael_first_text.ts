import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { MICHAEL_IDS } from "./routes";
import { ZARA_ROUTE_IDS } from "../../zara/routes/routes";

export const michael_first_text = {
  id: MICHAEL_IDS.FIRST_TEXT,
  delay: 7500,
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.I_FELL_FOR_SPAM]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
        [ZARA_ROUTE_IDS.MY_BRO_IS_BEING_SO_ANNOYING]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.MICHAEL,
      messages: [
        "Yo, so we’re still on for tonight? I can’t believe it’s been two weeks.",
      ],
    },
  ],
};
