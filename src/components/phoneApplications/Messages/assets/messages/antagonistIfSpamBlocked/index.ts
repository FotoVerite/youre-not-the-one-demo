import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ROUTE_STATUS_TYPE } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { produce } from "immer";

import { what_is_with_this_serial_killer_bullshit } from "./choosable/antagonist_what_is_with_this_serial_killer_bullshit";
import { dont_you_miss_me } from "./notifications/dont_you_miss_me";
import { why_dont_you_respond } from "./notifications/why_dont_you_reply";
import { why_dont_you_respond2 } from "./notifications/why_dont_you_reply2";
import { why_dont_you_respond3 } from "./notifications/why_dont_you_reply3";
import { why_dont_you_respond4 } from "./notifications/why_dont_you_reply4";
import { ANTAGONIST_IF_BLOCKED } from "./routes/routes";

const createReplications = (
  original: ConversationFileType,
  replicateName: MESSAGE_CONTACT_NAME,
  deleteRoute?: number
) => {
  return produce(original, (draft) => {
    const originalName = draft.name;
    const name = replicateName;
    draft.name = name;
    draft.conditions = { [originalName]: { blocked: true } };
    if (draft.blockable && draft.blockable !== true) {
      const conditions = draft.blockable.conditions[originalName]?.routes;
      draft.blockable = {
        conditions: {
          [replicateName]: { routes: conditions },
        },
      };
    }
    draft.notificationRoutes?.shift();
    draft.notificationRoutes?.forEach((route, index) => {
      route.delay = 1500;
      if (
        route.conditions == null ||
        Array.isArray(route.conditions) ||
        route.conditions[originalName] == null
      ) {
        return;
      }

      const originalConditions = route.conditions[originalName]!.routes!;
      if (deleteRoute) delete originalConditions[deleteRoute + ""];
      route.conditions =
        index === 0
          ? {
              [originalName]: { blocked: true, routes: originalConditions },
            }
          : {
              [replicateName]: { routes: originalConditions },
            };
    });
    return draft;
  });
};

const NAME = MESSAGE_CONTACT_NAME.SPAM2;
const antagonistIfSpamBlocked: ConversationFileType = {
  name: NAME,
  tags: [NAME],
  heroImage: MESSAGE_CONTACT_INFO[NAME].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[NAME].colors[0],
  notificationRoutes: [
    dont_you_miss_me,
    why_dont_you_respond,
    why_dont_you_respond2,
    why_dont_you_respond3,
    why_dont_you_respond4,
  ],
  blockable: {
    conditions: {
      [MESSAGE_CONTACT_NAME.SPAM2]: {
        routes: {
          [ANTAGONIST_IF_BLOCKED.WHY_DONT_YOU_RESPOND4]: {
            status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET,
          },
        },
      },
    },
  },
  exchanges: [],
  routes: [what_is_with_this_serial_killer_bullshit],
};

export const antagonist1 = { ...antagonistIfSpamBlocked };

export const antagonist2 = createReplications(
  antagonistIfSpamBlocked,
  MESSAGE_CONTACT_NAME.SPAM3,
  ANTAGONIST_IF_BLOCKED.DONT_YOU_MISS_ME
);

export const antagonist3 = createReplications(
  antagonist2,
  MESSAGE_CONTACT_NAME.SPAM4
);

export const antagonist4 = createReplications(
  antagonist3,
  MESSAGE_CONTACT_NAME.SPAM5
);

export const antagonist5 = createReplications(
  antagonist4,
  MESSAGE_CONTACT_NAME.SPAM6
);
