import { ImageSourcePropType } from "react-native";

import zaraAvatar from "../assets/avatars/Zara.jpg";
import michaelAvatar from "../assets/avatars/michael.jpg";
import defaultAvatar from "../assets/avatars/unknown.jpeg";
type InfoType = {
  avatar: ImageSourcePropType;
  colors: string[];
};

const defaults = {
  avatar: defaultAvatar,
  colors: ["#6b6b6d", "#363243"],
};

export enum SNAPSHOT_NAMES {
  BLOCK_ANTAGONIST = "BLOCK_ANTAGONIST",
  SERIAL_SNAPSHOT = "SERIAL_SNAPSHOT",
  ZARA_FUCK_OFF = "ZARA_FUCK_OFF",
}

export enum MESSAGE_CONTACT_NAME {
  ARIAL = "Arial",
  ALICE = "Alice",
  BASE = "",
  CAT_FACTS = "KTHXBYE",
  CHRIS = "Chris",
  CLAY = "Clay",
  CUSTOMER_SERVICE = "401112",
  EMMA = "Maybe: Emma",
  GRACE_RUSSO = "Grace Russo",
  GREG = "Fuck Face",
  LENNY = "Maybe: Lenny",
  LEO = "1-201-657-5252",
  MILEENA = "Mileena",
  MICHAEL = "Maybe: Michael",
  MOVIE_NIGHT = "Movie Night",
  //Probably unneeded but I want the seperation between the number and the messages
  MY_SELF = "My Self",
  SELF = "Self",
  STEVE_LITT = "Steve-0",
  TEST = "Test",
  TEST2 = "Test2",
  ZARA = "Maybe: Zara",
  DEFAULT = "Default",
  SEAMLESS = "30368",
  SPAM1 = "1-222-666-1337",
  SPAM2 = "1-225-666-1337",
  SPAM3 = "1-226-666-1337",
  SPAM4 = "1-227-666-1337",
  SPAM5 = "1-228-666-1337",
  SPAM6 = "1-229-666-1337",
}

export const MESSAGE_CONTACT_INFO: {
  [key in MESSAGE_CONTACT_NAME]: InfoType;
} = {
  "": defaults,
  [MESSAGE_CONTACT_NAME.CAT_FACTS]: defaults,
  [MESSAGE_CONTACT_NAME.EMMA]: {
    avatar: defaultAvatar,
    colors: ["#d92c4c", "#450b49"],
  },
  [MESSAGE_CONTACT_NAME.SPAM1]: defaults,
  [MESSAGE_CONTACT_NAME.SPAM2]: defaults,
  [MESSAGE_CONTACT_NAME.SPAM3]: defaults,
  [MESSAGE_CONTACT_NAME.SPAM4]: defaults,
  [MESSAGE_CONTACT_NAME.SPAM5]: defaults,
  [MESSAGE_CONTACT_NAME.SPAM6]: defaults,

  //   Arial: { avatar: arialAvatar, colors: ["#dbaf48", "#cdc8bb"] },
  //   Alice: { avatar: aliceAvatar, colors: ["#d0bd28", "#cdc8bb"] },
  //   Chris: { avatar: chrisAvatar, colors: ["#6bd8e4", "#363243"] },
  //   Clay: { avatar: chrisAvatar, colors: ["#6bd8e4", "#363243"] },
  //   [MESSAGE_CONTACT_NAME.CUSTOMER_SERVICE]: {
  //     avatar: defaultAvatar,
  //     colors: ["#6b6b6d", "#363243"],
  //   },

  "Fuck Face": { avatar: defaultAvatar, colors: ["#48ee4e", "#363243"] },
  //   "Grace Russo": { avatar: graceAvatar, colors: ["#EE6548", "#363243"] },
  [MESSAGE_CONTACT_NAME.LEO]: {
    avatar: defaultAvatar,
    colors: ["#f5d742", "#363243"],
  },
  [MESSAGE_CONTACT_NAME.LENNY]: {
    avatar: defaultAvatar,
    colors: ["#6b6b6d", "#363243"],
  },

  //   Mileena: { avatar: meleenaAvatar, colors: ["#ff0095", "#80194d"] },
  "Maybe: Michael": { avatar: michaelAvatar, colors: ["#f54295", "#8900fa"] },
  //   "Movie Night": { avatar: darkoAvatar, colors: ["#6b6b6d", "#363243"] },
  [MESSAGE_CONTACT_NAME.MY_SELF]: {
    avatar: defaultAvatar,
    colors: ["blue", "#363243"],
  },

  Self: { avatar: defaultAvatar, colors: ["blue", "#363243"] },
  //   [MESSAGE_CONTACT_NAME.SPAM2]: {
  //     avatar: defaultAvatar,
  //     colors: ["#6b6b6d", "#363243"],
  //   },
  //   [MESSAGE_CONTACT_NAME.SPAM3]: {
  //     avatar: defaultAvatar,
  //     colors: ["#6b6b6d", "#363243"],
  //   },
  //   [MESSAGE_CONTACT_NAME.SPAM4]: {
  //     avatar: defaultAvatar,
  //     colors: ["#6b6b6d", "#363243"],
  //   },
  //   "Steve-0": { avatar: steveLitt, colors: ["#FF002D", "#C3596B"] },
  //   Test: { avatar: defaultAvatar, colors: ["#FF002D", "#C3596B"] },
  //   Test2: { avatar: defaultAvatar, colors: ["#FF002D", "#C3596B"] },
  [MESSAGE_CONTACT_NAME.ZARA]: {
    avatar: zaraAvatar,
    colors: ["#b46be4", "#363243"],
  },
  //   30368: { avatar: defaultAvatar, colors: ["#6b6b6d", "#363243"] },
  //   Default: { avatar: defaultAvatar, colors: ["#6b6b6d", "#363243"] },
};
