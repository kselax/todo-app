const socketTodos = require('./socketTodos')
const { graphql } = require('graphql')

const s = require('../schema/todo')



const init = socket => {
  socket.on('disconnect', message => {
    console.log('disconnect id = ', socket.id);
  })

  graphql(s.schema, '{ allTodosPag(p: "1") }', s.root)
    .then(res => {
      socket.emit('allTodosPag', res.data.allTodosPag)
    })
    .catch(err => console.log(err))
}

module.exports = function(socketio) {
  const io = socketio

  io.on('connection', socket => {
    init(socket)
    socketTodos(socket)
    console.log('connected id = ', socket.id);
  })
}