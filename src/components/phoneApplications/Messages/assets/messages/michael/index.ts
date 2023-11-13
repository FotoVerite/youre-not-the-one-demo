import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { michael_about_tonight_reply } from "./routes/choosable/michae_about_tonight_reply";
import { michael_first_text } from "./routes/notifications/michael_first_text";
const MICHAEL = MESSAGE_CONTACT_NAME.MICHAEL;
export const michael: ConversationFileType = {
  name: MESSAGE_CONTACT_NAME.MICHAEL,
  tags: [MESSAGE_CONTACT_NAME.MICHAEL, "love", "boyfriend", "sex"],
  heroImage: MESSAGE_CONTACT_INFO[MICHAEL].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[MICHAEL].colors[0],
  notificationRoutes: [michael_first_text],
  routes: [michael_about_tonight_reply],
  exchanges: [],
};
