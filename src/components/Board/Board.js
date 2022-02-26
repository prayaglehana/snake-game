import React, { useEffect, useState, useRef } from "react";
import "./Board.css";
import { randomIntFromInterval, useInterval } from "../utils/utils.js";

const BOARD_SIZE = 10;
const INTERVAL = 200;

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(value) {
    const node = new Node(value);
    this.head = node;
    this.tail = node;
  }

  push_front(val) {
    const node = new Node(val);
    this.head.next = node;
    this.head = node;
  }

  pop_back() {
    if (this.tail.next != null) {
      this.tail = this.tail.next;
    }
  }

  push_back() {
    if (this.tail.next != null) {
      const node = new Node();
      this.tail = this.tail.next;
    }
  }
}

const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

const Board = () => {
  const [board, setBoard] = useState(() => createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [foodCell, setFoodCell] = useState(23);

  const [direction, setDirection] = useState("RIGHT");
  const [snake, setSnake] = useState(new SinglyLinkedList(44));

  const moveSnake = (newValue) => {};

  const handleFoodConsumption = () => {};

  const updateSnake = () => {
    const newValue = getNewValueFromDir(direction, snake.head.value);

    let status = new Set(snakeCells);

    snake.push_front(newValue);
    status.add(newValue);

    //if consuming foood
    if (foodCell == newValue) {
      setFoodCell(randomIntFromInterval(1, BOARD_SIZE * BOARD_SIZE));
    } else {
      status.delete(snake.tail.value);
      snake.pop_back();
    }

    setSnakeCells(status);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeyDown(e.key);
    });
  }, []);

  useInterval(() => updateSnake(), INTERVAL);

  const handleKeyDown = (keyValue) => {
    setDirection((direction) => {
      const newDirection = getDirectionFromKey(keyValue);
      const isValidDir =
        newDirection == null
          ? false
          : newDirection == getOppositeDirection(direction)
          ? false
          : true;

      if (isValidDir) {
        setDirection(newDirection);
      } else {
        setDirection(direction);
      }
    });
  };

  return (
    <div className="board">
      {/* {console.log("Rerendering ... "} */}
      {board.map((row, rowIndx) => (
        <div key={rowIndx} className="row">
          {row.map((cell, cellIdx) => {
            let class_name = getClassName(
              cell,
              snake.head.value,
              snakeCells,
              foodCell
            );
            return (
              <div key={cellIdx} className={class_name}>
                {/* {cell} */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const createBoard = (BOARD_SIZE) => {
  let counter = 1;
  const board = [];

  for (let row = 0; row < BOARD_SIZE; ++row) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; ++col) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

const getDirectionFromKey = (keyVal) => {
  if (keyVal === "ArrowRight") return Direction.RIGHT;
  if (keyVal === "ArrowDown") return Direction.DOWN;
  if (keyVal === "ArrowLeft") return Direction.LEFT;
  if (keyVal === "ArrowUp") return Direction.UP;
  return null;
};

const getOppositeDirection = (dir) => {
  if (dir === Direction.RIGHT) return Direction.LEFT;
  if (dir === Direction.DOWN) return Direction.UP;
  if (dir === Direction.LEFT) return Direction.RIGHT;
  if (dir === Direction.UP) return Direction.DOWN;
};

const convertToCoordinates = (value) => {
  let x = value % BOARD_SIZE;
  let y = value / BOARD_SIZE;
  return { x, y };
};

const getNewValueFromDir = (dir, val) => {
  if (dir === Direction.RIGHT) {
    if (val % BOARD_SIZE == 0) {
      return val - BOARD_SIZE + 1;
    }
    return val + 1;
  }
  if (dir === Direction.DOWN) {
    if (val + BOARD_SIZE > BOARD_SIZE * BOARD_SIZE) {
      return val % BOARD_SIZE;
    }
    return val + BOARD_SIZE;
  }
  if (dir === Direction.LEFT) {
    if ((val - 1) % BOARD_SIZE == 0) return val + BOARD_SIZE - 1;
    return val - 1;
  }
  if (dir === Direction.UP) {
    if (val - BOARD_SIZE <= 0) {
      return BOARD_SIZE * BOARD_SIZE - BOARD_SIZE + val;
    }
    return val - BOARD_SIZE;
  }
};
const getClassName = (cell, snakeHead, snakeCells, foodCell) => {
  if (snakeHead == cell) {
    return "cell snake-head";
  }
  if (snakeCells.has(cell)) {
    return "cell snake-cell";
  }
  if (foodCell == cell) {
    return "cell food-cell";
  }
  return "cell";
};
export default Board;
