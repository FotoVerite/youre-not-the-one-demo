//import panopticon from '@apps/Messages/assets/messages/pantopitcon.jpeg';

import { MESSAGE_CONTACT_NAME } from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import { ConversationExchangeType } from "@Components/phoneApplications/Messages/hooks/useConversations/types";

export const advertisementExchange: ConversationExchangeType = {
  time: "2021-05-20T14:00:00Z",
  exchanges: [
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["View down again this month. I have no idea what to do"],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: ["What changed"],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        "Fuck if I know. I've combed my comments,checked my discord, scoped my competition.",
        "It isn't my content. I'm just not growing 🌝 enough.",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: ["Have you tried having your thumbnails you with an O face."],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        { type: MESSAGE_CONTENT.EMOJI, content: "🙄" },
        "I don't want to give 2019 attitude. Maybe I'll start doing livestreams in a hot tub",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: ["Would it hurt."],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        "Sadly, probably not. I wish I could just block all the misogynistic creeps who watch me as jack-off material.",
        "It's fucking makeup and nails, I'm not doing squats in tights like hopescope.",
        "Not that she deserves it either.",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.SELF,
      messages: [
        "Hopescope/Tights, now we truly are in 2019. Isn't she doing lost luggages reviews now.",
      ],
    },
    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: [
        "Starting to.",
        "Probably a pivot, she saturated the market. Ugh I wish I could grind as hard as her.",
        "Doing a video a week is destroying me",
      ],
    },

    {
      name: MESSAGE_CONTACT_NAME.ZARA,
      messages: ["Get dinner with me, I need to stop looking at my metrics"],
    },
  ],
};
