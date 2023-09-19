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
  tail: boolean,
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

export const useBubbleCloudClip = (
  width: number,
  height: number,
  cr: number,
) => {
  const clip = useMemo(() => {
    const path = flipPath(BubblePath(width, height, cr, false), width);
    path.addCircle(13, 26, 7);
    path.addCircle(13, 26, 7);
    path.addCircle(4, 33, 3);
    return path;
  }, [width, height, cr]);

  return clip;
};
