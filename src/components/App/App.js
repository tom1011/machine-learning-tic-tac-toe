import React, { Component } from 'react';
import './App.css';
import Board from '../board/board';


class App extends Component {
  constructor() {
    super();
    this.state = {
      player1: 'Human',
      player2: 'Random AI',
      autoPlay: false
    };
  }
  changePlayer1 = (event) => {
    this.setState({player1: event.target.value});
  }
  changePlayer2 = (event) => {
    this.setState({player2: event.target.value});
  }
  

  render() {
    return (
      <div id="game">
        <div id="head">
          World's best tic tac toe AI
          </div>
          <div> select player1: 
          <select player1={this.state.player1} onChange={this.changePlayer1}>
          <option player1="Human">Human</option>
          <option player1="Random AI">Random AI</option>
          <option player1="Learning AI">Learning AI</option>
        </select>
          </div>
          <div> select player2: 
          <select player2={this.state.player2} onChange={this.changePlayer2}>
          <option player2="Random AI">Random AI</option>
          <option player2="Human">Human</option>
          <option player2="Learning AI">Learning AI</option>
        </select>
          </div>
          <div> Autoplay: 
          <select autoPlay={this.state.autoPlay} onChange={this.changePlayer2}>
          <option autoPlay={false}>No</option>
          <option autoPlay={true}>Yes</option>
        </select>
          </div>
          
        <Board player1={this.state.player1} autoPlay={this.state.autoPlay} player2={this.state.player2} />
      </div>
    );
  }
}
export default App;
