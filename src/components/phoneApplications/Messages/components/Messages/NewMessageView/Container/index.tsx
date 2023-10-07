import { DigestedConversationType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import { FC } from "react";

import ConversationList from "../../ExchangeList";
import RouteChooser from "../../ExchangeList/RouteChooser";

const Container: FC<
  {
    conversation: DigestedConversationType;
  } & ConversationDispatchType
> = ({ conversation, dispatch }) => {
  return (
    <>
      <ConversationList
        exchanges={conversation?.exchanges}
        dispatch={dispatch}
        height={12}
      />
      <RouteChooser conversation={conversation} dispatch={dispatch} />
    </>
  );
};

export default Container;
