import React, { Component } from 'react';
import './board.css'

class board extends Component {
    constructor() {
        super();
        this.state = {
            winner: undefined,
        };
        this.state.gameState = {
            turn: 'X',
            gameLocked: false,
            gameEnded: false,
            board: Array(9).fill(''),
            totalMoves: 0
        }
        
    }
    clicked(box) {

        console.log(box)
        if (this.state.gameState.gameEnded || this.state.gameState.gameLocked) return;

        if (this.state.gameState.board[box.dataset.square] === '') {
            this.state.gameState.board[box.dataset.square] = this.state.gameState.turn;
            box.innerText = this.state.gameState.turn;

            if (this.state.gameState.turn === 'X') {
                this.state.gameState = {
                    ...this.state.gameState,
                    turn: 'O',
                }
            }
            else {
                this.state.gameState = {
                    ...this.state.gameState,
                    turn: 'X',
                }
            }


            this.state.gameState.totalMoves++;
        }

        console.log(this.state.gameState.totalMoves);

        var result = this.checkWinner(this.state.gameState.board);

        if (result === 'X') {
            this.state.gameState.gameEnded = true;
            this.state.gameState.gameEnded = true;
            this.setState({
                winner: 'X',
                winnerLine: 'Match won by X'
            });
        } else if (result === 'O') {
            this.state.gameState.gameEnded = true;
            this.setState({
                winner: 'O',
                winnerLine: 'Match won by O'
            });
        } else if (result === 'draw') {
            this.state.gameState.gameEnded = true;
            this.setState({
                winner: 'draw',
                winnerLine: 'Match is drawn'
            })
        }

        if (this.state.gameState.turn === 'O' && !this.state.gameState.gameEnded) {
            this.state.gameState.gameLocked = true;
            setTimeout(() => {
                do {
                    var random = Math.floor(Math.random() * 9);
                } while (this.state.gameState.board[random] !== '');
                this.state.gameState.gameLocked = false;
                this.clicked(document.querySelectorAll('.square')[random]);
            }, 1000);

        }

    }

    checkWinner(board) {
        var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
        for (let i = 0; i < moves.length; i++) {
          if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]])
            return board[moves[i][0]];
        }
        if (this.state.gameState.totalMoves === 9) {
          return 'draw';
        }
      }


    gameReset() {

        this.setState({
            winner: undefined,
            winnerLine: ''
        })

         this.setState(
            this.state.gameState = {
            turn: 'X',
            gameLocked: false,
            gameEnded: false,
            board: Array(9).fill(''),
            totalMoves: 0
        })

        this.props.reset()

    }


    render() {
        return (
            <div>
                <div id="status">{this.state.winnerLine}</div>
                <div id="board" onClick={(e) => this.clicked(e.target)}>
                    <div className="square" data-square="0"></div>
                    <div className="square" data-square="1"></div>
                    <div className="square" data-square="2"></div>
                    <div className="square" data-square="3"></div>
                    <div className="square" data-square="4"></div>
                    <div className="square" data-square="5"></div>
                    <div className="square" data-square="6"></div>
                    <div className="square" data-square="7"></div>
                    <div className="square" data-square="8"></div>
                </div>
                <button onClick={this.gameReset.bind(this)}>Reset Game</button>
            </div>
        );
    }
}

export default board;