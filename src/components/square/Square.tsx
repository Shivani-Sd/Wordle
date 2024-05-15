/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import {
  currentColumnAtom,
  cellColorsAtom,
  gameWonOrLostAtom,
  currentRowAtom,
} from "../../states/atoms";
import "./styles.css";

interface SquareProps {
  column: number;
  currentKey: string;
  currentLetter: string;
  isClick: number;
  thisRow: number;
}

const Square: FC<SquareProps> = ({
  currentKey,
  currentLetter,
  column,
  isClick,
  thisRow,
}) => {
  const isEnter = currentKey === "ENTER";
  const isDelete = currentKey === "DELETE";

  const cellColors = useRecoilValue(cellColorsAtom);
  const currentRow = useRecoilValue(currentRowAtom);
  const currentColumn = useRecoilValue(currentColumnAtom);
  const gameWonOrLost = useRecoilValue(gameWonOrLostAtom);

  const [squareValue, setSquareValue] = useState<string>("");

  const color = cellColors[thisRow][column - 1];

  const isCurrentRow = thisRow === currentRow;

  // Removing square value on delete
  useEffect(() => {
    if (isCurrentRow && column === currentColumn && isDelete) {
      setSquareValue("");
    }
  }, [isDelete]);

  // Setting square value
  useEffect(() => {
    if (isCurrentRow && column === currentColumn && !isEnter && !isDelete) {
      setSquareValue(currentLetter);
    }
  }, [isClick]);

  return (
    <input
      className="square"
      defaultValue={squareValue}
      style={{
        backgroundColor: color,
        borderColor:
          squareValue && color === "white"
            ? "2px solid var(--color-tone-3)"
            : "#d3d6da",
        color: squareValue && color === "white" ? "black" : "white",
        animationName:
          color !== "white"
            ? "flip"
            : gameWonOrLost === 3 && squareValue
            ? "shake"
            : squareValue
            ? "fill"
            : "none",
        animationDuration:
          color !== "white" || (gameWonOrLost === 3 && squareValue)
            ? "0.5s"
            : squareValue
            ? "0.1s"
            : "none",
        animationTimingFunction: "ease forwards",
        animationDelay: color !== "white" ? `${0.2 * column}s` : "none",
        transition:
          color !== "white"
            ? `background-color ${0 * column}s linear,color ${
                0 * column
              }s linear, border-color ${0 * column}s linear`
            : "none",
      }}
    />
  );
};
export default Square;
