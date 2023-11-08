import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { lenny_midnight_society } from "./routes/lenny_midnight_society";
import { my_ahri_build } from "./routes/notifications/my_ahir_build";
import { lenny_want_to_hear_something_scary } from "./routes/want_to_hear_something_scary";

const LENNY = MESSAGE_CONTACT_NAME.LENNY;
export const lenny: ConversationFileType = {
  name: LENNY,
  tags: [LENNY],
  heroImage: MESSAGE_CONTACT_INFO[LENNY].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[LENNY].colors[0],
  notificationRoutes: [lenny_want_to_hear_something_scary, my_ahri_build],
  exchanges: [],
  routes: [lenny_midnight_society],
};
