import React from "react";
import { handleKeyInput } from "./Puzzle";
const row1 = "QWERTYUIOP";
const row2 = "ASDFGHJKL";
const row3 = "ZXCVBNM";

type Props = {
  activePuzzleIndex: number;
  guess: string[];
  setGuess: any;
  cursorIndex: number;
  setCursorIndex: any;
  usageAllLetters: { [key: string]: string[] };
};

export default function Keyboard({
  activePuzzleIndex,
  guess,
  setGuess,
  cursorIndex,
  setCursorIndex,
  usageAllLetters,
}: Props) {
  return (
    <div>
      {[row1, row2, row3].map((row, rowIndex) => (
        <>
          <div className="keyboardRow">
            {row.split("").map((letter) => (
              <KeyButton
                letter={letter}
                usage={usageAllLetters[letter]}
                activePuzzleIndex={activePuzzleIndex}
                guess={guess}
                setGuess={setGuess}
                cursorIndex={cursorIndex}
                setCursorIndex={setCursorIndex}
              />
            ))}

            {rowIndex === 2 && (
              <div
                className="delButton"
                onClick={() =>
                  handleKeyInput(
                    "Backspace",
                    activePuzzleIndex,
                    guess,
                    setGuess,
                    cursorIndex,
                    setCursorIndex,
                  )
                }
              >
                DEL
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
}

type KeyButtonProps = {
  letter: string;
  usage: string[];
  activePuzzleIndex: number;
  guess: string[];
  setGuess: any;
  cursorIndex: number;
  setCursorIndex: any;
};

function KeyButton({
  letter,
  usage,
  activePuzzleIndex,
  guess,
  setGuess,
  cursorIndex,
  setCursorIndex,
}: KeyButtonProps) {
  const width = 40;
  const height = 44;
  const verticalStepSize = height / usage.length;
  return (
    <div
      className="keyButton"
      onClick={() =>
        handleKeyInput(
          letter,
          activePuzzleIndex,
          guess,
          setGuess,
          cursorIndex,
          setCursorIndex,
        )
      }
    >
      <span
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {letter}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        {usage.map((color, index) => (
          <rect
            x={0}
            y={index * verticalStepSize}
            width={width}
            height={verticalStepSize}
            stroke={
              {
                green: "#228B22",
                white: "white",
                yellow: "#FFEECC",
                blank: "#ACACAC",
              }[color]
            }
            strokeWidth={1}
            fill={
              {
                green: "#6bd425",
                white: "white",
                yellow: "#FFD700",
                blank: "#DCDCDC",
              }[color]
            }
          />
        ))}
      </svg>
    </div>
  );
}
