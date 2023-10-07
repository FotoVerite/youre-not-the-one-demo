import SlideInTransitionContainer from "@Components/SlideInTransitionContainer";
import { useConversation } from "@Components/phoneApplications/Messages/hooks/useConversation";
import { CONVERSATION_REDUCER_ACTIONS } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { ConversationType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";
import { FC, useEffect } from "react";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import { useInsetDimensions } from "src/utility/useInsetDimensions";

import Header from "./Header";
import ExchangeList from "../ExchangeList";

const NewMessageView: FC<{
  conversation?: ConversationType;
  shrink: SharedValue<number>;
}> = ({ conversation, shrink }) => {
  const { width } = useInsetDimensions();
  const [state, dispatch, digestConversation] = useConversation(width);

  useEffect(() => {
    if (conversation == null) {
      dispatch({ type: CONVERSATION_REDUCER_ACTIONS.RESET });
    } else if (!state) {
      digestConversation(conversation);
    }
  }, [conversation, digestConversation, dispatch, state]);

  return (
    <SlideInTransitionContainer
      toObserve={state}
      resolver={shrink}
      slideInfFrom="bottom"
      gutter={25}
    >
      {state && (
        <>
          <Header name={state.name} />
          <ExchangeList conversation={state} dispatch={dispatch} />
        </>
      )}
    </SlideInTransitionContainer>
  );
};

export default NewMessageView;
