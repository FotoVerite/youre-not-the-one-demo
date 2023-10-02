import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { michael_about_tonight_reply } from "./routes/michae_about_tonight_reply";
import { michael_first_text } from "./routes/michael_first_text";
import { SPAM1_IDS } from "../spam1/routes/routes";
import { ZARA_ROUTE_IDS } from "../zara/routes/routes";
const MICHAEL = MESSAGE_CONTACT_NAME.MICHAEL;
export const michael: ConversationFileType = {
  name: MESSAGE_CONTACT_NAME.MICHAEL,
  tags: [MESSAGE_CONTACT_NAME.MICHAEL, "love", "boyfriend", "sex"],
  heroImage: MESSAGE_CONTACT_INFO[MICHAEL].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[MICHAEL].colors[0],
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: {
        [ZARA_ROUTE_IDS.I_FELL_FOR_SPAM]: { finished: true },
        [ZARA_ROUTE_IDS.MY_BRO_IS_BEING_SO_ANNOYING]: { finished: true },
      },
    },
  },
  notificationRoutes: [michael_first_text],
  routes: [michael_about_tonight_reply],
  exchanges: [],
};
