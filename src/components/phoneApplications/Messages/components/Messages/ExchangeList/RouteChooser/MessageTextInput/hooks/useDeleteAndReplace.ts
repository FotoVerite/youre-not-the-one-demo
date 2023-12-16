import { useCallback, useEffect, useRef, useState } from "react";
import { delayFor } from "src/utility/async";
import { useSound } from "src/utility/useSound";

import typing from "./assets/typing.mp3";

enum STATE {
  WAITING,
  RUNNING,
  CALLBACK,
  DONE,
}

type TransitionStateType = {
  chars: string[];
  type: "ADD" | "REMOVE";
  duration: number;
};
const calculateOutputStates = (
  endResult: string,
  transitions: string[] | string,
  durations?: number[]
) => {
  const transitionStates: TransitionStateType[] = [];
  transitions = [transitions].flat();
  transitions.unshift();
  transitions.push(endResult);
  let transitionStart = transitions.shift()!.split("");
  let transitionEnd: string[];
  let nextString: string[];
  while (transitions.length > 0) {
    nextString = [];
    transitionEnd = transitions.shift()!.split("");
    while (
      transitionStart[0] != null &&
      transitionEnd[0] === transitionStart[0]
    ) {
      transitionEnd.shift();
      const char = transitionStart.shift()!;
      nextString = nextString.concat(char);
    }
    transitionStates.push({
      chars: transitionStart,
      type: "REMOVE",
      duration: 50,
    });
    transitionStates.push({
      chars: transitionEnd,
      type: "ADD",
      duration: 50,
    });
    nextString = nextString.concat(transitionEnd);
    transitionStart = nextString;
  }

  return transitionStates;
};

export const useDeleteAndReplace = (
  endResult: string,
  set: React.Dispatch<React.SetStateAction<string | undefined>>,
  replacements: string | string[],
  cb?: () => void,
  baseDelay: number = 200
) => {
  const [state, setState] = useState(STATE.WAITING);

  const [transitions, setTransitions] = useState([] as TransitionStateType[]);

  const [currentTransition, setCurrentTransition] =
    useState<TransitionStateType>();

  const typingSound = useSound(typing, { positionToStop: 1150 });

  const deleteSound = useSound(typing, { positionToStop: 3150 });

  const runCurrentTransition = useCallback(
    async (transition: TransitionStateType | undefined) => {
      if (!transition || transition.chars.length === 0) {
        return;
      }
      const delay = Math.floor(Math.random() * baseDelay) + 25;
      if (transition.type === "ADD") {
        const char = transition.chars.shift();
        await delayFor(delay);
        typingSound?.playFromPositionAsync(1000);
        set((s) => {
          if (s) return s + char;
          else return char;
        });
      }
      if (transition.type === "REMOVE") {
        transition.chars.shift();
        await delayFor(delay);
        deleteSound?.playFromPositionAsync(3000);
        set((s) => {
          if (s) return s.slice(0, -1);
        });
      }
      setCurrentTransition({ ...transition });
    },
    [baseDelay, deleteSound, set, typingSound]
  );

  useEffect(() => {
    if (!replacements || replacements.length === 0) {
      return;
    }
    const calculations = calculateOutputStates(endResult, replacements);
    const first = calculations.shift();
    setCurrentTransition(first);
    setTransitions(calculations);
  }, [endResult, replacements]);

  useEffect(() => {
    if (state !== STATE.WAITING && state !== STATE.RUNNING) return;
    if (
      state === STATE.RUNNING &&
      currentTransition &&
      currentTransition.chars.length === 0
    ) {
      const next = transitions.shift();
      setCurrentTransition(next);
      setTransitions([...transitions]);
    }
  }, [currentTransition, state, transitions]);

  useEffect(() => {
    switch (state) {
      case STATE.RUNNING:
        if (transitions.length > 0 || currentTransition != null) {
          runCurrentTransition(currentTransition);
        } else {
          setState(STATE.CALLBACK);
        }
        break;
    }
  }, [state, runCurrentTransition, currentTransition, transitions]);

  useEffect(() => {
    const callCallback = async () => {
      await delayFor(1000);
      if (cb) {
        cb();
      }
      setState(STATE.DONE);
    };
    switch (state) {
      case STATE.CALLBACK:
        callCallback();
        break;
    }
  }, [state, cb]);

  return () => setState(STATE.RUNNING);
};
