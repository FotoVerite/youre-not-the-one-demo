import EventEmitter from "eventemitter3";

import { MESSAGE_CONTACT_NAME } from "../constants";

export enum CONVERSATION_EMITTER_EVENTS {
  SHOW = "SHOW_CONVERSATION",
  RESET = "RESET_CONVERSATION",
}
const eventEmitter = new EventEmitter<
  CONVERSATION_EMITTER_EVENTS,
  () => void
>();
const ConversationEmitter = {
  on: (
    event: CONVERSATION_EMITTER_EVENTS,
    fn: (payload: {
      name: MESSAGE_CONTACT_NAME;
      type?: "new" | "base";
      additional?: string;
    }) => void,
  ) => eventEmitter.on(event, fn),
  once: (
    event: CONVERSATION_EMITTER_EVENTS,
    fn: (payload: {
      name: MESSAGE_CONTACT_NAME;
      type?: "new" | "base";
      additional?: string;
    }) => void,
  ) => eventEmitter.once(event, fn),
  off: (
    event: CONVERSATION_EMITTER_EVENTS,
    fn: (payload: {
      name: MESSAGE_CONTACT_NAME;
      type?: "new" | "base";
      additional?: string;
    }) => void,
  ) => eventEmitter.off(event, fn),
  emit: (
    event: CONVERSATION_EMITTER_EVENTS,
    payload: {
      name: MESSAGE_CONTACT_NAME;
      type?: "new" | "base";
      additional?: string;
    },
  ) => eventEmitter.emit(event, payload),
};
Object.freeze(ConversationEmitter);
export default ConversationEmitter;
