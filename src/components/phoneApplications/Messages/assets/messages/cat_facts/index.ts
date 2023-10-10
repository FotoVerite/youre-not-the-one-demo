import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { cat_facts_first_notification } from "./routes/notifications/first_notification";
const NAME = MESSAGE_CONTACT_NAME.CAT_FACTS;
export const cat_facts: ConversationFileType = {
  name: NAME,
  tags: [NAME],
  blockable: true,
  heroImage: MESSAGE_CONTACT_INFO[NAME].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[NAME].colors[0],
  notificationRoutes: [cat_facts_first_notification],
  routes: [],
  exchanges: [],
};
