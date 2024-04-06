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
    return true;
  };

  const flipPieces = (index) => {
    return boardState;
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
