import { DigestedConversationType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import { FC } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import ConversationList from "../ConversationShowList";
import TimeStampPan from "../ConversationShowList/TimeStampPan";
import RouteChooser from "../RouteChooser";

const ConversationContainer: FC<
  {
    conversation: DigestedConversationType;
  } & ConversationDispatchType
> = ({ conversation, dispatch }) => {
  const translateX = useSharedValue(0);
  return (
    <>
      <TimeStampPan translateX={translateX}>
        <ConversationList
          blockable={conversation.blockable === true}
          exchanges={conversation?.exchanges}
          dispatch={dispatch}
          translateX={translateX}
        />
      </TimeStampPan>
      <RouteChooser conversation={conversation} dispatch={dispatch} />
    </>
  );
};

export default ConversationContainer;
