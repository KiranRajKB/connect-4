import './RoomPage.css'

function RoomPage( {setRoom, joinRoom} ) {
    return (
        <div className= "RoomPage centered">
            <input placeholder = "Room No" className = "textBox" onChange={(e) => {
                e.preventDefault()
                setRoom(e.target.value)
            }
            }></input>
            <button className = "joinButton" onClick={() => joinRoom() }> Join </button>
        </div>
    )
}

export default RoomPage;