import { SkPath, Skia } from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const BubblePath = (
  width: number,
  height: number,
  cr: number,
  tail: boolean
): SkPath => {
  const straightLineWidth = width - cr - cr;
  const path = Skia.Path.Make();
  path.moveTo(0, cr);
  path.rArcTo(cr, cr, 0, true, false, cr, -cr);

  path.lineTo(straightLineWidth, 0);

  path.rArcTo(cr, cr, 0, true, false, cr, cr);

  if (tail) {
    path.lineTo(straightLineWidth + cr, height - cr - 1);

    path.rArcTo(cr, cr, 0, true, true, cr, cr);

    path.rArcTo(cr, cr, 0, true, false, -cr, -2);
    path.rArcTo(cr, cr, 0, true, false, -cr + 5, 3);
  } else {
    path.lineTo(straightLineWidth + cr, height - cr);

    path.rArcTo(cr, cr, 0, true, false, -cr, cr);
    path.rArcTo(cr, cr, 0, true, false, -cr, 0);
    path.rArcTo(cr, cr, 0, true, false, -cr + 5, 3);
  }
  path.lineTo(cr, height);
  path.rArcTo(cr, cr, 0, true, false, -cr, -cr);

  path.close();
  return path;
};

const flipPath = (path: SkPath, width: number): SkPath => {
  const m = Skia.Matrix();
  m.scale(-1, 1);
  m.translate(-width, -0);
  path.transform(m);
  return path;
};

export const useBubbleClip = (
  width: number,
  height: number,
  cr: number,
  flipped: boolean,
  initialState: 0 | 1
) => {
  const isLastInExchange = useSharedValue(initialState);
  const clip = useMemo(() => {
    return flipped
      ? flipPath(BubblePath(width, height, cr, false), width)
      : BubblePath(width, height, cr, false);
  }, [flipped, width, height, cr]);

  const clipWithTail = useMemo(() => {
    return flipped
      ? flipPath(BubblePath(width, height, cr, true), width)
      : BubblePath(width, height, cr, true);
  }, [flipped, width, height, cr]);

  useEffect(() => {
    isLastInExchange.value = withSpring(initialState, { duration: 750 });
  }, [initialState]);

  const animatedPath = useDerivedValue(() => {
    const interpolateValue = clip.interpolate(
      clipWithTail,
      isLastInExchange.value
    );
    return interpolateValue || clip;
  }, [clip, clipWithTail, isLastInExchange]);
  return animatedPath;
};
