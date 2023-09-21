import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import moment from "moment";

import { leo_did_I_write_this } from "./routes/did_I_write_this";
import { leo_first_monologue } from "./routes/first_monologue";

const LEO = MESSAGE_CONTACT_NAME.LEO;
export const leo: ConversationFileType = {
  name: LEO,
  tags: [LEO],
  heroImage: MESSAGE_CONTACT_INFO[LEO].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[LEO].colors[0],
  notificationRoutes: [],
  routes: [leo_first_monologue, leo_did_I_write_this],
  exchanges: [
    {
      time: moment().subtract(5, "minutes").toISOString(),
      exchanges: [
        {
          name: MESSAGE_CONTACT_NAME.SELF,
          messages: ["I don't know what to do with myself"],
        },
      ],
    },
  ],
};
