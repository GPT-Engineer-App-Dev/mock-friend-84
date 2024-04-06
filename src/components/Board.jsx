import { useState } from "react";
import { Grid, GridItem, Circle } from "@chakra-ui/react";

const Board = () => {
  const boardSize = 8;
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [boardState, setBoardState] = useState(() => {
    const initialState = Array(boardSize * boardSize).fill(null);
    initialState[27] = true;
    initialState[28] = false;
    initialState[35] = false;
    initialState[36] = true;
    return initialState;
  });

  const isValidMove = (index) => {
    const directions = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    for (let dir of directions) {
      let i = index + dir[0] + dir[1] * boardSize;
      let hasOpponent = false;

      while (i >= 0 && i < boardSize * boardSize) {
        if (boardState[i] === null) break;
        if (boardState[i] === !player1Turn) {
          hasOpponent = true;
        } else if (hasOpponent) {
          return true;
        } else {
          break;
        }
        i += dir[0] + dir[1] * boardSize;
      }
    }

    return false;
  };

  const flipPieces = (index) => {
    const directions = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    const newBoardState = [...boardState];
    newBoardState[index] = player1Turn;

    for (let dir of directions) {
      let i = index + dir[0] + dir[1] * boardSize;
      const flipped = [];

      while (i >= 0 && i < boardSize * boardSize) {
        if (boardState[i] === null) break;
        if (boardState[i] === !player1Turn) {
          flipped.push(i);
        } else if (flipped.length > 0) {
          flipped.forEach((idx) => {
            newBoardState[idx] = player1Turn;
          });
          break;
        } else {
          break;
        }
        i += dir[0] + dir[1] * boardSize;
      }
    }

    return newBoardState;
  };

  const handleClick = (index) => {
    if (boardState[index] !== null) return;

    if (isValidMove(index)) {
      const newBoardState = [...boardState];
      newBoardState[index] = player1Turn;
      const updatedBoardState = flipPieces(index);
      setBoardState(updatedBoardState);
      setPlayer1Turn(!player1Turn);
    }
  };

  return (
    <Grid templateColumns={`repeat(${boardSize}, 1fr)`} gap={2}>
      {boardState.map((cell, index) => (
        <GridItem key={index} w="100%" h="12" bg="gray.100" borderRadius="md" onClick={() => handleClick(index)}>
          <Circle size="40px" bg={cell === null ? "green.500" : cell ? "white" : "black"} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default Board;
