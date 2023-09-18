import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { FC, memo } from "react";

import { ExchangeWrapper } from "./ExchangeWrapper";
import { ConversationShowListItem } from "./types";
import useBubbleReducer from "./useBubbleReducer";
import SentMessageContainer from "./SentMessageContainer";
import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";

const ListItem: FC<ConversationShowListItem> = (props) => {
  const item = useBubbleReducer(props);
  let bubble;
  if (props.type === MESSAGE_CONTENT.TIME) {
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
  if (props.type !== MESSAGE_CONTENT.TIME && props.contentDelay) {
    if (props.name === MESSAGE_CONTACT_NAME.SELF) {
      return (
        <SentMessageContainer contentDelay={props.contentDelay}>
          {bubble}
        </SentMessageContainer>
      );
    } else {
      return bubble;
    }
  } else {
    return bubble;
  }
};
export default memo(ListItem);
