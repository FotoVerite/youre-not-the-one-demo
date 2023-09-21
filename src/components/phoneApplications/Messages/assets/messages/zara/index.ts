import {
  MESSAGE_CONTACT_INFO,
  MESSAGE_CONTACT_NAME,
} from "@Components/phoneApplications/Messages/constants";
import { ConversationFileType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { i_dont_know_what_to_do_with_myself } from "./routes/I_really_dont_know_what_to_do_with_myself";
import { borked_phone } from "./routes/borked_phone";
import { can_i_have_chris } from "./routes/can_i_have_chris";
import { can_i_have_mileena } from "./routes/can_i_have_mileena";
import { zara_contact_conversation } from "./routes/contact_conversation";
import { zara_do_you_want_any_contacts } from "./routes/do_you_want_any_contacts";
import { how_is_the_phone_coming } from "./routes/how_is_the_new_phone";
import { your_new_video } from "./routes/hows_the_new_video";
import { i_am_being_harassed } from "./routes/i_am_being_harassed";
import { i_dont_feel_secure } from "./routes/i_dont_feel_secure";
import {
  i_fell_for_a_spam_did_not_send_images,
  i_fell_for_a_spam_did_send_images,
} from "./routes/i_fell_for_spam";
import { update_on_the_phone } from "./routes/update_on_phone";

const ZARA = MESSAGE_CONTACT_NAME.ZARA;

export const zara: ConversationFileType = {
  name: ZARA,
  tags: [ZARA, "Zara", "Hopescope", "Panopticon", "Ads", "Money"],
  heroImage: MESSAGE_CONTACT_INFO[ZARA].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[ZARA].colors[0],
  notificationRoutes: [
    how_is_the_phone_coming,
    zara_do_you_want_any_contacts,
    update_on_the_phone,
  ],
  routes: [
    borked_phone,
    your_new_video,
    i_fell_for_a_spam_did_not_send_images,
    i_fell_for_a_spam_did_send_images,
    zara_contact_conversation,
    i_dont_know_what_to_do_with_myself,
    i_dont_feel_secure,
    can_i_have_chris,
    can_i_have_mileena,
  ],
  exchanges: [],
};
