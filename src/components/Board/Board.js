import React, { useState } from "react";
import "./Board.css";

const BOARD_SIZE = 10;

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
    this.next = null;
  }
}

const Board = () => {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [snake, setSnake] = useState(new SinglyLinkedList(44));

  return (
    <div className="board">
      {board.map((row, rowIndx) => (
        <div key={rowIndx} className="row">
          {row.map((cell, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell ${snakeCells.has(cell) ? "snake-cell" : ""}`}
            >
              {cell}
              {console.log("cell", cell, "cellIDx", cellIdx)}
            </div>
          ))}
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

export default Board;
