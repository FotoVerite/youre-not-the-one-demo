import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  isDigestedBubble,
  isDigestedLabel,
} from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import { FC, memo } from "react";

import { ExchangeWrapper } from "./ExchangeWrapper";
import SentMessageContainer from "./SentMessageContainer";
import { TypingContainer } from "./TypingContainer";
import { ConversationShowListItem } from "./types";
import useBubbleResolver from "./useBubbleResolver";

const ListItem: FC<ConversationShowListItem> = (props) => {
  const { dispatch, ...propsWithoutDispatch } = props;
  const item = useBubbleResolver(propsWithoutDispatch);
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
        reactionDelay={props.reactionDelay}
        reactionColor={props.reactionColor}
      >
        {item}
      </ExchangeWrapper>
    );
  }
  if (isDigestedBubble(props)) {
    if (props.name === MESSAGE_CONTACT_NAME.SELF) {
      return (
        <SentMessageContainer
          contentDelay={props.contentDelay}
          dispatch={dispatch}
          height={props.height + props.paddingBottom}
        >
          {bubble}
        </SentMessageContainer>
      );
    } else {
      return <TypingContainer {...props}>{bubble}</TypingContainer>;
    }
  } else {
    return bubble;
  }
};
export default memo(ListItem);
