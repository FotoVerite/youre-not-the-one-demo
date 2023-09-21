import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  MESSAGE_CONTENT,
  EFFECT_TYPE,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { LEO_ROUTE_IDS } from "./routes";

const LEO = MESSAGE_CONTACT_NAME.LEO;
const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Did I write this?",
}

export const leo_did_I_write_this: MessageRouteType = {
  id: LEO_ROUTE_IDS.DID_I_WRITE_THIS,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: { views: { gte: 10 } },
  },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [
          {
            type: MESSAGE_CONTENT.STRING,
            message: "Did I? Did You?, Did I?, Did You?",
            effect: { type: EFFECT_TYPE.GLITCH },
          },
        ],
      },
    ],
  },
};
