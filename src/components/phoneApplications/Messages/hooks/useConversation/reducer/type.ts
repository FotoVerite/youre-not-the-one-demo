import { AppEventsType } from "@Components/appEvents/reducer/types";

import { ConversationType } from "../../useConversations/types";
import {
  DigestedConversationType,
  DigestedMessageProps,
} from "../digestion/types";

export enum CONVERSATION_REDUCER_ACTIONS {
  ADD_CONVERSATION,
  ADD_MESSAGE,
  BLOCK,
  CONTINUE_ROUTE,
  DIGEST_CONVERSATION,
  REFRESH,
  START_ROUTE,
  SKIP_ROUTE,
  UPDATE_MESSAGE,
  RESET,
}

type AddConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION;
  payload: DigestedConversationType;
};

type BlockActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.BLOCK;
};
type ContinueRouteActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE;
};

export type DigestConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.DIGEST_CONVERSATION;
  payload: {
    conversation: ConversationType;
    events: AppEventsType;
    newMessage?: boolean;
  };
};

type RefreshAvailableRouteActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.REFRESH;
  payload: AppEventsType;
};

type ResetConversationActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.RESET;
};

type StartRouteActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE;
  payload: {
    chosenOption: string;
  };
};
type SkipRouteActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.SKIP_ROUTE;
};

type UpdateMessageActionType = {
  type: CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE;
  payload: {
    props: DigestedMessageProps;
    ID: string;
  };
};

export type ConversationReducerActionsType =
  | AddConversationActionType
  | BlockActionType
  | ContinueRouteActionType
  | DigestConversationActionType
  | RefreshAvailableRouteActionType
  | ResetConversationActionType
  | StartRouteActionType
  | SkipRouteActionType
  | UpdateMessageActionType;
