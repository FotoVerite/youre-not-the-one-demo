import { but_seriously } from "./routes/but_seriously";
import { my_quads } from "./routes/my_quads";
import { MESSAGE_CONTACT_INFO, MESSAGE_CONTACT_NAME } from "../constants";
import { ConversationFileType } from "../hooks/useConversations/types";

const NAME = MESSAGE_CONTACT_NAME.MILEENA;
export const mileena: ConversationFileType = {
  name: NAME,
  tags: [NAME],
  heroImage: MESSAGE_CONTACT_INFO[NAME].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[NAME].colors[0],
  exchanges: [],
  routes: [my_quads, but_seriously],
};
