import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { your_mom_is_a_cunt } from "./routes/notifications/your_mom_is_a_cunt";

const EMMA = MESSAGE_CONTACT_NAME.EMMA;
export const emma: ConversationFileType = {
  name: EMMA,
  tags: [EMMA],
  heroImage: MESSAGE_CONTACT_INFO[EMMA].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[EMMA].colors[0],
  notificationRoutes: [your_mom_is_a_cunt],
  exchanges: [],
  routes: [],
};
