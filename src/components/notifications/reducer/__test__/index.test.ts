import { produce } from "immer";

import notificationReducer from "..";
import {
  AddNotificationActionPayloadType,
  NOTIFICATIONS_REDUCER_ACTIONS,
  NotificationType,
} from "../types";

const dateTime = new Date("2020-01-01");

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(dateTime);
});

afterAll(() => {
  jest.useRealTimers();
});

const Notifications: NotificationType[] = [
  {
    index: 0,
    active: false,
    title: "control",
    content: "control",
    createdAt: dateTime,
    updatedAt: dateTime,
  },
];

describe("notificationReducer", () => {
  describe(`handles ADD`, () => {
    it("adds a notification", () => {
      const payload = {
        title: "new",
        content: "new",
      };
      const addAction: AddNotificationActionPayloadType = {
        type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
        payload,
      };

      const returnValue = produce(Notifications, (draft) => {
        draft.push({
          ...payload,
          ...{
            active: true,
            createdAt: dateTime,
            updatedAt: dateTime,
            index: 1,
          },
        });
        return draft;
      });

      expect(notificationReducer(Notifications, addAction)).toEqual(
        returnValue,
      );
    });

    it("can override active if needed", () => {
      const payload = {
        title: "new",
        content: "new",
        active: false,
      };
      const addAction: AddNotificationActionPayloadType = {
        type: NOTIFICATIONS_REDUCER_ACTIONS.ADD,
        payload,
      };

      const returnValue = produce(Notifications, (draft) => {
        draft.push({
          ...payload,
          ...{
            active: false,
            createdAt: dateTime,
            updatedAt: dateTime,
            index: 1,
          },
        });
        return draft;
      });

      expect(notificationReducer(Notifications, addAction)).toEqual(
        returnValue,
      );
    });
  });

  it(`handles RESET`, () => {
    expect(
      notificationReducer(Notifications, {
        type: NOTIFICATIONS_REDUCER_ACTIONS.RESET,
      }),
    ).toEqual([] as NotificationType[]);
  });

  it(`handles UPDATE`, () => {
    const updateTime = new Date("2020-01-02");
    jest.setSystemTime(updateTime);
    const returnValue = produce(Notifications, (draft) => {
      draft[0] = {
        ...draft[0],
        ...{
          active: true,
          title: "updated",
          updatedAt: updateTime,
        },
      };
      return draft;
    });
    expect(
      notificationReducer(Notifications, {
        type: NOTIFICATIONS_REDUCER_ACTIONS.UPDATE,
        payload: { index: 0, active: true, title: "updated" },
      }),
    ).toEqual(returnValue);
  });

  it(`handles DELETE`, () => {
    expect(
      notificationReducer(Notifications, {
        type: NOTIFICATIONS_REDUCER_ACTIONS.DELETE,
        payload: { index: 0 },
      }),
    ).toEqual([] as NotificationType[]);
  });
});
