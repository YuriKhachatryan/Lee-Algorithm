import React, { FC, useEffect, useState } from "react";
import { Container, ThemeProvider, Paper, Box, Button } from "@mui/material";
import { theme } from "../../styles/componentsStyles";
import { laberintPageStyle } from "./style";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../constants";
import { Address } from "../../interface/interface";

const { containerStyles, boxStyles, paperStyles } = laberintPageStyle;

const LaberintPage: FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [paperAddresses, setPaperAddresses] = useState<Address[]>([]);
  const [startPoint, setStartPoint] = useState<Address | null>(null);
  const [endPoint, setEndPoint] = useState<Address | null>(null);
  const [shortestPath, setShortestPath] = useState<number[][]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const { xAxis, yAxis } = JSON.parse(localStorage.getItem("axis") as string);
    const newMatrix = Array.from({ length: yAxis }, () => Array(xAxis).fill(0));
    setMatrix(newMatrix);

    const initialAddresses = newMatrix.reduce(
      (acc, _, rowIndex) =>
        acc.concat(
          newMatrix[rowIndex].map((_, colIndex) => ({
            x: colIndex,
            y: rowIndex,
            numbeOfSteps: 0,
          }))
        ),
      [] as Address[]
    );
    setPaperAddresses(initialAddresses);
  }, []);

  useEffect(() => {
    if (endPoint) {
      leeAlgorithm();
    }
  }, [endPoint]);

  const handlePaperClick = (address: Address) => {
    if (!startPoint) {
      setStartPoint(address);
    } else if (!endPoint) {
      setEndPoint(address);
    }
  };

  const onResetGame = () => {
    navigate(HOME_PAGE);
  };

  const isStartPoint = (address: Address) =>
    startPoint && startPoint.x === address.x && startPoint.y === address.y;

  const isEndPoint = (address: Address) =>
    endPoint && endPoint.x === address.x && endPoint.y === address.y;

  const leeAlgorithm = () => {
    const queue: Address[] = [startPoint!];
    let shortestPathFound = false;
    let path: number[][] = [];

    while (queue.length > 0) {
      const current = queue.shift()!;
      const { x, y, numbeOfSteps } = current;

      if (isEndPoint(current)) {
        shortestPathFound = true;
        path = constructPath(current);
        break;
      }

      const neighbors = [
        { x: x - 1, y, numbeOfSteps: numbeOfSteps + 1 },
        { x: x + 1, y, numbeOfSteps: numbeOfSteps + 1 },
        { x, y: y - 1, numbeOfSteps: numbeOfSteps + 1 },
        { x, y: y + 1, numbeOfSteps: numbeOfSteps + 1 },
      ];

      for (const neighbor of neighbors) {
        const { x: nx, y: ny, numbeOfSteps: nSteps } = neighbor;

        if (
          nx >= 0 &&
          nx < matrix[0].length &&
          ny >= 0 &&
          ny < matrix.length &&
          matrix[ny][nx] === 0
        ) {
          matrix[ny][nx] = nSteps;

          setPaperAddresses((prevAddresses) =>
            prevAddresses.map((address) =>
              address.x === nx && address.y === ny
                ? { ...address, numbeOfSteps: nSteps }
                : address
            )
          );

          queue.push(neighbor);
        }
      }
    }
    if (shortestPathFound) {
      setShortestPath(path);
    }
  };

  const constructPath = (endPoint: Address): number[][] => {
    const path: number[][] = [];
    let current = endPoint;

    while (current) {
      path.unshift([current.x, current.y]);
      const { x, y, numbeOfSteps } = current;

      const neighbors = [
        { x: x - 1, y, numbeOfSteps: numbeOfSteps - 1 },
        { x: x + 1, y, numbeOfSteps: numbeOfSteps - 1 },
        { x, y: y - 1, numbeOfSteps: numbeOfSteps - 1 },
        { x, y: y + 1, numbeOfSteps: numbeOfSteps - 1 },
      ];

      current =
        (neighbors.find(
          (neighbor) =>
            neighbor.numbeOfSteps === numbeOfSteps - 1 &&
            matrix[neighbor.y] &&
            matrix[neighbor.y][neighbor.x] === numbeOfSteps - 1
        ) as Address) || null;
    }

    return path;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container {...containerStyles}>
        {matrix.map((row, rowIndex) => (
          <Box key={rowIndex} {...boxStyles}>
            {row.map((col, colIndex) => {
              const address =
                paperAddresses[rowIndex * matrix[0].length + colIndex];
              const isStart = isStartPoint(address);
              const isEnd = isEndPoint(address);
              const isShortestPath = shortestPath.some(
                (coord) => coord[0] === address.x && coord[1] === address.y
              );

              return (
                <Paper
                  key={colIndex}
                  style={{
                    backgroundColor: isStart
                      ? "green"
                      : isEnd
                      ? "red"
                      : isShortestPath
                      ? "blue"
                      : undefined,
                  }}
                  {...paperStyles}
                  onClick={() => handlePaperClick(address)}
                >
                  {isStart || isEnd
                    ? null
                    : address.numbeOfSteps === 0
                    ? null
                    : address.numbeOfSteps}
                </Paper>
              );
            })}
          </Box>
        ))}
        <Box>
          <Button variant="text" onClick={onResetGame}>
            Reset
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LaberintPage;
