import EventEmitter from "eventemitter3";

export enum LIST_EMITTER_EVENTS {
  END = "END",
  TO_INDEX = "TO_INDEX",
  TO_OFFSET = "TO_OFFSET",
  ADD_TO_OFFSET = "ADD_TO_OFFSET",
}
const eventEmitter = new EventEmitter<LIST_EMITTER_EVENTS>();
const ListOffsetEmitter = {
  on: (event: LIST_EMITTER_EVENTS, fn: (payload: number) => void) =>
    eventEmitter.on(event, fn),
  once: (event: LIST_EMITTER_EVENTS, fn: (payload: number) => void) =>
    eventEmitter.once(event, fn),
  off: (event: LIST_EMITTER_EVENTS, fn: (payload: number) => void) =>
    eventEmitter.off(event, fn),
  emit: (event: LIST_EMITTER_EVENTS, payload: number) =>
    eventEmitter.emit(event, payload),
};
Object.freeze(ListOffsetEmitter);
export default ListOffsetEmitter;
