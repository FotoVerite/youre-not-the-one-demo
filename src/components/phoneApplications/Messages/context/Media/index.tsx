import SlideInTransitionContainer from "@Components/SlideInTransitionContainer";
import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { theme } from "src/theme";
import { Row } from "src/utility/layout";
import { LOG, LOG_COLORS } from "src/utility/logger";

import { MediaContextDigestedType, MediaContextDigestType } from "./types";

//defaults for empty app
const MediaContext = React.createContext<MediaContextDigestedType | undefined>(
  undefined
);

const MediaContextProvider: FC<MediaContextDigestType> = (props) => {
  const [media, _setMedia] = useState<ReactElement | undefined>();

  const setMedia = useCallback(
    (_media: ReactElement | undefined) => {
      if (_media !== media || media == null) {
        _setMedia(_media);
      }
    },
    [_setMedia]
  );
  return (
    <MediaContext.Provider value={{ setMedia }}>
      {props.children}

      <SlideInTransitionContainer
        toObserve={media}
        slideInfFrom="bottom"
        viewOverrides={{ zIndex: 10 }}
      >
        {media && (
          <>
            <Row style={styles.row}>
              <View style={styles.doneContainer}>
                <TouchableWithoutFeedback onPress={() => setMedia(undefined)}>
                  <Text suppressHighlighting>Done</Text>
                </TouchableWithoutFeedback>
              </View>
            </Row>
            <View style={styles.imageContainer}>{media}</View>
          </>
        )}
      </SlideInTransitionContainer>
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
export const MediaContextConsumer = MediaContext.Consumer;

export const useMediaContext = () => {
  const ERROR_MESSAGE = "Media Context called outside of provider";
  const context = useContext(MediaContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};

export const MediaImageElement: FC<{
  source: ImageSourcePropType;
  aspectRatio: number;
}> = ({ source, aspectRatio }) => {
  return (
    <Image
      source={source}
      style={[
        styles.image,
        {
          aspectRatio,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  doneContainer: { marginStart: "auto" },
  imageContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  row: {
    flexGrow: 0,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    paddingVertical: theme.spacing.p1,
    paddingHorizontal: theme.spacing.p1,
  },
  image: {
    margin: theme.spacing.p2,
    height: undefined,
    width: "80%",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  screen: {
    zIndex: 4,
    position: "absolute",
    backgroundColor: "#f1f1f1",
    width: "100%",
  },
});
