import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";
import { ExchangeBlockType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

import { MICHAEL_IDS } from "./routes";

export enum MICHAEL_ABOUT_TONIGHT_REPLY_OPTIONS {
  A = "Yaaasss",
  B = "Blerg",
}

const OPTIONS = MICHAEL_ABOUT_TONIGHT_REPLY_OPTIONS;
const MICHAEL = MESSAGE_CONTACT_NAME.MICHAEL;
const SELF = MESSAGE_CONTACT_NAME.SELF;

const exchanges: ExchangeBlockType[] = [
  {
    name: MICHAEL,
    messages: [
      "You set up your new phone yet?",
      "Want to try out that Camera.",
    ],
  },
  {
    name: SELF,
    messages: ["Someone’s very hot to trot"],
  },
  {
    name: MICHAEL,
    messages: [
      "Hot to trot. Who uses that?",
      "Yes, sir you’re the bee's knees and just the ginchiest",
    ],
  },
  {
    name: SELF,
    messages: ["I believe you, if I could send history."],
  },
  {
    name: MICHAEL,
    messages: [
      "Only when I’m drunk and quoting my father…",
      "Wait why can’t you send history",
    ],
  },
  {
    name: SELF,
    messages: [
      "Contacts are borked. This reads as Maybe Michael",
      {
        type: MESSAGE_CONTENT.SNAPSHOT,
        content: {
          filename: "MICHAEL_SNAPSHOT",
          backup: "ADD",
        },
      },
    ],
  },
  {
    name: MICHAEL,
    messages: [
      "UGh, that's my default profile portrait?",
      "Well that sucks, any ideas if/when it can be fixed.",
    ],
  },
  {
    name: SELF,
    messages: ["Hopefully a few hours."],
  },
  {
    name: MICHAEL,
    messages: [
      "Well since you’re cut-off from the world might as make yourself useful.",
      "Now take off your shirt and send me something to get me revved up for later",
    ],
  },
  {
    name: SELF,
    messages: ["In a bit.", "Kinda need to psych myself up"],
  },
  {
    name: MICHAEL,
    messages: ["You look great. The new routine is really working for you."],
  },
  {
    name: SELF,
    messages: ["Suuure"],
  },
];

export const michael_about_tonight_reply: MessageRouteType = {
  id: MICHAEL_IDS.ABOUT_TONIGHT_REPLY,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [{ type: MESSAGE_CONTENT.EMOJI, content: "😈" }],
      },
    ].concat(exchanges),
    [OPTIONS.B]: [
      {
        name: SELF,
        messages: [OPTIONS.B],
      },
      {
        name: MICHAEL,
        messages: ["Whats wrong?"],
      },
      {
        name: SELF,
        messages: ["It's been a day"],
      },
      {
        name: MICHAEL,
        messages: ["Is it bad?"],
      },
      {
        name: SELF,
        messages: ["No, just draining."],
      },
    ].concat(exchanges),
  },
};
