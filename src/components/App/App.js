import React, { Component } from 'react';
import './App.css';
import Board from '../board/board';


class App extends Component {


  render() {
    return (
      <div id="game">
        <div id="head">
          World's best tic tac toe AI
          </div>
        <Board checkWinner={this.checkWinner}  reset={this.reset} />
      </div>
    );
  }
}
export default App;
