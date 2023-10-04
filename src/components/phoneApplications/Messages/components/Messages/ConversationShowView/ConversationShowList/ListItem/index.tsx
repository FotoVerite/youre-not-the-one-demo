import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  isDigestedBubble,
  isDigestedLabel,
} from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { FC, memo, useCallback, useState } from "react";

import { ExchangeWrapper } from "./ExchangeWrapper";
import SentMessageContainer from "./SentMessageContainer";
import { TypingContainer } from "./TypingContainer";
import { ConversationShowListItem } from "./types";
import useBubbleResolver from "./useBubbleResolver";

const ListItem: FC<ConversationShowListItem> = (props) => {
  const [resolved, _setAsResolved] = useState(false);

  const setAsResolved = useCallback(
    (isResolved: boolean) => {
      _setAsResolved(isResolved);
    },
    [_setAsResolved]
  );
  const item = useBubbleResolver({ ...props, setAsResolved });
  let bubble: React.JSX.Element;
  if (isDigestedLabel(props)) {
    bubble = item;
  } else {
    bubble = (
      <ExchangeWrapper
        addressee={props.addressee}
        alignItems={props.alignItems}
        avatar={props.avatar}
        colors={props.colors}
        height={props.height}
        name={props.name}
        group={props?.group || false}
        paddingBottom={props.paddingBottom}
        reactionAnimated={props.contentDelay != null}
        reactionName={props.reactionName}
        reactionDelay={
          props.reactionDelay ||
          0 + (props.contentDelay || 0) + (props.typingDelay || 0)
        }
        reactionColor={props.reactionColor}
        timestamp={props.timestamp}
        translateX={props.translateX}
      >
        {item}
      </ExchangeWrapper>
    );
  }
  if (isDigestedBubble(props)) {
    if (props.name === MESSAGE_CONTACT_NAME.SELF) {
      return (
        <SentMessageContainer
          resolved={resolved}
          contentDelay={props.contentDelay}
          dispatch={props.dispatch}
          height={props.height + props.paddingBottom}
        >
          {bubble}
        </SentMessageContainer>
      );
    } else {
      return (
        <TypingContainer {...props} resolved={resolved}>
          {bubble}
        </TypingContainer>
      );
    }
  } else {
    return bubble;
  }
};
export default memo(ListItem);
