import {
  BubbleItemType,
  DigestedConversationListItem,
} from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationReducerActionsType } from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import Animated, { SharedValue } from "react-native-reanimated";

type AdditionalProps = {
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.FlatList<DigestedConversationListItem>>;
  dispatch: (action: ConversationReducerActionsType) => void;
  setAsResolved: (isResolved: boolean) => void;
  translateX: SharedValue<number>;
};

export type ExchangeListItemType = DigestedConversationListItem &
  AdditionalProps;

export type ExchangeBubbleItemType = BubbleItemType & AdditionalProps;

export type SentMessageContainerType = {
  contentDelay?: number;
  height: number;
  resolved: boolean;
} & ConversationDispatchType;
