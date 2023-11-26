// Description: OP and his brother discuss a reddit creepypaste/rumor.
// Point: Give context for the setting of the game and set tone of the horror. Also so how fractured his family is

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import {
  MESSAGE_CONTENT,
  NEXT_MESSAGE_EFFECT_TYPE,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ChoosableRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ExchangeBlockType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { LENNY_ROUTE_IDS } from "./routes";
import lenny1 from "../assets/lenny1.mov";
import lenny2 from "../assets/lenny2.mov";

const LENNY = MESSAGE_CONTACT_NAME.LENNY;
const SELF = MESSAGE_CONTACT_NAME.SELF;

enum OPTIONS {
  A = "Bro, please not today",
  B = "Okay, I'll bite",
  C = "Can you just link the fucking post",
}

const exchanges: ExchangeBlockType[] = [
  {
    name: LENNY,
    messages: [
      {
        type: MESSAGE_CONTENT.VIDEO,
        content: {
          video: lenny1,
          subtitles: ["For this meeting of the midnight society I present"],
        },
      },
    ],
  },
  {
    name: SELF,
    messages: [
      "OMG, no, I'm out",
      "I'm leaving you on read",
      "Not this fucking animoji bullshit again",
    ],
  },
  {
    name: LENNY,
    messages: [
      {
        type: MESSAGE_CONTENT.VIDEO,
        content: {
          video: lenny2,
          subtitles: [
            "My dude",
            "please",
            "I'm practicing for my next speaking engagement.",
            "Fuck... you never let up",
            "Always try to micromanage everything.",
          ],
        },
      },
    ],
  },
  {
    name: SELF,
    messages: [
      "Sorry",
      "But it's sooo creepy.",
      "Does this really help you work on performance?",
    ],
  },
  {
    name: LENNY,
    messages: ["Sigh... Yes", "Do you know about the hikikomori in Japan"],
  },
  {
    name: SELF,
    messages: [
      "You mean agoraphobic people",
      "It's not like Japan is the only country dealing with shutins.",
    ],
  },
  {
    name: LENNY,
    messages: ["OMG stop! Stop being a lawyer for five seconds"],
  },
  {
    name: SELF,
    messages: ["Fine, yes, I know about hikikomori"],
  },
  {
    name: LENNY,
    messages: [
      "It's been an issue for a very long time; but since lockdown things have changed",
      "Before they'd play game mmos,lurk message boards, or chat online to get human connection",
      "Now a lot of them just chat with AI, or have AI chat for them and read the results on message boards",
    ],
  },
  {
    name: LENNY,
    messages: [
      "There are reddits and discords of AI just chatting between themselves",
      "No human interaction, occasional tweaks of the code",
      "If they manually type something, it's to the effect of, I'm tired of trying to figure out what people want from me.",
      "They look at a screen and they just see people yelling at them, calling them stupid, or on the wrong side of history",
    ],
  },
  {
    name: SELF,
    messages: ["So they're agoraphobic and cowards got it"],
  },
  {
    name: LENNY,
    messages: ["You're such a fucking asshole."],
  },
  {
    name: LENNY,
    messages: [
      "Imagine feeling so alienated that you'd rather have a stand in for yourself then have any agency.",
      "Rather watch something pretend to be your opinions instead of having them yourself",
      "Sometimes I wonder if you are autistic.",
      "you act like you have zero empathy",
    ],
  },
  {
    name: SELF,
    messages: [
      {
        type: MESSAGE_CONTENT.STRING,
        content: "Now who's being an asshole and a... sanist",
        nextMessageEffect: {
          type: NEXT_MESSAGE_EFFECT_TYPE.RETYPE,
          data: [
            "Now who's being an asshole",
            "Now who's being an asshole and committing sanism",
            "Now who's being an asshole and committing mentalism",
          ],
        },
      },
    ],
  },
  {
    name: LENNY,
    messages: ["WTF is a sanist"],
  },
  {
    name: LENNY,
    messages: [
      "Just try to imagine being so estranged from social interaction.",
      "But it's getting weirder",
      "Some of these AI are getting so sophisticated that they're taking tests for them, or doing their shopping without prompting.",
      "Some are even claiming they've had them taken over for most of the interactions they'd have with their parents.",
      "A few parents even claim that their kids died and they had no idea till weeks later when their bodies were found.",
      "Their AI was cheerfully keeping them updated about how everything was getting better.",
    ],
  },
  { name: SELF, messages: ["Okay, so what's the end goal"] },
  {
    name: LENNY,
    messages: [
      "The few that are actually thinking about it are saying replacement.",
      "They want to outsource their life.",
      "Just be by themselves and have the AI do as much as possible so they don't need to think about it.",
      "It just sounds so utterly lonely",
    ],
  },
  {
    name: SELF,
    messages: [
      "Creepy story.",
      "Really gets you to think about what a prison technology has become for us",
      "Maybe all become a luddite now, or a team up with a nice amish girl.",
      "I mean they hate everything about me but this really shows how I need to get back to the land",
      "Be a prepper and self reliant",
      "Hunt some motherfuckin game, grow my own crops, use solar power!",
      "Compost my own shit",
    ],
  },
  {
    name: LENNY,
    messages: ["Why is it that you meet everything with irony?"],
  },
  {
    name: SELF,
    messages: [
      "Because I'm a millennial?",
      "It's probably just ragebait/doombait. Or being done by like one insane person.",
      "AI isn't even that good yet. Those forums would be a mess of boring exchanges that go no where.",
    ],
  },
  {
    name: LENNY,
    messages: ["What if it's actually happening?"],
  },
  {
    name: SELF,
    messages: ["And? It's not happening to me?"],
  },
];

export const lenny_midnight_society: ChoosableRouteType = {
  id: LENNY_ROUTE_IDS.MIDNIGHT_SOCIETY,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.WANT_TO_HEAR_SOMETHING_SCARY]: {
          status: ROUTE_STATUS_TYPE.FINISHED,
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: LENNY,
        messages: ["What you mean by that?"],
      },
      {
        name: SELF,
        messages: [
          "That I'm not in the mood for some lame ass reddit copypasta faked karama farm",
          "You're just going to cite me a twist on lake city quiet pills or something",
        ],
      },
      {
        name: LENNY,
        messages: [
          "A. Lake City Quiet Pills is real.",
          "B. This is much freakier ",
        ],
      },
      {
        name: SELF,
        messages: [
          "Next you'll tell me you my sleep paralysis is really demon trying to steal my soul",
        ],
      },
      {
        name: LENNY,
        messages: ["Are you having episodes again?"],
      },
      {
        name: SELF,
        messages: [
          "Just recently, bout the same as it was when we were kids",
          "Just blackness and red eyes.",
          "So not much interest in fake creepypasta",
          "I don't get why you get so engrossed in the poorly written shit",
        ],
      },
      {
        name: LENNY,
        messages: [
          "I promise you it's more interesting then most of the shit I've stuffed down your throat",
        ],
      },
      {
        name: SELF,
        messages: [
          "Audible Sigh",
          "Fine",
          "If I'm bored you're going to be the one to listen to mom's inane conspiracy theories this thanksgiving",
        ],
      },
      {
        name: LENNY,
        messages: ["Okay let me set the scene"],
      },
    ].concat(exchanges),
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
      {
        name: LENNY,
        messages: ["Okay let me set the scene"],
      },
    ].concat(exchanges),
    [OPTIONS.C]: [
      {
        name: SELF,
        messages: [OPTIONS.C],
      },
      {
        name: LENNY,
        messages: [
          "No I will not, that takes away all the magic",
          "You'll just read the 1000s of comments trying to debunk it and not even glance at the main post.",
          "Besides I need to work on my storytelling technique anyway",
          "Let me set the scene",
        ],
      },
    ].concat(exchanges),
  },
};
