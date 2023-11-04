import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ChoosableRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM_FINAL_ROUTE_IDS } from "./routes";

const SELF = MESSAGE_CONTACT_NAME.SELF;
const SPAM = MESSAGE_CONTACT_NAME.SPAM4;

enum OPTIONS {
  A = "Why are you doing this to me?",
  B = "Why are you doing this to me? ",
  C = "Why are you doing this to me?  ",
  D = "Why are you doing this to me?   ",
}

export const pathetic: ChoosableRouteType = {
  id: SPAM_FINAL_ROUTE_IDS.WHY_ARE_YOU_DOING_THIS,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: SPAM,
        messages: [
          "To you? You think this your so important that I specifically choose you?",
          "Maybe I just created a random function to choose someone off facebook, twitter, or tinder.",
          "Hell maybe I just swiped right and thought you looked like rube worthy of being fucked with",
        ],
      },
      {
        name: SELF,
        messages: ["I'm asking why you are doing this"],
      },
      {
        name: SPAM,
        messages: [
          "And you're choosing to engage",
          "But of course you are, you never could leave anything alone. You'd work a blemish till it popped no matter the amount of pain and blood that wells up.",
        ],
      },
      {
        name: SELF,
        messages: ["You obviously know me, who are you Chris? Alan? Mike?"],
      },
      {
        name: SPAM,
        messages: [
          "Why do people always ask that like we would ever give away the game?",
          "Seriously, you are genre savvy",
          "Listen to me.",
          "WALK THE FUCK AWAY",
        ],
      },
      {
        name: SELF,
        messages: [
          "Then you'll just fuck with my bank account or my social media, Till I need to go back online.",
          "And I need to use the internet for work.",
        ],
      },
      {
        name: SPAM,
        messages: ["True", "Guess you're stuck", "Too bad for you"],
      },
    ],
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
      {
        name: SPAM,
        messages: [
          "To you? Because you are so fucking important",
          "Maybe this is just random",
        ],
      },
      {
        name: SELF,
        messages: ["You're still deciding to do this"],
      },
      {
        name: SPAM,
        messages: ["And you're still here", "But then you never leave"],
      },
      {
        name: SELF,
        messages: ["You obviously know me, who are you Chris? Alan? Mike?"],
      },
      {
        name: SPAM,
        messages: [
          "Always asking the same questions",
          "What is it that King said",
          "Nightmares exist outside of logic, and there’s little fun to be had in explanations; they’re antithetical to the poetry of fear",
        ],
      },
      {
        name: SELF,
        messages: ["Are you quoting me Stephen King via Allen Wake?"],
      },
      {
        name: SPAM,
        messages: [
          "No, I'm quoting King Via EW.",
          "But I can give you the same answer he did",
          "Because you're there",
        ],
      },
    ],
    [OPTIONS.C]: [
      {
        name: SELF,
        messages: [OPTIONS.C],
      },
      {
        name: SPAM,
        messages: [
          "Randomness, a flip of a coin",
          "Boredom",
          "Because I wanted to",
          "That's it.",
        ],
      },
      {
        name: SELF,
        messages: ["So, stop"],
      },
      {
        name: SPAM,
        messages: [
          "But then I stop having fun, I don't get what I want. And I'm going to get what I want",
        ],
      },
      {
        name: SELF,
        messages: ["You obviously know me, who are you Chris? Alan? Mike?"],
      },
      {
        name: SPAM,
        messages: [
          "Always asking the same questions",
          "Always stuck in your little ruts",
          "You've never taken a single risk in your life",
        ],
      },
      {
        name: SELF,
        messages: ["Why do you hate me so"],
      },
      {
        name: SPAM,
        messages: ["I don't hate you, I just need to do this"],
      },
    ],
    [OPTIONS.D]: [
      {
        name: SELF,
        messages: [OPTIONS.D],
      },
      {
        name: SPAM,
        messages: [
          "What are you actually hoping the answer is?",
          "Would me telling you I'm saving myself make you feel better?",
          "Allow you to deal with the discomfort?",
          "Saving you?",
          "You're not self sacrificing enough anyway",
        ],
      },
      {
        name: SELF,
        messages: ["So, stop"],
      },
      {
        name: SPAM,
        messages: ["I need to do this"],
      },
      {
        name: SELF,
        messages: ["You obviously know me, who are you Chris? Alan? Mike?"],
      },
      {
        name: SPAM,
        messages: ["You're just proving my point"],
      },
      {
        name: SELF,
        messages: ["Why do you hate me so"],
      },
      {
        name: SPAM,
        messages: ["I don't hate you, I just need to do this"],
      },
    ],
  },
};
