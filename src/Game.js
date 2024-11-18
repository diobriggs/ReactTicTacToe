import React, { useState } from "react";
import GameGrid from "./GameGrid.js";

// Function to check if there's a winner
function checkWinner(moves) {
  const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      return moves[a]; // Return the winner ('X' or 'O')
    }
  }

  return null; // No winner
}

// Function to check if the game is a draw
function checkDraw(moves) {
  return moves.every((move) => move !== ""); // If all squares are filled
}

function Game() {
  const [moves, setMoves] = useState(new Array(9).fill("")); // Track moves
  const [turn, setTurn] = useState("X"); // Track current turn
  const [gameOver, setGameOver] = useState(false); // Track game over status
  const [winner, setWinner] = useState(null); // Track the winner (X or O)

  // Function to handle grid click
  function gridClick(whichSquare) {
    if (gameOver || moves[whichSquare] !== "") {
      return; // If the game is over or the square is already filled, do nothing
    }

    // Create a copy of the current moves array
    const movesCopy = [...moves];
    // Set the current move to the player's turn
    movesCopy[whichSquare] = turn;
    // Update the moves state
    setMoves(movesCopy);

    // Check if there's a winner
    const winner = checkWinner(movesCopy);
    if (winner) {
      setWinner(winner);
      setGameOver(true); // End the game if there's a winner
      return;
    }

    // Check if the game is a draw
    if (checkDraw(movesCopy)) {
      setGameOver(true); // End the game if it's a draw
      return;
    }

    // Alternate the turn after the move
    setTurn(turn === "X" ? "O" : "X");
  }

  // Function to reset the game
  function newGame() {
    setMoves(new Array(9).fill("")); // Reset the moves to empty
    setTurn("X"); // Reset the turn to "X"
    setGameOver(false); // Reset game over status
    setWinner(null); // Reset the winner
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <GameGrid moves={moves} click={gridClick} />

      {gameOver ? (
        <p>
          {winner ? `${winner} Wins!` : "It's a Draw!"}
        </p>
      ) : (
        <p>
          Turn: <strong className={turn}>{turn}</strong>
        </p>
      )}

      <p>
        <button onClick={newGame}>New Game</button>
      </p>
    </>
  );
}

export default Game;