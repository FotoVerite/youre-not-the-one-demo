import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MessageRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { ZARA_ROUTE_IDS } from "./routes";
import { LENNY_ROUTE_IDS } from "../../lenny/routes/routes";

export enum ZARA_MY_BRO_IS_BEING_SO_ANNOYING {
  A = "My Bro is being so annoying",
}

const OPTIONS = ZARA_MY_BRO_IS_BEING_SO_ANNOYING;
const ZARA = MESSAGE_CONTACT_NAME.ZARA;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const my_bro_is_being_annoying: MessageRouteType = {
  id: ZARA_ROUTE_IDS.MY_BRO_IS_BEING_SO_ANNOYING,
  options: Object.values(OPTIONS),
  conditions: {
    [MESSAGE_CONTACT_NAME.LENNY]: {
      routes: {
        [LENNY_ROUTE_IDS.MIDNIGHT_SOCIETY]: {
          finished: true,
        },
      },
    },
  },
  routes: {
    [OPTIONS.A]: [
      { name: SELF, messages: [OPTIONS.A] },
      {
        name: ZARA,
        messages: ["Which one?"],
      },
      {
        name: SELF,
        messages: [
          "The one who's terminally online. All day every day going on about twitter or reddit or playing LoL",
          "He loves sending inane karma farming posts",
          "Like my mom sending email chain letters or fox news articles.",
          "Like clockwork",
        ],
      },
      {
        name: ZARA,
        messages: [
          "I think terminally online is calling League of Legends, LoL?!",
          "Who does that?",
          "Also you meant the one who's married with the cute 3 year old?",
        ],
      },
      {
        name: SELF,
        messages: ["Ya"],
      },
    ],
  },
};
