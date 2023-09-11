import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { NotificationRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "./routes";

export const spam1_introduction: NotificationRouteType = {
  id: SPAM1_IDS.SPAM_INTRODUCTION,
  delay: 5000,
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.SPAM1,
      messages: ["How's is today going?"],
    },
  ],
};
