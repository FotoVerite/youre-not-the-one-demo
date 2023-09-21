import { useAppEventsContext } from "@Components/appEvents/context";
import { AppEventsReducerActionsType } from "@Components/appEvents/reducer/types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useFontsContext } from "src/contexts/fonts";
import { LOG, LOG_COLORS } from "src/utility/logger";

import { digestConversation } from "./digestion";
import createConversationReducer from "./reducer";
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from "./reducer/type";
import { ConversationType } from "../useConversations/types";

export const useConversation = (
  width: number,
  conversation?: ConversationType
) => {
  const { state: events, dispatch: eventsDispatch } = useAppEventsContext();
  const fontsContext = useFontsContext();
  const cleanupAction = useRef<AppEventsReducerActionsType>();

  const config = useMemo(() => {
    return {
      font: fontsContext.fonts.HelveticaNeue,
      emojiFont: fontsContext.fonts.NotoColor,
      width,
    };
  }, [fontsContext.fonts.HelveticaNeue, fontsContext.fonts.NotoColor, width]);

  const [state, dispatch] = useReducer(
    createConversationReducer(config),
    undefined
  );

  const reducerResolver = useCallback(
    (action: ConversationReducerActionsType) => {
      dispatch(action);
    },
    [dispatch]
  );

  const _digestConversation = useCallback(
    async (_conversation?: ConversationType) => {
      if (!_conversation) {
        return;
      }
      const digested = await digestConversation(config, _conversation, events);
      cleanupAction.current = undefined;
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
        payload: digested,
      });
    },
    [config, events]
  );

  useEffect(() => {
    if (state?.eventAction != null) {
      eventsDispatch(state.eventAction);
    }
  }, [state?.eventAction, eventsDispatch]);

  useEffect(() => {
    dispatch({
      type: CONVERSATION_REDUCER_ACTIONS.REFRESH_AVAILABLE_ROUTE,
      payload: events,
    });
  }, [events]);

  useEffect(() => {
    if (!state && cleanupAction.current) {
      LOG(LOG_COLORS.FgYellow, "Cleanup Action Called", cleanupAction.current);
      eventsDispatch(cleanupAction.current);
      cleanupAction.current = undefined;
    }
  }, [eventsDispatch, state]);

  useEffect(() => {
    cleanupAction.current = state?.cleanupAction;
  }, [state?.cleanupAction]);

  useMemo(() => {
    _digestConversation(conversation);
  }, [_digestConversation, conversation]);

  return [state, reducerResolver, _digestConversation] as const;
};
