import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { FC, memo } from "react";

import { ExchangeWrapper } from "./ExchangeWrapper";
import { ConversationShowListItem } from "./types";
import useBubbleReducer from "./useBubbleReducer";

const ListItem: FC<ConversationShowListItem> = (props) => {
  const item = useBubbleReducer(props);
  if (props.type === MESSAGE_CONTENT.TIME) {
    return item;
  } else {
    return (
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
};

export default memo(ListItem, () => true);
