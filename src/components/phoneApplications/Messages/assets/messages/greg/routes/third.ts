import {MessageRouteType} from 'components/apps/Messages/context/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import {GREG_ROUTE_IDS} from './routes';

export enum THIRD_OPTION {
  A = 'THIRD',
  B = 'I A started looking',
  C = 'ADS',
}

const exchanges = [
  {
    name: CONTACT_NAMES.ZOLA,
    messages: ['Why are you txting me then?'],
  },
  {
    name: CONTACT_NAMES.SELF,
    messages: ['I thought you might have some ideas'],
  },
];

export const third_message: MessageRouteType = {
  id: GREG_ROUTE_IDS.THIRD,
  options: Object.values(THIRD_OPTION),
  routes: {
    [THIRD_OPTION.A]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [THIRD_OPTION.A as string],
      },
    ].concat(exchanges),

    [THIRD_OPTION.B]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [THIRD_OPTION.B as string],
      },
    ].concat(exchanges),
    [THIRD_OPTION.C]: [
      {
        name: CONTACT_NAMES.SELF,
        messages: [THIRD_OPTION.B as string],
      },
    ].concat(exchanges),
  },
};
