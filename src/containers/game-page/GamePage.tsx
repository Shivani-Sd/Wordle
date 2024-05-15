/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Snackbar } from "@mui/material";
import Confetti from "react-confetti";
import axios from "axios";
import _ from "lodash";

import {
  CORRECT_LETTER_COLOR,
  PARTIALLY_CORRECT_COLOR,
  WRONG_LETTER_COLOR,
  keyboard_colors,
} from "../../constants";
import {
  cellColorsAtom,
  currentColumnAtom,
  currentRowAtom,
  currentWordAtom,
  gameWonOrLostAtom,
  keyColorAtom,
} from "../../states/atoms";
import Keyboard from "../../components/keyboard/Keyboard";
import NavBar from "../../components/navbar/navbar";
import Row from "../../components/row/Row";
import FinalModal from "../../components/modal/FinalModal";
import "./styles.css";

const GamePage: FC = () => {
  const keyColor = useRecoilValue(keyColorAtom);

  const [currentWord, setCurrentWord] = useRecoilState(currentWordAtom);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnAtom);
  const [currentRow, setCurrentRow] = useRecoilState(currentRowAtom);
  const [gameWonOrLost, setGameWonOrLost] = useRecoilState(gameWonOrLostAtom);
  const [cellColors, setCellColors] = useRecoilState(cellColorsAtom);

  const [word, setWord] = useState<string>("");
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [currentKey, setCurrentKey] = useState<string>("");
  const [isClick, setClick] = useState<number>(0);
  const [isValidLoading, setIsValidLoading] = useState<boolean>(false);
  const [isWordValid, setWordValid] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const isEnter = currentKey === "ENTER";
  const isDelete = currentKey === "DELETE";

  const actual_letters = word?.split("");

  let user_letters = currentWord.split("");

  let cell_colors = _.cloneDeep(cellColors);

  let confettiTmer: NodeJS.Timeout;

  let modalTimer: NodeJS.Timeout;

  document.onkeydown = function (event) {
    const current_key = event.key;
    if (current_key !== "") {
      if (
        keyboard_colors.has(current_key.toUpperCase()) ||
        current_key === "Delete"
      )
        handleClickOrPress(current_key.toUpperCase());
      setCurrentKey(current_key.toUpperCase());
    }
  };

  const checkIsWordValid = (isValid: boolean) => {
    setWordValid(isValid);
  };

  const handleClose = () => {
    setOpen(false);
    if (gameWonOrLost === 3) setGameWonOrLost(0);
  };

  const handleInvalidWord = () => {
    setGameWonOrLost(3);
  };

  const handleClickOrPress = (value: string) => {
    setClick(isClick + 1);

    if (value === "DELETE") {
      if (gameWonOrLost === 3) setGameWonOrLost(0);
      setCurrentLetter("");
      setCurrentWord(currentWord.slice(0, currentColumn - 1));
    } else {
      if (currentColumn !== 5) {
        setCurrentColumn(currentColumn + 1);
        setCurrentLetter(value);
        setCurrentWord(currentWord + value);
      }
    }
    setCurrentKey(value);
  };

  const handleGameWon = () => {
    setGameWonOrLost(1);

    for (let i = 0; i < 5; i++)
      cell_colors[currentRow][i] = CORRECT_LETTER_COLOR;
    actual_letters.forEach((letter: string) => {
      keyColor.set(letter, CORRECT_LETTER_COLOR);
    });

    setCellColors(cell_colors);

    confettiTmer = setTimeout(() => {
      setConfetti(true);
    }, 2000);

    modalTimer = setTimeout(() => {
      setOpen(true);
    }, 6000);
  };

  const handleSubmitWord = () => {
    if (isEnter && isWordValid) {
      if (currentWord === word) {
        handleGameWon();

        return;
      }

      if (isWordValid) {
        user_letters.forEach((uItem: string, uIndex: number) => {
          let flag = 0;
          actual_letters.forEach((aItem: string, aIndex: number) => {
            if (aItem === uItem) {
              //if a letter in the user's word also belongs to the actual word
              if (uIndex === aIndex) {
                //if the letter in the user's word is at the right position
                cell_colors[currentRow][uIndex] = CORRECT_LETTER_COLOR;
                actual_letters[aIndex] = "*";
                keyColor.set(uItem, CORRECT_LETTER_COLOR);
              } else {
                if (cell_colors[currentRow][uIndex] !== CORRECT_LETTER_COLOR) {
                  if (user_letters[aIndex] === aItem) {
                    //if the right position of the user's word holds the actual letter
                    if (
                      cell_colors[currentRow][uIndex] !==
                        CORRECT_LETTER_COLOR &&
                      cell_colors[currentRow][uIndex] !==
                        PARTIALLY_CORRECT_COLOR
                    ) {
                      cell_colors[currentRow][uIndex] = WRONG_LETTER_COLOR;
                    }
                    if (!actual_letters.includes(uItem)) {
                      if (
                        keyColor.get(uItem) !== CORRECT_LETTER_COLOR &&
                        keyColor.get(uItem) !== PARTIALLY_CORRECT_COLOR
                      ) {
                        keyColor.set(uItem, WRONG_LETTER_COLOR);
                      }
                    }
                  } else {
                    if (uItem !== actual_letters[uIndex]) {
                      if (
                        cell_colors[currentRow][uIndex] !==
                        PARTIALLY_CORRECT_COLOR
                      ) {
                        cell_colors[currentRow][uIndex] =
                          PARTIALLY_CORRECT_COLOR;
                        actual_letters[aIndex] = "*";
                      }
                      if (keyColor.get(uItem) !== CORRECT_LETTER_COLOR) {
                        keyColor.set(uItem, PARTIALLY_CORRECT_COLOR);
                      }
                    }
                  }
                }
              }
              flag = 1;
            }
          });

          if (flag === 0) {
            //if a letter in the user's word does not belong to the actual word
            if (
              cell_colors[currentRow][uIndex] !== CORRECT_LETTER_COLOR &&
              cell_colors[currentRow][uIndex] !== PARTIALLY_CORRECT_COLOR
            ) {
              cell_colors[currentRow][uIndex] = WRONG_LETTER_COLOR;
            }
            if (
              keyColor.get(uItem) !== CORRECT_LETTER_COLOR &&
              keyColor.get(uItem) !== PARTIALLY_CORRECT_COLOR
            ) {
              keyColor.set(uItem, WRONG_LETTER_COLOR);
            }
          }
        });
        setCurrentWord("");
        setCellColors(cell_colors);
      }
      if (currentRow === 5) {
        if (currentWord !== word) {
          setGameWonOrLost(2);
          confettiTmer = setTimeout(() => {
            setOpen(true);
          }, 1600);
        }
      } else {
        setCurrentColumn(0);
        setCurrentLetter("*");
        setCurrentRow(currentRow + 1);
        setIsValidLoading(false);
        setWordValid(false);
      }

      setCurrentKey("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://wordle-be-1dpe.onrender.com/words/today`
        );
        setWord(response.data.word);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
    return () => {
      clearTimeout(confettiTmer);
      clearTimeout(modalTimer);
    };
  }, []);

  useEffect(() => {
    if (currentWord.length === 5) {
      setIsValidLoading(true);
      axios
        .post(`https://wordle-be-1dpe.onrender.com/validWords/isValid`, {
          word: currentWord.toLowerCase(),
        })
        .then((response) => {
          setWordValid(response.data);
          checkIsWordValid(response.data);
        })
        .finally(() => {
          setIsValidLoading(false);
        });
    }
  }, [currentWord]);

  useEffect(() => {
    //delete functionality
    if (currentColumn && isDelete) {
      setCurrentColumn(currentColumn - 1);
      setCurrentKey("");
    } // eslint-disable-next-line
  }, [isDelete]);

  useEffect(() => {
    if (isEnter) {
      if (currentWord.length === 5 && !isValidLoading && !isWordValid)
        handleInvalidWord();

      if (isWordValid) handleSubmitWord();
    }
  }, [isEnter, isWordValid, isValidLoading]);

  return (
    <>
      <NavBar />
      <div className="game-space">
        <div className="input-space">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div className={`row-${index + 1}`} key={index}>
                <Row
                  thisRow={index}
                  isClick={isClick}
                  currentKey={currentKey}
                  currentLetter={currentLetter}
                />
              </div>
            ))}
        </div>
        <div className="keyboard">
          <Keyboard handleClick={handleClickOrPress} />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={gameWonOrLost === 3}
          message="Oops! Seems like that isn't a real word :("
          onClose={handleClose}
          autoHideDuration={2000}
        />
        <FinalModal open={open} />
        {confetti && <Confetti />}
      </div>
    </>
  );
};
export default GamePage;
