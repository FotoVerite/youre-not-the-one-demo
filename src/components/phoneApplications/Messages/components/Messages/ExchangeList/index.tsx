import { DigestedConversationType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import React, { FC } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import List from "./List";
import RouteChooser from "./RouteChooser";
import TimeStampPan from "./TimeStampPan";

const ExchangeList: FC<
  {
    conversation: DigestedConversationType;
  } & ConversationDispatchType
> = ({ conversation, dispatch }) => {
  const translateX = useSharedValue(0);
  return (
    <View key={conversation.name} style={{ flex: 1 }}>
      <TimeStampPan translateX={translateX}>
        <List
          blockable={conversation.blockable === true}
          exchanges={conversation?.exchanges}
          dispatch={dispatch}
          translateX={translateX}
        />
      </TimeStampPan>
      <RouteChooser conversation={conversation} dispatch={dispatch} />
    </View>
  );
};

export default ExchangeList;
