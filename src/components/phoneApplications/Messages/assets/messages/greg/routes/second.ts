import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {GREG_ROUTE_IDS} from './routes';
import {MESSAGE_TYPE} from 'components/apps/Messages/reducers/conversationReducer/digestion/types';

export enum SECOND_OPTION {
  A = 'TES',
  B = 'I ASDjust started looking',
  C = 'ADS',
}

const exchanges = [
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['Why are you txting me then?'],
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
        typingDelay: -500,
      },
      {
        type: MESSAGE_TYPE.STRING,
        message: "And that's why you keep putting up with it.",
        typingDelay: -600,
      },
      {
        type: MESSAGE_TYPE.STRING,
        message: 'Plus I actually message you.',
        typingDelay: -700,
      },
      {
        type: MESSAGE_TYPE.EMOJI,
        message: '😉',
      },
    ],
  },
];

export const second_message: MessageRouteType = {
  id: GREG_ROUTE_IDS.SECOND,
  options: Object.values(SECOND_OPTION),
  routes: {
    [SECOND_OPTION.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [SECOND_OPTION.A as string],
      },
    ].concat(exchanges),

    [SECOND_OPTION.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [SECOND_OPTION.B as string],
      },
    ].concat(exchanges),
    [SECOND_OPTION.C]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [SECOND_OPTION.B as string],
      },
    ].concat(exchanges),
  },
};
