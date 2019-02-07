import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from "axios";

// function Square(props) {
//     return (
//       <button className="square" onClick={props.onClick}>
//         {props.value}
//       </button>
//     );
//   }
  
//   class Board extends React.Component {
//     renderSquare(i) {
//       return (
//         <Square 
//             value={this.props.squares[i]}
//             onClick={() => this.props.onClick(i)}
//         />
//       );
//     }
  
//     render() {
//       return (
//         <div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }
  
//   class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           history: [{
//             squares: Array(9).fill(null),
//           }],
//           stepNumber: 0,
//           xIsNext: true,
//         };
//       }

//     handleClick(i) {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             history: history.concat([{
//                 squares: squares,
//               }]),
//             stepNumber: history.length,
//             xIsNext: !this.state.xIsNext,
//         });
//     }

//     jumpTo(step) {
//         this.setState({
//           stepNumber: step,
//           xIsNext: (step % 2) === 0,
//         });
//     }
    
//     render() {
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(current.squares);

//         const moves = history.map((step, move) => {
//             const desc = move ?
//               'Go to move #' + move :
//               'Go to game start';
//             return (
//                 <li key={move}>
//                 <button onClick={() => this.jumpTo(move)}>{desc}</button>
//               </li>
//             );
//           });

//         let status;
//         if (winner) {
//         status = 'Winner: ' + winner;
//         } else {
//         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//         }
//       return (
//         <div className="game">
//           <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)}
//           />
//           </div>
//           <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//           </div>
//         </div>
//       );
//     }
//   }
  
//   // ========================================
  
//   ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
//   );
  
//   function calculateWinner(squares) {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a];
//       }
//     }
//     return null;
//   }

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            firstname:'',
            lastname:'',
            username: '',
            password: '',
            bodyFormData: ''
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        // const value = target.type === 'text' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: target.value
        });
        // console.log(name);
        // console.log(target.value);
    }
  
    handleSubmit(event) {
        event.preventDefault();
        const bodyFormData = new FormData(event.target);
        bodyFormData.set('username', this.state.username);
        console.log(this.state.username);
        // var url = 'http://localhost:8080/api/register?firstname='+this.state.username
        // this.setState({bodyFormData: bodyFormData});
        var form_value_url = 'http://localhost:8080/api/register?firstname='+this.state.firstname+'&lastname='+this.state.lastname+'&username='+this.state.username+'&password='+this.state.password;
    axios({
        method: 'get',
        url: form_value_url,
        // data: bodyFormData,
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        crossdomain: true
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
        // fetch('https://localhost:8080/api/register?firstname=lulu&lastname=mallu&username=lulumallu@gmail.com&password=lululala', {
        //     method: 'GET',
        //     mode: "cors", // no-cors, cors, *same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "same-origin", // include, *same-origin, omit
        //     headers: {
        //         "Content-Type": "application/json",
        //         // "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //   });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">First Name:</label>
            <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} />
            <br></br>
            <label htmlFor="lastname">Last Name:</label>
            <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} />
            <br></br>
            <label htmlFor="username">Username:</label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
            <br></br>
          <input type="submit" value="Register" />
        </form>

      );
    }
  }

    ReactDOM.render(
        <NameForm />,
        document.getElementById('root')
    );