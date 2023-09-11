import { useAppEventsContext } from "@Components/appEvents/context";
import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { useFontsContext } from "src/contexts/fonts";

import createConversationReducer from "./reducer";
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from "./reducer/type";
import { ConversationType } from "../useConversations/types";

export const useConversation = (width: number) => {
  const eventContext = useAppEventsContext();
  const fontsContext = useFontsContext();

  const events = eventContext.state;
  const config = useMemo(() => {
    return {
      font: fontsContext.fonts.HelveticaNeue,
      emojiFont: fontsContext.fonts.NotoColor,
      width,
    };
  }, [fontsContext.fonts.HelveticaNeue, fontsContext.fonts.NotoColor, width]);

  const [state, dispatch] = useReducer(
    createConversationReducer(config),
    undefined,
  );

  const reducerResolver = useCallback(
    (action: ConversationReducerActionsType) => {
      dispatch(action);
    },
    [],
  );

  const _digestConversation = useCallback(
    async (_conversation: ConversationType) => {
      const digested = await digestConversation(config, _conversation, events);
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
        payload: digested,
      });
    },
    [config, events],
  );

  useEffect(() => {
    if (state?.eventAction != null) {
      eventContext.dispatch(state.eventAction);
    }
  }, [state?.eventAction, eventContext.dispatch]);

  useEffect(() => {
    dispatch({
      type: CONVERSATION_REDUCER_ACTIONS.REFRESH_AVAILABLE_ROUTE,
      payload: events,
    });
  }, [events]);

  useEffect(() => {
    NotificationEmitter.on(EMITTER_EVENTS.NOTIFICATION, (name) => {
      const _conversation = conversations.filter((c) => c.name === name)[0];
      digestConvo(_conversation);
    });
    return () => {
      NotificationEmitter.off(EMITTER_EVENTS.NOTIFICATION, () => {});
    };
  }, [conversations, digestConvo]);
};
