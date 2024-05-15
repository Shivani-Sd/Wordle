import { atom } from "recoil";

import {
  cell_colors,
  keyboard_colors,
} from "../constants";

export const currentRowAtom = atom({
  key: "currentRow",
  default: 0,
});

export const currentColumnAtom = atom({
  key: "currentColumn",
  default: 0,
});

export const currentWordAtom = atom({
  key: "currentWord",
  default: "",
});

export const gameWonOrLostAtom = atom({
  key: "gameWonOrLost",
  default: 0,
});

export const cellColorsAtom = atom({
  key: "newLetters",
  default: cell_colors,
});

export const keyColorAtom = atom({
  key: "keyColor",
  default: keyboard_colors,
});
