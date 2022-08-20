import './Board.css'

function Board({states}) {
    const cellTypes = [
        "empty",
        "blue",
        "red"
    ]


    function isAllowedToChangeCell() {
        if (states.position === undefined || states.position === 3)
            return false
        let count = 0
        for (let i = 0; i <= 5; i++)
            for (let j = 0; j <= 6; j++)
                if (states.board[i][j] !== 0)
                    count++
        if (count % 2 !== states.position % 2) return true
        return false
    }

    function changeCell(row, col) {        
        states.setBoard(
            oldBoard => {
                let newBoard = [...oldBoard]
                newBoard[row][col] = states.position
                states.socket.emit("send_board", {"board" : states.board, "room" : states.room})
                return newBoard
            }
        )
    }

    function handleClick(row, col) {
        if (!isAllowedToChangeCell()) return
        row = -1;
        while (row + 1 <= 5 && states.board[row + 1][col] === 0) {
            row++
        }
        if (row !== -1) {
            changeCell(row, col)
        }
    }

    console.log(states.board)

    return (
        <div className='Page'>
            <div className='left-content'>
                <div className='header'>
                    <div className='room'> Room : {states.room} </div>
                    <div className='position'> You are {states.position !== 3 ? "Player " + states.position : "a spectator"} </div>
                </div>
                <button className='leave-room' onClick = {() => states.leaveRoom(false) }> Leave Room </button>
            </div>

          
            <div className="Board">
                    <div className="board-row">
                        <div className={cellTypes[states.board[0][0]]} onClick= {() => {handleClick(0, 0)}}></div>
                        <div className={cellTypes[states.board[0][1]]} onClick= {() => {handleClick(0, 1)}}></div>
                        <div className={cellTypes[states.board[0][2]]} onClick= {() => {handleClick(0, 2)}}></div>
                        <div className={cellTypes[states.board[0][3]]} onClick= {() => {handleClick(0, 3)}}></div>
                        <div className={cellTypes[states.board[0][4]]} onClick= {() => {handleClick(0, 4)}}></div>
                        <div className={cellTypes[states.board[0][5]]} onClick= {() => {handleClick(0, 5)}}></div>
                        <div className={cellTypes[states.board[0][6]]} onClick= {() => {handleClick(0, 6)}}></div>
                    </div>
                    <div className="board-row">
                        <div className={cellTypes[states.board[1][0]]} onClick= {() => {handleClick(1, 0)}}></div>
                        <div className={cellTypes[states.board[1][1]]} onClick= {() => {handleClick(1, 1)}}></div>
                        <div className={cellTypes[states.board[1][2]]} onClick= {() => {handleClick(1, 2)}}></div>
                        <div className={cellTypes[states.board[1][3]]} onClick= {() => {handleClick(1, 3)}}></div>
                        <div className={cellTypes[states.board[1][4]]} onClick= {() => {handleClick(1, 4)}}></div>
                        <div className={cellTypes[states.board[1][5]]} onClick= {() => {handleClick(1, 5)}}></div>
                        <div className={cellTypes[states.board[1][6]]} onClick= {() => {handleClick(1, 6)}}></div>
                    </div>
                    <div className="board-row">
                        <div className={cellTypes[states.board[2][0]]} onClick= {() => {handleClick(2, 0)}}></div>
                        <div className={cellTypes[states.board[2][1]]} onClick= {() => {handleClick(2, 1)}}></div>
                        <div className={cellTypes[states.board[2][2]]} onClick= {() => {handleClick(2, 2)}}></div>
                        <div className={cellTypes[states.board[2][3]]} onClick= {() => {handleClick(2, 3)}}></div>
                        <div className={cellTypes[states.board[2][4]]} onClick= {() => {handleClick(2, 4)}}></div>
                        <div className={cellTypes[states.board[2][5]]} onClick= {() => {handleClick(2, 5)}}></div>
                        <div className={cellTypes[states.board[2][6]]} onClick= {() => {handleClick(2, 6)}}></div>
                    </div>
                    <div className="board-row">
                        <div className={cellTypes[states.board[3][0]]} onClick= {() => {handleClick(3, 0)}}></div>
                        <div className={cellTypes[states.board[3][1]]} onClick= {() => {handleClick(3, 1)}}></div>
                        <div className={cellTypes[states.board[3][2]]} onClick= {() => {handleClick(3, 2)}}></div>
                        <div className={cellTypes[states.board[3][3]]} onClick= {() => {handleClick(3, 3)}}></div>
                        <div className={cellTypes[states.board[3][4]]} onClick= {() => {handleClick(3, 4)}}></div>
                        <div className={cellTypes[states.board[3][5]]} onClick= {() => {handleClick(3, 5)}}></div>
                        <div className={cellTypes[states.board[3][6]]} onClick= {() => {handleClick(3, 6)}}></div>
                    </div>
                    <div className="board-row">
                        <div className={cellTypes[states.board[4][0]]} onClick= {() => {handleClick(4, 0)}}></div>
                        <div className={cellTypes[states.board[4][1]]} onClick= {() => {handleClick(4, 1)}}></div>
                        <div className={cellTypes[states.board[4][2]]} onClick= {() => {handleClick(4, 2)}}></div>
                        <div className={cellTypes[states.board[4][3]]} onClick= {() => {handleClick(4, 3)}}></div>
                        <div className={cellTypes[states.board[4][4]]} onClick= {() => {handleClick(4, 4)}}></div>
                        <div className={cellTypes[states.board[4][5]]} onClick= {() => {handleClick(4, 5)}}></div>
                        <div className={cellTypes[states.board[4][6]]} onClick= {() => {handleClick(4, 6)}}></div>
                    </div>
                    <div className="board-row">
                        <div className={cellTypes[states.board[5][0]]} onClick= {() => {handleClick(5, 0)}}></div>
                        <div className={cellTypes[states.board[5][1]]} onClick= {() => {handleClick(5, 1)}}></div>
                        <div className={cellTypes[states.board[5][2]]} onClick= {() => {handleClick(5, 2)}}></div>
                        <div className={cellTypes[states.board[5][3]]} onClick= {() => {handleClick(5, 3)}}></div>
                        <div className={cellTypes[states.board[5][4]]} onClick= {() => {handleClick(5, 4)}}></div>
                        <div className={cellTypes[states.board[5][5]]} onClick= {() => {handleClick(5, 5)}}></div>
                        <div className={cellTypes[states.board[5][6]]} onClick= {() => {handleClick(5, 6)}}></div>
                    </div>
                </div>
        </div>
    );
}

export default Board;