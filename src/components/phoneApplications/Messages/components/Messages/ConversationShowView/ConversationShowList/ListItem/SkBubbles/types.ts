import {
  BubbleItemType,
  DigestedConversationListItem,
} from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { ConversationDispatchType } from "@Components/phoneApplications/Messages/hooks/useConversation/types";
import { FlatList } from "react-native-gesture-handler";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import Animated from "react-native-reanimated";

export type SkBubbleType = Pick<
  BubbleItemType,
  | "colors"
  | "offset"
  | "content"
  | "addressee"
  | "width"
  | "height"
  | "effect"
  | "ID"
  | "isLastInExchange"
> & {
  setAsResolved: (isResolved: boolean) => void;
} & ConversationDispatchType;

export type SkBubbleTypeWithGradient = SkBubbleType & {
  scrollHandler: SharedValue<number>;
  scrollRef: React.RefObject<Animated.FlatList<DigestedConversationListItem>>;
};
