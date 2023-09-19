import { ConversationReducerActionsType } from "./reducer/type";

export type ConversationDispatchType = {
  dispatch: (action: ConversationReducerActionsType) => void;
};
