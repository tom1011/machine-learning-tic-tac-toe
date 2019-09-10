import React, { Component } from 'react';
import Board from '../board/board';
import './App.css'

class App extends Component {
  state = {
    turn: 'O',
  }


  render() {
    return (
      <div className="App">
        <p>tic tac toe machine learing test</p>
        <div className='board'>
          <Board />
        </div>

      </div>
    );
  }
}

export default App;
