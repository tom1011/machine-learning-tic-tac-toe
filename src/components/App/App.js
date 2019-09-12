import React, { Component } from 'react';
import './App.css';
import Board from '../board/board';


class App extends Component {

  checkWinner(board) {
    var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    for (let i = 0; i < moves.length; i++) {
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]])
        return board[moves[i][0]];
    }
    if (this.gameState.totalMoves === 9) {
      return 'draw';
    }
  }


  render() {
    return (
      <div id="game">
        <div id="head">
          World's best tic tac toe AI
          </div>
        <Board checkWinner={this.checkWinner}  />
      </div>
    );
  }
}
export default App;
