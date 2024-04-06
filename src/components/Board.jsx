import { Grid, GridItem, Circle } from "@chakra-ui/react";

const Board = () => {
  const boardSize = 8;

  return (
    <Grid templateColumns={`repeat(${boardSize}, 1fr)`} gap={2}>
      {Array(boardSize * boardSize)
        .fill(null)
        .map((_, index) => (
          <GridItem key={index} w="100%" h="12" bg="gray.100" borderRadius="md">
            <Circle size="40px" bg={index % 2 === 0 ? "green.500" : "white"} />
          </GridItem>
        ))}
    </Grid>
  );
};

export default Board;
