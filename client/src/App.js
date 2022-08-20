import { useEffect, useState } from 'react';
import io from "socket.io-client";
import RoomPage from './RoomPage/RoomPage';
import Board from './Board/Board';
import './App.css';
import PositionPage from './PositionPage/PositionPage';
import WaitingPage from './WaitingPage/WaitingPage';

const socket = io.connect("https://nodejs-connect-4.herokuapp.com/");
// const socket = io.connect("http://localhost:3001");

const uniqID = Math.floor(Math.random() * 1000) + 1;


function App() {
    const [room, setRoom] = useState("")
    const [insideRoom, setInsideRoom] = useState(false)
    const [position, setPosition] = useState(0)
    const [isPosition1Free, setIsPosition1Free] = useState(false)
    const [isPosition2Free, setIsPosition2Free] = useState(false)
    // 1 - player 1
    // 2 - player 2
    // 3 - spectator

    const [board, setBoard] = useState(
    [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    )

    function joinRoom() {
        if (room !== "") {
            socket.emit("join_room", {"room" : room, "ID" : uniqID} )
            setInsideRoom(true)
        }
    }

    function leaveRoom(gameOver) {
        socket.emit("leave_room", {"room" : room, "position" : position, "gameOver" : gameOver})
        setRoom("")
        setInsideRoom(false)
        setPosition(0)
        setIsPosition1Free(false)
        setIsPosition2Free(false)
        setBoard(    
        [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
        )
    }

    const states = {
        socket,
        uniqID,
        room,
        setRoom,
        insideRoom,
        setInsideRoom,
        position,
        setPosition,
        isPosition1Free,
        setIsPosition1Free,
        isPosition2Free,
        setIsPosition2Free,
        leaveRoom,
        board,
        setBoard
    }

    useEffect(() => {
        let myString = "receive_message_for_" + uniqID
        socket.on(myString, data => {
            setIsPosition1Free(data.isPosition1Free)
            setIsPosition2Free(data.isPosition2Free)
        })

        socket.on("receive_board", data => {
            setBoard(data.board)
        })

        socket.on("position_1_taken", () => {setIsPosition1Free(false)})
        socket.on("position_2_taken", () => {setIsPosition2Free(false)})

        socket.on("cancel_game", data => {
            console.log("Leaving room....")
            alert(`Game Cancelled! \n Reason : ${data.reason} `)
            leaveRoom(true)
        })

    }, [socket] )


    function checkWin() {
        let directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1]
        ]
        let isFull = true

        for (let row = 0; row <= 5; row++) {
            for (let col = 0; col <= 6; col++) {
                for (let dir = 0; dir <= 3; dir++) {
                    let a = 0, b = 0
                    let curRow = row, curCol = col
                    for (let i = 0; i <= 3; i++) {
                        if (curRow == -1 || curRow == 6 || curCol == -1 || curCol == 7) break;
                        if (board[curRow][curCol] === 1) a++;
                        else if (board[curRow][curCol] === 2) b++;
                        else isFull = false

                        curRow += directions[dir][0]
                        curCol += directions[dir][1]
                    }
                    if (a === 4) return 1
                    if (b == 4) return 2
                }
            }
        }
        return isFull ? 0 : -1
    }

    useEffect(() => {
        let result = checkWin()

        if (result !== -1) {
            let message;
            if (result === 0) message = "Draw"
            else if (result === position) message = "You won!"
            else if (position !== 3) message = "You lost!"
            else message = (result === 1 ? "Blue" : "Red") + " won!"
            setTimeout(() => {
                alert(message)
                leaveRoom(true)
            }, 1000)
        }    
    }, [board])

    if (!insideRoom) {
        return <RoomPage setRoom = {setRoom} joinRoom = {joinRoom} />
    }


    if (position === 0) {
        return <PositionPage states = {states} />
    }

    if (isPosition1Free || isPosition2Free) {
        return <WaitingPage states = {states} />
    }

    // let result = checkWin()

    // if (result !== -1) {
    //     let message;
    //     if (result === 0) message = "Draw"
    //     else if (result === position) message = "You won!"
    //     else if (position !== 3) message = "You lost!"
    //     else message = (result === 1 ? "Blue" : "Red") + " won!"
    //     setTimeout(() => {
    //         alert(message)
    //         leaveRoom(true)
    //     }, 1000)
    // }    

    return <Board states = {states} />
  
}

export default App;


// function App() {
//     const [games, setGames] = useState([])
//     const [gameIdText, setGameIdText] = useState("")
//     const [currentGame, setCurrentGame] = useState(-1)

//     function createNewGame() {
//         setCurrentGame(games.length)
//         let ob = new Board()
//         setGames(
//             oldGames => [...oldGames, ob]
//         )
//         ob.play()
//     }

//     function joinGame() {
//         if (gameIdText < games.length) {
//             setCurrentGame(gameIdText)
//         }
//     }

//     if (currentGame !== -1)
//         return games[currentGame]
//   return (
//     <div className="App">
//         <button onClick={createNewGame}> New Game </button>
//         <label for="gameId">Game ID : </label>
//         <input type="position" id="gameId" onChange={
//             (e) => {
//                 e.preventDefault()
//                 setGameIdText(e.target.value)
//             }
//         }/>
//         <button onClick={joinGame} > Join Game </button>
//     </div>
//   );
// }

// export default App;
