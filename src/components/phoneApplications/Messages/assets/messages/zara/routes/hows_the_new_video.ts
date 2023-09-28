// Description: OP and ZARA discuss her latest video.
// Point: Explains what Zara does fora  living and give more context for their dynamic.

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";

export enum ZARA_YOUR_NEW_VIDEO_OPTIONS {
  A = "How's the grind going?",
  B = "Do you still want me to work on your outro?",
  C = "I watched your new video",
}

const OPTIONS = ZARA_YOUR_NEW_VIDEO_OPTIONS;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

const exchanges = [
  {
    name: ZARA,
    messages: [
      { type: MESSAGE_CONTENT.EMOJI, content: "😩" },
      "No clue honestly",
    ],
  },
  {
    name: SELF,
    messages: [
      "You'll think of something soon to rev yourself up!",
      { type: MESSAGE_CONTENT.EMOJI, content: "💪" },
    ],
  },
  {
    name: ZARA,
    messages: [
      "To think six months ago I was so happy to get my gold play button and now....",
    ],
  },
  {
    name: SELF,
    messages: [
      "Hey we're supposed to be mourning the potential loss of my social life here",
    ],
  },
  {
    name: ZARA,
    messages: [":/"],
  },
];

export const your_new_video: MessageRouteType = {
  id: ZARA_ROUTE_IDS.YOUR_NEW_VIDEO,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.ZARA]: {
      routes: { [ZARA_ROUTE_IDS.YOUR_DAY_WORSE_THEN_MINE]: { finished: true } },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: ZARA,
        messages: [
          "Miserable, views are down, conversions are down, I have no new ideas and I'm just regurgitating content",
          "I just feel burnt-out",
        ],
      },
      {
        name: SELF,
        messages: ["Maybe it's time to take a break"],
      },
      {
        name: ZARA,
        messages: ["And loose even more ground?"],
      },
      {
        name: SELF,
        messages: ["So what your plan then?"],
      },
    ].concat(exchanges),
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
      {
        name: ZARA,
        messages: [
          "Probably, but I don't got time at the moment to direct you on what I want",
        ],
      },
      {
        name: SELF,
        messages: ["Why, the new video is taking that much time?"],
      },
      {
        name: ZARA,
        messages: [
          "No, I'm just running low on inspiration and ideas. I don't want to do yet another best korean sunscreen video",
          "Or do another clay mask",
          "never again!",
          "The last one broke me out something fierce",
          "I STILL SEE THE FUCKING OUTLINE OF WHERE I APPLIED IT",
        ],
      },
      {
        name: SELF,
        messages: ["So what are you doing for your next video"],
      },
    ].concat(exchanges),
    [OPTIONS.C]: [
      {
        name: SELF,
        messages: [OPTIONS.C],
      },
      {
        name: ZARA,
        messages: ["Gah, what a disaster, My face still hurts."],
      },
      {
        name: SELF,
        messages: ["It looked painful"],
      },
      {
        name: ZARA,
        messages: [
          "Never doing a spon again without trying the actual product first.",
          "It's great they allowed me to post my allergic reaction video but I don't want to be in that position again",
        ],
      },
      {
        name: SELF,
        messages: ["How did you get away with that"],
      },
      {
        name: ZARA,
        messages: [
          "Because their contract forced them to pay, and at least I was able to have a good dialog about products/allergies and how none will be right for everybody.",
          "It's like I said, they chemical that probably broke me out isn't a bad chemical just bad for me",
        ],
      },
      {
        name: SELF,
        messages: ["Are they going to work with you again?"],
      },
      {
        name: ZARA,
        messages: ["I hope so.", "Still trying to figure out what's next"],
      },
      {
        name: SELF,
        messages: ["What is next?"],
      },
    ].concat(exchanges),
  },
};
