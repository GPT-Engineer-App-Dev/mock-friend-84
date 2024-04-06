import { useState } from "react";
import { Grid, GridItem, Circle } from "@chakra-ui/react";

const Board = () => {
  const boardSize = 8;
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [boardState, setBoardState] = useState(Array(boardSize * boardSize).fill(null));

  boardState[27] = true;
  boardState[28] = false;
  boardState[35] = false;
  boardState[36] = true;

  return (
    <Grid templateColumns={`repeat(${boardSize}, 1fr)`} gap={2}>
      {boardState.map((cell, index) => (
        <GridItem key={index} w="100%" h="12" bg="gray.100" borderRadius="md">
          <Circle size="40px" bg={cell === null ? "green.500" : cell ? "white" : "black"} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default Board;
