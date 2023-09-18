import { useConversation } from "@Components/phoneApplications/Messages/hooks/useConversation";
import { ConversationType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { FC, useEffect } from "react";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import ConversationList from "../ConversationShowList";
import RouteChooser from "../RouteChooser";
import ConversationEmitter, {
  CONVERSATION_EMITTER_EVENTS,
} from "@Components/phoneApplications/Messages/emitters";
import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";

const ConversationContainer: FC<{
  conversation: ConversationType;
}> = ({ conversation }) => {
  const { width } = useInsetDimensions();
  const [state, dispatch] = useConversation(width, conversation);

  useEffect(() => {
    ConversationEmitter.on(
      CONVERSATION_EMITTER_EVENTS.START_ROUTE,
      ({ name, type, additional }) => {
        if (additional)
          dispatch({
            type: CONVERSATION_REDUCER_ACTIONS.START_ROUTE,
            payload: { chosenOption: additional },
          });
      }
    );
    return () => {
      ConversationEmitter.off(
        CONVERSATION_EMITTER_EVENTS.START_ROUTE,
        () => {}
      );
    };
  }, [dispatch]);

  useEffect(() => {
    ConversationEmitter.on(
      CONVERSATION_EMITTER_EVENTS.CONTINUE,
      ({ name, type, additional }) => {
        dispatch({
          type: CONVERSATION_REDUCER_ACTIONS.CONTINUE_ROUTE,
        });
      }
    );
    return () => {
      ConversationEmitter.off(CONVERSATION_EMITTER_EVENTS.CONTINUE, () => {});
    };
  }, [dispatch]);
  return (
    <>
      {state && (
        <>
          <ConversationList exchanges={state?.exchanges} />
          <RouteChooser conversation={state} />
        </>
      )}
    </>
  );
};

export default ConversationContainer;
