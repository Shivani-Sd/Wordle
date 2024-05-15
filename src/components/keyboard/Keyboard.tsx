import { FC } from "react";

import KeyboardButton from "../keyboard-button/KeyboardButton";
import "./styles.css";

interface KeyboardProps {
  handleClick: (value: string) => void;
}

const Keyboard: FC<KeyboardProps> = ({ handleClick }) => (
  <>
    <div className="row1">
      {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
        (letter, index) => (
          <KeyboardButton text={letter} handleClick={handleClick} key={index} />
        )
      )}
    </div>
    <div className="row2">
      {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter, index) => (
        <KeyboardButton text={letter} handleClick={handleClick} key={index} />
      ))}
    </div>
    <div className="row3">
      {["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"].map(
        (letter, index) => (
          <KeyboardButton text={letter} handleClick={handleClick} key={index} />
        )
      )}
    </div>
  </>
);
export default Keyboard;
