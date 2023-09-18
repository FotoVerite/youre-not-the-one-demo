import {
  EventBasedRouteType,
  MessageRouteType,
} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {GREG_ROUTE_IDS} from './routes';
import {ZARA_ROUTE_IDS} from '../../zola/routes/routes';
import {BORKED_PHONE_OPTIONS} from '../../zola/routes/borked_phone';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export enum FIRST_OPTIONS {
  A = 'No',
  B = 'I just started looking',
  C = 'BLERG',
}

export const first_message: EventBasedRouteType = {
  id: GREG_ROUTE_IDS.FIRST,
  conditions: {
    [CONTACT_NAMES.ZOLA]: {
      routes: {
        [ZARA_ROUTE_IDS.BORKED_PHONE]: [BORKED_PHONE_OPTIONS.A],
      },
    },
  },
  exchanges: [
    {
      name: CONTACT_NAMES.GREG,
      messages: [FIRST_OPTIONS.A as string],
    },
    {
      name: CONTACT_NAMES.GREG,
      messages: [
        {
          type: MESSAGE_TYPE.STRING,
          message: "I'm just speaking the truth",
          typingDelay: -400,
        },
        {
          type: MESSAGE_TYPE.STRING,
          message: 'You just hate to hear it',
          typingDelay: -400,
        },
        {
          type: MESSAGE_TYPE.STRING,
          message: "And that's why you keep putting up with it.",
          typingDelay: -400,
        },
        {
          type: MESSAGE_TYPE.STRING,
          message: 'Plus I actually message you.',
          typingDelay: -600,
        },
        {
          type: MESSAGE_TYPE.EMOJI,
          message: '😉',
        },
      ],
    },
  ],
};
