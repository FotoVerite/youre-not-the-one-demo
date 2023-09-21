import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

import { MICHAEL_IDS } from "./routes";

export const michael_first_text = {
  id: MICHAEL_IDS.FIRST_TEXT,
  delay: 7500,
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.MICHAEL,
      messages: [
        "Yo, so we’re still on for tonight? I can’t believe it’s been two weeks.",
      ],
    },
  ],
};
