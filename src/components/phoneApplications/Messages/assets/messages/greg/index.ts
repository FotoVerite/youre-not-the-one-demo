import {
  MESSAGE_CONTACT_NAME,
  MESSAGE_CONTACT_INFO,
} from "@Components/phoneApplications/Messages/constants";
import { MESSAGE_CONTENT } from "@Components/phoneApplications/Messages/hooks/contentWithMetaTypes";
import {
  ConversationFileType,
  ConversationType,
} from "@Components/phoneApplications/Messages/hooks/useConversations/types";

const GREG = MESSAGE_CONTACT_NAME.GREG;
const SELF = MESSAGE_CONTACT_NAME.SELF;
export const greg: ConversationFileType = {
  name: GREG,
  tags: [],
  heroImage: MESSAGE_CONTACT_INFO[GREG].avatar,
  interfaceColor: MESSAGE_CONTACT_INFO[GREG].colors[0],
  routes: [],
  exchanges: [
    {
      time: "2019-05-28T23:34:00Z",
      exchanges: [
        //   {
        //     name: CONTACT_NAMES.SELF,
        //     messages: [
        //       {
        //         type: DigestedItemTypes.STRING,
        //         message: 'That was very, very good last night.',
        //         reaction: {name: 'heart', color: '#f487d3'},
        //       },
        //     ],
        //   },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: GREG,
          messages: ["Agreed, and this morning"],
        },
        {
          name: MESSAGE_CONTACT_NAME.SELF,
          messages: ["Mmmhm"],
        },
        {
          name: GREG,
          messages: [
            "We should plan another session soon",
            {
              type: MESSAGE_CONTENT.VCARD,
              content: MESSAGE_CONTACT_NAME.MILEENA,
            },
            {
              type: MESSAGE_CONTENT.NUMBER,
              content: MESSAGE_CONTACT_NAME.GRACE_RUSSO,
            },
          ],
        },
      ],
    },
  ],
};
