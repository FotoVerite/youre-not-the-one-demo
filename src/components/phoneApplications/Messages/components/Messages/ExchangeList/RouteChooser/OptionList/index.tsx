import { isDigestedChoosableRoute } from "@Components/phoneApplications/Messages/hooks/routes/guards";
import { AbstractDigestedRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";
import React, {
  FC,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { theme } from "src/theme";

import Option from "./Option";

const OptionList: FC<
  {
    activeRoute: AbstractDigestedRouteType | undefined;
    cb: (value: string) => void;
    isDisplayed: boolean;
    setDisplayed: (active: boolean) => void;
  } & PropsWithChildren
> = ({ activeRoute, cb, isDisplayed, setDisplayed, children }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [cachedId, setCachedId] = useState<string>();

  const showOptions = useSharedValue(0);
  const [optionsHeight, setOptionsHeight] = useState(
    [] as SharedValue<number>[]
  );
  const { width } = useWindowDimensions();

  const menuHeight = useDerivedValue(() => {
    return optionsHeight.reduce((acc, h) => {
      acc += h.value;
      return acc;
    }, 0);
  }, [optionsHeight]);

  useEffect(() => {
    if (isDisplayed) {
      showOptions.value = withDelay(50, withTiming(1, { duration: 300 }));
    } else {
      showOptions.value = withDelay(50, withTiming(0, { duration: 300 }));
    }
  }, [isDisplayed, showOptions]);

  const animateOptionsUp = useAnimatedStyle(() => {
    return {
      height: interpolate(showOptions.value, [0, 1], [0, menuHeight.value]),
    };
  }, [showOptions, menuHeight]);

  const createOptions = useCallback(() => {
    if (isDigestedChoosableRoute(activeRoute)) {
      const nodes = activeRoute.options.map((option) => (
        <Option
          key={`${activeRoute.routes.id}-${option.value}`}
          id={activeRoute.id}
          option={option}
          setHeight={setOptionsHeight}
          cb={cb}
          selected={selected}
          setSelected={setSelected}
        />
      ));
      return nodes;
    }
  }, [activeRoute, cb, selected]);

  useEffect(() => {
    if (activeRoute == null) {
      setCachedId(undefined);
      return;
    }
    const ID = `${activeRoute.id}-${activeRoute.name}`;
    if (cachedId === ID) {
      return;
    }
    if (optionsHeight.length > 0) {
      setOptionsHeight([]);
      return;
    }
    setCachedId(ID);
  }, [activeRoute, cachedId, optionsHeight.length]);

  const Options = useMemo(() => {
    if (activeRoute == null) {
    }
    if (isDigestedChoosableRoute(activeRoute) && cachedId != null) {
      return createOptions();
    }
    return [];
  }, [activeRoute, cachedId, createOptions]);

  return (
    <Animated.View style={[styles.screen, animateOptionsUp]}>
      <View
        style={[
          styles.optionList,
          {
            width,
          },
        ]}
      >
        {Options}
      </View>
    </Animated.View>
  );
};

export default OptionList;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.muted,
    overflow: "hidden",
    zIndex: 3,
  },
  itemSeparator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: "gray",
  },
  optionList: {
    position: "absolute",
  },
});
