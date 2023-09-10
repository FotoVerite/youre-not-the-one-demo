import { produce } from "immer";

import eventsReducer from "..";
import {
  APP_EVENTS_ACTIONS,
  AddMessageAppConversationSeenEventAction,
  AppEventsType,
  BlockMessageAppConversationEventAction,
  CreateMessageAppRouteEventAction,
  UpdateMessageAppRouteEventAction,
} from "../types";

const AppEvent: AppEventsType = {
  Messages: {
    name: { views: [], routes: {}, blocked: false },
    control: { views: [], routes: {}, blocked: false },
  },
};

const dateTime = new Date("2020-01-01");

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(dateTime);
});

afterAll(() => {
  jest.useRealTimers();
});

describe("eventsReducer", () => {
  it(`handles MESSAGE_APP_CONVERSATION_SEEN`, () => {
    const viewAction: AddMessageAppConversationSeenEventAction = {
      type: APP_EVENTS_ACTIONS.MESSAGE_APP_CONVERSATION_SEEN,
      payload: { name: "name" },
    };

    // it's empty on purpose because it's just starting to fetch posts
    const returnValue = produce(AppEvent, (draft) => {
      draft.Messages.name.views.push(dateTime);
      return draft;
    });

    expect(eventsReducer(AppEvent, viewAction)).toEqual(returnValue);

    const secondaryReturn = produce(returnValue, (draft) => {
      draft.Messages.name.views.push(dateTime);
      return draft;
    });
    expect(eventsReducer(returnValue, viewAction)).toEqual(secondaryReturn);
  });

  it(`handles MESSAGE_APP_BLOCK_CONVERSATION`, () => {
    const viewAction: BlockMessageAppConversationEventAction = {
      type: APP_EVENTS_ACTIONS.MESSAGE_APP_BLOCK_CONVERSATION,
      payload: { name: "name" },
    };
    const returnValue = produce(AppEvent, (draft) => {
      draft.Messages.name.blocked = true;
      return draft;
    });

    expect(eventsReducer(AppEvent, viewAction)).toEqual(returnValue);
  });

  describe("handles MESSAGE_APP_ROUTE_CREATE", () => {
    it(`with minimal props`, () => {
      const minimalProps: CreateMessageAppRouteEventAction = {
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: { routeId: 1, name: "name", finished: true },
      };

      const returnValue = produce(AppEvent, (draft) => {
        draft.Messages.name.routes = {
          "1": {
            createdAt: dateTime,
            updatedAt: dateTime,
            position: 1,
            finished: true,
          },
        };
        return draft;
      });

      expect(eventsReducer(AppEvent, minimalProps)).toEqual(returnValue);
    });

    it(`with complex route props`, () => {
      const complexRouteProps: CreateMessageAppRouteEventAction = {
        type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_CREATE,
        payload: {
          routeId: 1,
          name: "name",
          atIndex: 5,
          chosen: "chosen string",
        },
      };

      const returnValue = produce(AppEvent, (draft) => {
        draft.Messages.name.routes = {
          "1": {
            createdAt: dateTime,
            updatedAt: dateTime,
            position: 1,
            atIndex: 5,
            chosen: "chosen string",
          },
        };
        return draft;
      });

      expect(eventsReducer(AppEvent, complexRouteProps)).toEqual(returnValue);
    });
  });

  it(`handles MESSAGE_APP_ROUTE_UPDATE`, () => {
    const updateAction: UpdateMessageAppRouteEventAction = {
      type: APP_EVENTS_ACTIONS.MESSAGE_APP_ROUTE_UPDATE,
      payload: { routeId: 1, name: "name", atIndex: 6 },
    };

    const startValue = produce(AppEvent, (draft) => {
      draft.Messages.name.routes = {
        "1": {
          createdAt: dateTime,
          updatedAt: dateTime,
          position: 1,
          atIndex: 5,
          chosen: "chosen string",
        },
      };
      return draft;
    });

    const updateTime = new Date("2020-01-02");

    jest.setSystemTime(updateTime);

    const returnValue = produce(AppEvent, (draft) => {
      draft.Messages.name.routes = {
        "1": {
          createdAt: dateTime,
          updatedAt: updateTime,
          position: 1,
          atIndex: 6,
          chosen: "chosen string",
        },
      };
      return draft;
    });

    expect(eventsReducer(startValue, updateAction)).toEqual(returnValue);
    jest.setSystemTime(dateTime);
  });
});
