const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200).json({ "code": 200, "success": true, "resp": "Helo world." })
});

const server  = app.listen(8000, () => console.log('Server Started'))
// creating socket Instance 
const io = require("socket.io")(server);
// wiating for client to connect
io.on('connection', (socket) => {
	console.log("Connection established between Client and socket Server.")
	socket.on('personData', function (personData) {
    console.log(`Client ${personData.name} is connected.`);
  });
  // setting timer for 5 sec and emmiting latest time 
  setInterval(() => {
       socket.emit('timeNotification', new Date())
     }, 5000);
	
})