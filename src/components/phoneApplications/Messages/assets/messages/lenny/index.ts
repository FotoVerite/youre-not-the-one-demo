import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { because_you_think_its_funny } from "./routes/chooseable/because_you_think_its_funny";
import { lenny_midnight_society } from "./routes/chooseable/lenny_midnight_society";
import { why_am_i_getting_cat_facts } from "./routes/chooseable/why_am_I_getting_cat_facts";
import { yes_exactly } from "./routes/chooseable/yes_exactly";
import { im_still_confused } from "./routes/notifications/im_still_confused";
import { my_ahri_build } from "./routes/notifications/my_ahir_build";
import { lenny_want_to_hear_something_scary } from "./routes/notifications/want_to_hear_something_scary";

const LENNY = MESSAGE_CONTACT_NAME.LENNY;
export const lenny: ConversationFileType = {
  name: LENNY,
  tags: [LENNY],
  heroImage: MESSAGE_CONTACT_INFO[LENNY].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[LENNY].colors[0],
  notificationRoutes: [
    lenny_want_to_hear_something_scary,
    im_still_confused,
    my_ahri_build,
  ],
  exchanges: [],
  routes: [
    lenny_midnight_society,
    why_am_i_getting_cat_facts,
    because_you_think_its_funny,
    yes_exactly,
  ],
};
