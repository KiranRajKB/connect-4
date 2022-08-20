import './PositionPage.css'

function PositionPage( {states} ) {
    return (
        <div className = "PositionPage centered">
            <div className = "positions" >
                <button className = "button" disabled = {!states.isPosition1Free} onClick = { 
                    () => {
                        states.setPosition(1)
                        states.setIsPosition1Free(false)
                        states.socket.emit("take_position_1", {"room" : states.room})
                    }
                }> Player 1 </button>
                <button className = "button" disabled = {!states.isPosition2Free} onClick = { 
                    () => {
                        states.setPosition(2) 
                        states.setIsPosition2Free(false)
                        states.socket.emit("take_position_2", {"room" : states.room})      
                    }
                }> Player 2 </button>
                <button className = "button" onClick = { () => states.setPosition(3) }> Spectator </button>
            </div>
            <button className = "button" onClick = {() => states.leaveRoom(false) }> Leave Room </button>
        </div>
    )
}

export default PositionPage;