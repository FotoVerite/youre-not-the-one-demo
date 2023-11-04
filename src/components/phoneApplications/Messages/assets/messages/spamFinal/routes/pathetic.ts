import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  NotificationRouteType,
  ROUTE_STATUS_TYPE,
} from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM_FINAL_ROUTE_IDS } from "./routes";

const SELF = MESSAGE_CONTACT_NAME.SELF;
const SPAM = MESSAGE_CONTACT_NAME.SPAM4;

export const pathetic: NotificationRouteType = {
  id: SPAM_FINAL_ROUTE_IDS.PATHETIC,
  status: ROUTE_STATUS_TYPE.CONDITIONS_NOT_MET,
  exchanges: [
    {
      name: SPAM,
      messages: [
        "Because, you're pathetic.",
        "God, to think of all the potential you wasted living this `life of yours!` What a life.",
      ],
    },
    {
      name: SELF,
      messages: ["I'm not pathetic"],
    },
    {
      name: SPAM,
      messages: [
        "A empty job with no room for growth. Friends you hate, if they talk to you at all. A boyfriend you don't even know why you're with. Probably comfort, probably fear",
        "You don't self reflect very often",
        "You don't really think very often",
        "I mean your best friend is a scumbag",
      ],
    },
    {
      name: SELF,
      messages: ["How is Zara a scumbag"],
    },
    {
      name: SPAM,
      messages: [
        "Oh you think she's your friend",
        "She is good at playing one, when it suits her",
        { type: MESSAGE_CONTENT.IMAGE, content: "TODO" },
      ],
    },
    {
      name: SELF,
      messages: ["You are just making this up", "She never said these things"],
    },
    {
      name: SPAM,
      messages: [
        "You really are too trusting",
        "Pathetic, no wonder you go no where. No instinct, no grit",
        "Fucking faggot looser, too afraid to stake anything.",
        "Do anything",
        "be anything",
        "So you're nothing",
        "Nothing at all",
      ],
    },
    {
      name: SELF,
      messages: ["Fuck off"],
    },
    {
      name: SPAM,
      messages: [
        "I choose you... if you want to know;",
        "Because you are the worst version of yourself.",
        "You're not even interesting in your failures.",
        "Nobody will miss you. No one.",
      ],
    },
  ],
};
