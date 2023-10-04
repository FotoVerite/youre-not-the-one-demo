import { useAppEventsContext } from "@Components/appEvents/context";
import {
  APP_EVENTS_ACTIONS,
  AppEventsReducerActionsType,
} from "@Components/appEvents/reducer/types";
import { useRef, useMemo, useReducer, useCallback, useEffect } from "react";
import { useFontsContext } from "src/contexts/fonts";
import { delayFor } from "src/utility/async";
import { LOG, LOG_COLORS } from "src/utility/logger";

import { digestConversation } from "./digestion";
import { blockableConditionsMet } from "./digestion/blockable";
import createConversationReducer from "./reducer";
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from "./reducer/type";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "../../emitters";
import { findStartableRoute } from "../routes/available";
import { isActiveNotificationRoute } from "../routes/guards";
import { ConversationType } from "../useConversations/types";
import { ROUTE_STATE_TYPE } from "../routes/types";

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
      if (
        state.eventAction.type ===
        APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION
      ) {
        ConversationEmitter.emit(CONVERSATION_EMITTER_EVENTS.RESET, {
          name: state.name,
        });
      }
    }
  }, [state?.eventAction, state?.name, eventsDispatch]);

  useEffect(() => {
    const refreshConversation = () => {
      if (!state) return;
      if (state.activeRoute) return;


      const blockable = blockableConditionsMet(state, events);
      const routes = Object.entries(events.Messages[state.name].routes).filter(
        ([id, r]) => !r.finished,
      );
      let activeRoute
      if (routes.length > 0 && state.availableRoutes[routes[0][0]]) {
        activeRoute = {
          ...state.availableRoutes[routes[0][0]],
          ...{ finished: ROUTE_STATE_TYPE.ACTIVE as const }
        }
      }
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.REFRESH,
        payload: {
          blockable,
          activeRoute
        },
      });
    };
    refreshConversation();
  }, [state, events]);

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
