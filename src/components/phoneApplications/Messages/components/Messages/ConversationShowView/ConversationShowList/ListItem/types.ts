import { DigestedConversationListItem } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import Animated, { SharedValue } from "react-native-reanimated";

export type ConversationShowListItem = DigestedConversationListItem & {
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.FlatList<DigestedConversationListItem>>;
};
