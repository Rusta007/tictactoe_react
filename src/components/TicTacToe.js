// Import React and useState hook from React
import React, { useState } from "react";
import "./TicTacToe.css";

// Define TictacToe Component
const TictacToe = () => {
  // Set initial state values using useState hook
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);

  // Function to check for a winner given the current state of the board
  const checkForWinner = (squares) => {

    // Define possible winning combinations
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };


    // Loop through each possible combination to check if any player has won
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          // If any square is blank, don't check this combo
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
            // If all squares in combo are the same, set winner
          setWinner(squares[pattern[0]]);
        }
      });
    }

    // If there are no blank squares left and no winner, set game to draw
    if (!squares.includes("")) {
      console.log("All cells are filled");
      setDraw(true);
    }
  };

  
  // Function to handle clicking a cell
  const handleOnClick = (num) => {
    // If cell has already been clicked, show alert and do nothing
    if (cells[num] !== "") {
      alert("Already Clicked: " + num);
      return;
    }

    //  Create copy of current state and update with new move
    let squares = [...cells];

    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "0";
      setTurn("X");
    }

    // Check if new move resulted in a win or draw
    checkForWinner(squares);
    setCells(squares);
  };

  // Function to handle restarting the game
  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  // Define Cell component
  const Cell = ({ num }) => {
    return <td style={{backgroundColor:"white"}} onClick={() => handleOnClick(num)}>{cells[num]}</td>;
  };


  // Render game board and messages based on current game state
  return (
    <div className="container">
      
    <h1><marquee>Tic-Tac-Toe</marquee></h1>
    <hr />
      <table>
        <h3>Turn: {turn}</h3>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <h2>Player {winner} is the Winner</h2>
          <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
      {draw && (
        <>
          <h3>This match is a draw!</h3>
          <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default TictacToe;
