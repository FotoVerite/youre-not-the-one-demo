// Description: OP and his brother discuss a reddit creepypaste/rumor.
// Point: Give context for the setting of the game and set tone of the horror. Also so how fractured his family is

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { ChoosableRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ExchangeBlockType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { LENNY_ROUTE_IDS } from "./routes";

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
    messages: ["For this meeting of the midnight society I present"],
  },
  {
    name: SELF,
    messages: ["OMG, no, I'm out", "I'm leaving you on read"],
  },
  {
    name: LENNY,
    messages: [
      "My dude please",
      "Fuck... you never let up",
      "And always try to control the situation, even when we were kids you tried to micromanage our vacations",
    ],
  },
  {
    name: SELF,
    messages: ["Sorry"],
  },
  {
    name: LENNY,
    messages: ["Do you know about the hikikomoris in Japan"],
  },
  {
    name: SELF,
    messages: [
      "You mean agoraphobic people",
      "It's not like Japan is the only country dealing with shutin.",
    ],
  },
  {
    name: LENNY,
    messages: ["OMG stop! Stop being a lawyer for five seconds"],
  },
  {
    name: SELF,
    messages: ["Fine, yes, I know about the hikikomoris"],
  },
  {
    name: LENNY,
    messages: [
      "The problem has been getting worse the past decade. But since lockdown things have changed",
      "Before they'd play game mmos,lurk message boards or chat online to get human connection",
      "But now a lot of them don't even want to go online",
      "Their communities have seen a sharp drop-off of engagement",
      "The few post that have appeared talk about a new feeling of dread and exhaustion",
      "That their obsessions have run they're course and there's nothing left to do or to say.",
      "They look at a screen and they just see an sea of black",
    ],
  },
  {
    name: SELF,
    messages: ["So they're acrophobic and complex depression now"],
  },
  {
    name: LENNY,
    messages: [
      "No this is literal, not figural. Literal sea of black.",
      "Every bit of technology from computers to digital clocks",
      "To them nothing seems to be on",
      "Even to the few ones that can venture out the curse doesn't seem to lift.",
      "They can't even view how much they owe at a convince store, or take out money from an ATM",
      "Their lives even more then before seem to have stagnated and nobody can figure out the cause",
      "Mostly when people ask them what they think is happening they just say they feel like they're in limbo",
    ],
  },
  {
    name: SELF,
    messages: ["Ahuh, fascinating", "And how did they post then on reddit?"],
  },
  {
    name: LENNY,
    messages: ["Normally it's a parent"],
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
    messages: ["Why is it that you can never just enjoy a story"],
  },
  {
    name: SELF,
    messages: [
      "Because it's nonsensical",
      "Because it's so concerned with it's messaging that it has no life to it. ",
      "Because it's trite",
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
        [LENNY_ROUTE_IDS.WANT_TO_HEAR_SOMETHING_SCARY]: { finished: true },
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
