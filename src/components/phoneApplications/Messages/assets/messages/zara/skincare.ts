import { MESSAGE_CONTACT_NAME } from "components/apps/Messages/context/usersMapping";
import { MESSAGE_CONTENT } from "components/apps/Messages/reducers/conversationReducer/digestion/types";

import { ConversationExchangeType } from "../../../context/types";

export const skincare: ConversationExchangeType = {
  time: "2021-06-21T14:00:00Z",
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        "Well you know me, enthusiastic to a fault. And you know I'm just dying to get some eye shadow on those deep-set eyes of yours",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: [
        "Deep-set, Thanks. 🙃",
        "And no makeup, you know I'm not that faggy right. I wouldn't know a makeup brush from a hair brush. I just need a bit of help with my skin. Matt remarked about it",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        "With how you wear your hair I don't doubt that.",
        "And Matt thinks you very cute you're overreacting",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: [
        {
          type: MESSAGE_CONTENT.STRING,
          content: "I know I'm cute. God damn spend enough time at the gym.",
          reaction: { name: "heart", color: "#f487d3" },
        },
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        {
          type: MESSAGE_CONTENT.STRING,
          message:
            "Well your confidence is intact. The gym is no place to train one's skin though",
          reaction: { name: "thumbs-down", color: "#c22036" },
        },
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: ["🙃💁‍♀️", "Are you done."],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        "No, I've been waiting for years for you to finally take care of yourself. I've think I've gotten a million subscribers while waiting for you to even listen to me to wear sunscreen.",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: ["I know, I know, you're best friend is your sunscreen"],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["It's SPF is your BFF. Do you even watch my videos?"],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: ["You post one every day girl."],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["I know, I'm a slave to the algorithm."],
    },
  ],
};
