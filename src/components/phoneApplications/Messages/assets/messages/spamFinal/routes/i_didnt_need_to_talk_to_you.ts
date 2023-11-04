import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  NotificationRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM_FINAL_ROUTE_IDS } from "./routes";

const SELF = MESSAGE_CONTACT_NAME.SELF;
const SPAM = MESSAGE_CONTACT_NAME.SPAM4;

export const pathetic: NotificationRouteType = {
  id: SPAM_FINAL_ROUTE_IDS.I_DIDNT_NEED_TO_TALK_TO_YOU,
  status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET,
  exchanges: [
    {
      name: SPAM,
      messages: [
        "Of course like you I like to waste my time",
        "You know I didn't need to contact you at all?",
        "I've been unkind and for that... ",
        "Nah I don't actually care. I just want to be done",
      ],
    },
    {
      name: SELF,
      messages: ["What?"],
    },
    {
      name: SPAM,
      messages: ["We're done", "I'm getting what I want"],
    },
  ],
};
