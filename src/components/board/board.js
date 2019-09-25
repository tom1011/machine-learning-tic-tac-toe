import React, { Component } from 'react';
import './board.css'

class board extends Component {
    constructor() {
        super();
        this.state = {
            selfplay: false,
            winner: undefined,
            autoPlay: false,
            gameState: {
                turn: 'X',
                gameLocked: false,
                gameEnded: false,
                board: Array(9).fill(''),
                totalMoves: 0
            }
        };

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
            if (this.state.autoPlay){
                console.log('in autoplay if statment')
                this.gameReset()
            }
        } else if (result === 'O') {
            this.state.gameState.gameEnded = true;
            this.setState({
                winner: 'O',
                winnerLine: 'Match won by O'
            });
            if (this.state.autoPlay){
                this.gameReset()
            }
        } else if (result === 'draw') {
            this.state.gameState.gameEnded = true;
            this.setState({
                winner: 'draw',
                winnerLine: 'Match is drawn'
            })
            if (this.state.autoPlay){
                this.gameReset()
            }
        }

        // random AI 
        if (this.state.gameState.turn === 'O' && this.props.player2 === 'Random AI' && !this.state.gameState.gameEnded) {
            this.state.gameState.gameLocked = true;
            setTimeout(() => {
                do {
                    var random = Math.floor(Math.random() * 9);
                } while (this.state.gameState.board[random] !== '');
                this.state.gameState.gameLocked = false;
                this.clicked(document.querySelectorAll('.square')[random]);
            }, 1000);

        }
        if (this.state.gameState.turn === 'X' && this.props.player1 === 'Random AI' && !this.state.gameState.gameEnded) {
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
        setTimeout(() => {
        this.setState({
            winner: undefined,
            winnerLine: '',
            autoPlay: this.state.autoPlay,
            gameState: {
                turn: 'X',
                gameLocked: false,
                gameEnded: false,
                board: Array(9).fill(''),
                totalMoves: 0
            }
        })
        if (this.state.autoPlay){
            var random = Math.floor(Math.random() * 9);
            this.clicked(document.querySelectorAll('.square')[random])
        }
    }, 500)
    }

    changeAutoPlayer = () => {
        this.setState({ autoPlay: !this.state.autoPlay })
        console.log('autoplayer change', this.state)
        this.checkstate()
    }

    checkstate = () => {
        console.log('in checkstate function')
        if (this.state.autoPlay && this.props.player1 !== 'Human' && this.props.player2 !== 'Human'){
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


    render() {
        let displaytext = ''
        if (this.state.autoPlay && this.props.player1 === 'Human' || this.props.player2 === 'Human') {
            displaytext = 'Please chose two AI for Autoplay'
        }

        return (
            <div>
                <div> Autoplay:
          <select autoPlay={this.state.autoPlay} onChange={this.changeAutoPlayer}>
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>
                {displaytext}
                <div id='status'>{this.state.winnerLine}</div>
                <div id='board' onClick={(e) => this.clicked(e.target)}>
                    <div className='square' data-square='0'>{this.state.gameState.board[0]}</div>
                    <div className="square" data-square="1">{this.state.gameState.board[1]}</div>
                    <div className="square" data-square="2">{this.state.gameState.board[2]}</div>
                    <div className="square" data-square="3">{this.state.gameState.board[3]}</div>
                    <div className="square" data-square="4">{this.state.gameState.board[4]}</div>
                    <div className="square" data-square="5">{this.state.gameState.board[5]}</div>
                    <div className="square" data-square="6">{this.state.gameState.board[6]}</div>
                    <div className="square" data-square="7">{this.state.gameState.board[7]}</div>
                    <div className="square" data-square="8">{this.state.gameState.board[8]}</div>
                </div>
                <button onClick={this.gameReset.bind(this)}>Reset Game</button>
            </div>
        );
    }
}

export default board;