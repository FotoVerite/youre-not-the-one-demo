import React, { FC, useContext, useEffect, useRef } from "react";
import { LOG, LOG_COLORS } from "src/utility/logger";

import { useFonts } from "./hooks/useFonts";
import { FontsContextDigestedType, FontsContextDigestType } from "./types";

//defaults for empty app
const FontsContext = React.createContext<FontsContextDigestedType | undefined>(
  undefined,
);

const FontsContextProvider: FC<FontsContextDigestType> = (props) => {
  const fonts = useFonts();
  const resolver = props.resolver;
  const resolved = useRef(false);

  useEffect(() => {
    if (fonts != null && !resolved.current) {
      resolver("fonts", true);
      resolved.current = true;
    }
  }, [fonts, resolver]);

  if (fonts) {
    return (
      <FontsContext.Provider
        value={{
          fonts,
        }}
      >
        {props.children}
      </FontsContext.Provider>
    );
  }
  return <></>;
};

export default FontsContextProvider;
export const FontsContextConsumer = FontsContext.Consumer;

export const useFontsContext = () => {
  const ERROR_MESSAGE = "Fonts Context called outside of provider";
  const context = useContext(FontsContext);
  if (context == null) {
    LOG(LOG_COLORS.FgRed, ERROR_MESSAGE);
    throw new Error(ERROR_MESSAGE);
  } else {
    return context;
  }
};
