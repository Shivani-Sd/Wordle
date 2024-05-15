import { FC } from "react";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";

import {
  currentWordAtom,
  gameWonOrLostAtom,
  keyColorAtom,
} from "../../states/atoms";
import { DEFAULT_COLOR } from "../../constants";
import "./styles.css";

interface KeyboardButtonProps {
  text: string;
  handleClick: (value: string) => void;
}

const KeyboardButton: FC<KeyboardButtonProps> = ({ text, handleClick }) => {
  const currentWord = useRecoilValue(currentWordAtom);
  const keyColor = useRecoilValue(keyColorAtom);
  const gameWonOrLost = useRecoilValue(gameWonOrLostAtom);

  var input = document.getElementById(`keyboard-letters-${text}`); //to prevent enter key from triggering the letter keys

  if (input !== null)
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });

  const getDisabled = () => {
    if (gameWonOrLost === 0) {
      if (currentWord.length === 0)
        return !!(text === "DELETE" || text === "ENTER");
      else if (currentWord.length === 5)
        return !(text === "DELETE" || text === "ENTER");
      else return !!(text === "ENTER");
    } else if (gameWonOrLost === 3) return !(text === "DELETE");
    return true;
  };

  return (
    <Button
      type="button"
      className="keyboard-button"
      id={`keyboard-letters-${text}`}
      onClick={() => handleClick(text)}
      disabled={getDisabled()}
      sx={{
        backgroundColor:
          text === "ENTER" || text === "DELETE"
            ? DEFAULT_COLOR
            : (keyColor.get(text) as unknown as string),
      }}
    >
      {text}
    </Button>
  );
};
export default KeyboardButton;
