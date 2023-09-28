import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import moment from "moment";

import { check_if_txt_is_working } from "./routes/check_if_txt_is_working";

const SELF = MESSAGE_CONTACT_NAME.SELF;
export const toSelf: ConversationFileType = {
  name: MESSAGE_CONTACT_NAME.MY_SELF,
  tags: [SELF],
  heroImage: MESSAGE_CONTACT_INFO[SELF].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[SELF].colors[0],
  leaveAsDelivered: true,
  notificationRoutes: [],
  routes: [check_if_txt_is_working],
  exchanges: [
    {
      time: moment().subtract(5, "minutes").toISOString(),
      exchanges: [
        {
          name: MESSAGE_CONTACT_NAME.SELF,
          messages: ["Is this working?"],
        },
      ],
    },
  ],
};
