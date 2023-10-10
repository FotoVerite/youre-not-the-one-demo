import { ImageDigestionPropsType } from "@Components/phoneApplications/Messages/hooks/useConversation/digestion/types";
import {
  CONVERSATION_REDUCER_ACTIONS,
  ConversationReducerActionsType,
} from "@Components/phoneApplications/Messages/hooks/useConversation/reducer/type";
import { useSnapshotContext } from "@Components/snapShot/context";
import { SNAPSHOT_TYPES } from "@Components/snapShot/context/type";
import { SkImage } from "@shopify/react-native-skia";
import { useEffect, useRef } from "react";

export const useSnapshotResolver = (
  content: ImageDigestionPropsType,
  dispatch: (action: ConversationReducerActionsType) => void,
  ID: string,
  width: number
) => {
  const context = useSnapshotContext();
  const { image, setTakeSnapShot } = context;
  const skImage = useRef<SkImage | undefined>(content.image);
  useEffect(() => {
    if (!skImage.current && !image) {
      setTakeSnapShot({
        filename: content.filename,
        type: SNAPSHOT_TYPES.WITH_INDICATOR,
      });
    }
  }, [content.filename, image, setTakeSnapShot]);

  useEffect(() => {
    if (!skImage.current && !image) {
      setTakeSnapShot({
        filename: content.filename,
        type: SNAPSHOT_TYPES.WITH_INDICATOR,
      });
    }
  }, [content.filename, image, setTakeSnapShot]);

  useEffect(() => {
    if (!skImage.current && image?.uri) {
      skImage.current = image.uri;
    }
  }, [image]);

  // Indicator is Finished and we have an image
  useEffect(() => {
    if (!content.image && skImage.current && !image) {
      const aspectRation = skImage.current.height() / skImage.current.width();
      const imageHeight = width * aspectRation;
      dispatch({
        type: CONVERSATION_REDUCER_ACTIONS.UPDATE_MESSAGE,
        payload: {
          ID,
          props: {
            content: {
              ...content,
              ...{ image: skImage.current },
            },
            height: imageHeight,
          },
        },
      });
    }
  }, [image, dispatch, content, width, ID, context.image]);
};
