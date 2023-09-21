import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";

import { EmojiBubble } from "./EmojiBubble";
import { ReadLabel } from "./ReadLabel";
import { SkImageBubble } from "./SkBubbles/SkImageBubble";
import { SkNumberBubble } from "./SkBubbles/SkNumberBubble";
import { SkSnapshotBubble } from "./SkBubbles/SkSnapshotBubble";
import { SkStringBubble } from "./SkBubbles/SkStringBubble";
import { SkVcardBubble } from "./SkBubbles/SkVcardBubble";
import { TimeStamp } from "./Timestamp";
import { ConversationShowListItem } from "./types";

const useBubbleResolver = (props: ConversationShowListItem) => {
  switch (props.type) {
    case MESSAGE_CONTENT.TIME:
      return <TimeStamp content={props.content} height={props.height} />;
    case MESSAGE_CONTENT.READ_LABEL:
      return <ReadLabel content={props.content} height={props.height} />;
    case MESSAGE_CONTENT.EMOJI: {
      const { scrollHandler, scrollRef, ...propsWithoutScroll } = props;
      return <EmojiBubble {...propsWithoutScroll} />;
    }
    case MESSAGE_CONTENT.IMAGE: {
      const { scrollHandler, scrollRef, ...propsWithoutScroll } = props;
      return <SkImageBubble {...propsWithoutScroll} />;
    }
    case MESSAGE_CONTENT.GLYPH:
      return <></>;
    case MESSAGE_CONTENT.NUMBER:
      return <SkNumberBubble {...props} />;
    case MESSAGE_CONTENT.SNAPSHOT: {
      const { scrollHandler, scrollRef, ...propsWithoutScroll } = props;
      return <SkSnapshotBubble {...propsWithoutScroll} />;
    }
    case MESSAGE_CONTENT.STRING:
      return <SkStringBubble {...props} key={`bubble-${props.ID}`} />;
    case MESSAGE_CONTENT.VCARD:
      return <SkVcardBubble {...props} />;
    default:
      return <></>;
  }
};

export default useBubbleResolver;
