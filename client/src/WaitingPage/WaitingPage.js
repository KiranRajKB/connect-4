import './WaitingPage.css'

function WaitingPage({states}) {
    return (
        <div className='WaitingPage centered'>
            <div className='message'> Waiting for other player </div>
            <button className='leave-room' onClick = {() => states.leaveRoom(false) }> Leave Room </button>
        </div>

    )
}

export default WaitingPage;