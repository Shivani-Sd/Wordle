import { FC } from "react";

import Square from "../square/Square";
import "./styles.css";

interface RowProps {
  currentKey: string;
  currentLetter: string;
  isClick: number;
  thisRow: number;
}

const Row: FC<RowProps> = ({ currentKey, currentLetter, isClick, thisRow }) => {
  return (
    <div className="row">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Square
            column={index + 1}
            thisRow={thisRow}
            isClick={isClick}
            currentKey={currentKey}
            currentLetter={currentLetter}
            key={index}
          />
        ))}
    </div>
  );
};
export default Row;
