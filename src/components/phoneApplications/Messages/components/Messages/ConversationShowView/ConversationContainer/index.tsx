import { DigestedConversationType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import { FC } from "react";

import ConversationList from "../ConversationShowList";
import RouteChooser from "../RouteChooser";

const ConversationContainer: FC<
  {
    conversation: DigestedConversationType;
  } & ConversationDispatchType
> = ({ conversation, dispatch }) => {
  return (
    <>
      <ConversationList
        blockable={conversation.blockable === true}
        exchanges={conversation?.exchanges}
        dispatch={dispatch}
      />
      <RouteChooser conversation={conversation} dispatch={dispatch} />
    </>
  );
};

export default ConversationContainer;
