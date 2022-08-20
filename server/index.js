require("dotenv").config();

const { response } = require("express")
const cors = require('cors')

const io = require("socket.io")(process.env.PORT || 3001, {
    cors: {
        origin: "*"
    }
})


let position1TakenRooms = new Set()
let position2TakenRooms = new Set()

io.on("connection", socket => {
    socket.on("join_room", data => {
        socket.join(data.room)

        let response = {}
        response.isPosition1Free = !position1TakenRooms.has(data.room)
        response.isPosition2Free = !position2TakenRooms.has(data.room)

        socket.emit("receive_message_for_" + data.ID, response)
    })

    socket.on("leave_room", data => {
        socket.leave(data.room)
        if (data.position === 1 || data.position === 2) {
            if (!data.gameOver) {
                let response = {}
                response.reason = "Player " + data.position + " left"
                socket.to(data.room).emit("cancel_game", response)
            }
      
            position1TakenRooms.delete(data.room)
            position2TakenRooms.delete(data.room)
        }
    })

    socket.on("take_position_1", data => {
        position1TakenRooms.add(data.room)
        socket.to(data.room).emit("position_1_taken") 
    }  )
    socket.on("take_position_2", data => {
        position2TakenRooms.add(data.room)
        socket.to(data.room).emit("position_2_taken") 
    }  )


    socket.on("send_board", data => {
        console.log(data)
        socket.to(data.room).emit("receive_board", {"board" : data.board} )
    })
})

