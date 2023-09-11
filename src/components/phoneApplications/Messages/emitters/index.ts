import EventEmitter from "eventemitter3";

import { MESSAGE_CONTACT_NAME } from "../constants";

export enum CONVERSATION_EMITTER_EVENTS {
  SHOW = "SHOW_CONVERSATION",
  SHOW_AS_NEW = "SHOW_CONVERSATION_AS_NEW_CONVERSATION",
}
const eventEmitter = new EventEmitter<
  CONVERSATION_EMITTER_EVENTS,
  () => void
>();
const ConversationEmitter = {
  on: (
    event: CONVERSATION_EMITTER_EVENTS,
    fn: (name: MESSAGE_CONTACT_NAME) => void,
  ) => eventEmitter.on(event, fn),
  once: (
    event: CONVERSATION_EMITTER_EVENTS,
    fn: (name: MESSAGE_CONTACT_NAME) => void,
  ) => eventEmitter.once(event, fn),
  off: (
    event: CONVERSATION_EMITTER_EVENTS,
    fn: (name: MESSAGE_CONTACT_NAME) => void,
  ) => eventEmitter.off(event, fn),
  emit: (event: CONVERSATION_EMITTER_EVENTS, payload: MESSAGE_CONTACT_NAME) =>
    eventEmitter.emit(event, payload),
};
Object.freeze(ConversationEmitter);
export default ConversationEmitter;
