const MULTIPLIER = 12;
export type spacing = "p1" | "p2" | "p3" | "p4" | "p5";

export const theme: {
  colors: {
    background: string;
    brand: string;
    border: string;
    brandDark: string;
    darkGray: string;
    darkSlate: string;
    disabled: string;
    lightGray: string;
    lightGray2: string;
    good: string;
    better: string;
    best: string;
    error: string;
    info: string;
    muted: string;
    notes: string;
    ocher: string;
    slate: string;
    success: string;
    text: string;
  };
  multiplier: number;
  BorderRadius: { small: number; normal: number };
  FontSize: {
    xs: number;
    small: number;
    medium: number;
    ml: number;
    large: number;
    xl: number;
    xxl: number;
  };
  spacing: { p1: number; p2: number; p3: number; p4: number; p5: number };
} = {
  colors: {
    ocher: "#DAA500",
    background: "#FFF",
    best: "#DAA520",
    better: "#BEC2CB",
    border: "#E2E8F0",
    brand: "#22b573",
    brandDark: "#00523d",
    darkSlate: "rgb(172,172, 172)",
    disabled: "#4e5c58",
    error: "#FC0021",
    good: "#B08D57",
    info: "#00FFFF",
    lightGray2: "#ececec",
    lightGray: "#f2f2f2",
    darkGray: "rgb(240,240, 240)",
    slate: "#BEC2CB",
    muted: "#F0F1F3",
    notes: "#cc7722",
    success: "#7DBE31",
    text: "#0A0A0A",
  },
  BorderRadius: {
    small: 8,
    normal: 24,
  },
  FontSize: {
    xs: 10,
    small: 14,
    medium: 18,
    ml: 28,
    large: 36,
    xl: 48,
    xxl: 60,
  },
  multiplier: MULTIPLIER,
  spacing: {
    p1: 1 * MULTIPLIER,
    p2: 2 * MULTIPLIER,
    p3: 3 * MULTIPLIER,
    p4: 4 * MULTIPLIER,
    p5: 5 * MULTIPLIER,
  },
};

export const discordTheme = {
  colors: {
    accent: "#7289da",
    gray60: "#424549",
    gray50: "#36393e",
    gray40: "#282b30",
    gray30: "#1e2124",
  },
};
