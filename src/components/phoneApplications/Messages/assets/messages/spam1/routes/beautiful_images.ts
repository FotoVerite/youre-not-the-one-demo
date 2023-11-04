import {
  MESSAGE_CONTACT_NAME,
  SNAPSHOT_NAMES,
} from "@Components/phoneApplications/Messages/constants";
import {
  EFFECT_TYPE,
  MESSAGE_CONTENT,
} from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { ChoosableRouteType } from "@Components/phoneApplications/Messages/hooks/routes/types";

import { SPAM1_IDS } from "./routes";
import doll1 from "../../../images/broken_dolls1.jpeg";
import doll2 from "../../../images/broken_dolls2.jpeg";

export enum SPAM1_SECOND_EXCHANGE_OPTIONS {
  A = "What the fuck are you on?",
}

const OPTIONS = SPAM1_SECOND_EXCHANGE_OPTIONS;
const SPAM1 = MESSAGE_CONTACT_NAME.SPAM1;
const SELF = MESSAGE_CONTACT_NAME.SELF;

export const beautiful_images: ChoosableRouteType = {
  id: SPAM1_IDS.BEAUTIFUL_IMAGES,
  options: Object.values(OPTIONS),
  routes: {
    [OPTIONS.A]: [
      {
        name: SELF,
        messages: [OPTIONS.A],
      },
      {
        name: SPAM1,
        messages: [
          { type: MESSAGE_CONTENT.IMAGE, content: doll1 },
          "I think you can go further with them",
          "They aren't unheimlich enough",
          "You gotta push",
        ],
      },
      {
        name: SPAM1,
        messages: ["This isn't funny"],
      },
      {
        name: SELF,
        messages: [
          "I'm not trying to be funny",
          "I'm trying to be off-putting",
          { type: MESSAGE_CONTENT.IMAGE, content: doll2 },
          {
            type: MESSAGE_CONTENT.STRING,
            content: "How am I doing?",
            typingDelay: 5000,
            effect: {
              type: EFFECT_TYPE.BACKGROUND_SNAPSHOT,
              data: { filename: SNAPSHOT_NAMES.SERIAL_SNAPSHOT },
            },
          },
        ],
      },
    ],
  },
};
