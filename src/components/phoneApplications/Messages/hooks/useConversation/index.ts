import { useAppEventsContext } from "@Components/appEvents/context";
import {
  APP_EVENTS_ACTIONS,
  AppEventsReducerActionsType,
} from "@Components/appEvents/reducer/types";
import { useRef, useMemo, useReducer, useCallback, useEffect } from "react";
import { useFontsContext } from "src/contexts/fonts";
import { useImageCacheContext } from "src/contexts/imageCache";
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
import { findRouteEventIdsByStatus } from "../routes/filter";
import { isNotificationRoute } from "../routes/guards";
import { resolveRoutesPath } from "../routes/resolver";
import { AbstractDigestedRouteType, ROUTE_STATUS_TYPE } from "../routes/types";
import { ConversationType } from "../useConversations/types";

export const useConversation = (
  width: number,
  conversation?: ConversationType
) => {
  const { state: events, dispatch: eventsDispatch } = useAppEventsContext();
  const fontsContext = useFontsContext();
  const cache = useImageCacheContext().cache;
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
      const digested = digestConversation(config, _conversation, events, cache);
      cleanupAction.current = undefined;
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.ADD_CONVERSATION,
        payload: digested,
      });
    },
    [config, events, cache]
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
    const refreshConversation = async () => {
      if (!state) return;
      const blockable = blockableConditionsMet(state, events);
      let activeRoute: undefined | AbstractDigestedRouteType;
      if (
        !state.activeRoute ||
        state.activeRoute.status === ROUTE_STATUS_TYPE.AVAILABLE
      ) {
        const triggerableRouteIds: string[] = findRouteEventIdsByStatus(
          events.Messages[state.name],
          ROUTE_STATUS_TYPE.AVAILABLE
        );

        if (triggerableRouteIds.length > 0) {
          const availableRoutes = triggerableRouteIds.map(
            (id) => state.availableRoutes[id]
          );
          const notificationRoutes = availableRoutes.filter((r) =>
            isNotificationRoute(r)
          );
          const route =
            notificationRoutes.length > 0
              ? notificationRoutes[0]
              : availableRoutes[0];

          activeRoute = {
            ...route,
            status: ROUTE_STATUS_TYPE.AVAILABLE,
          };
          activeRoute = resolveRoutesPath(events, cache, activeRoute);
        }
      }
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.REFRESH,
        payload: {
          blockable,
          activeRoute,
        },
      });
    };
    refreshConversation();
  }, [state, events, cache, width]);

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
