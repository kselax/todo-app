const { graphql } = require('graphql')

const s = require('../schema/todo')



module.exports = function(socket) {
  const allTodosPag = query => {
    graphql(s.schema, query, s.root)
      .then(res => {
        socket.emit('allTodosPag', res.data.allTodosPag)
      })
      .catch(err => console.log(err))
  }
  socket.on('allTodosPag', allTodosPag)

  const addTodo = query => {
    graphql(s.schema, query, s.root)
      .then(res => {
        socket.emit('addTodoR', res.data.addTodo)
      })
      .catch(err => console.log(err))
  };
  socket.on('addTodo', addTodo)

  const toggleTodo = query => {
    graphql(s.schema, query, s.root)
      .then(res => {
        console.log('res = ', res);
      })
      .catch(err => console.log(err))
  }
  socket.on('toggleTodo', toggleTodo)

  const delTodo = query => {
    graphql(s.schema, query, s.root)
      .then(res => {
        console.log('res = ', res);
      })
      .catch(err => console.log(err))
  }
  socket.on('delTodo', delTodo)
}