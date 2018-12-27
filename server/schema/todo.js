const { buildSchema } = require('graphql')

const DB = require('../core/my_db/DB')



const schema = buildSchema(`
  type Todo {
    id: ID!
    content: String!
    completed: Boolean!
  }

  type Query {
    allTodos: String
    allTodosPag(p: String): String
  }

  type Mutation {
    addTodo(content: String!): Todo
    toggleTodo(id: ID!): Boolean
    delTodo(id: ID!): Boolean
  }
`)

class Todo {
  constructor(id, content, completed) {
    this.id = id
    this.content = content
    this.completed = completed
  }
}

const root = {
  allTodos: () => {
    return new Promise((resolve, reject) => {
      DB.pool.query(
        'SELECT * FROM `todos`',
        (err, res) => {
          if (err) reject(err)
          resolve(JSON.stringify(res))
        }
      )
    })
  },

  allTodosPag: ({ p }) => {
    return new Promise((resolve, reject) => {
      // number entries on the page
      const num = 3
      // current page
      p = Number(p)
      const cur_page = p || 1
      // get current number messages in the database
      DB.pool.query(
        'SELECT COUNT(*) FROM `todos`',
        (err, res) => {
          if (err) reject(err)
          const posts = res[0]['COUNT(*)']
          const total = Math.floor(1 + (posts - 1) / num)
          // the beggining of messages for a current page
          let page = cur_page
          if (!page || page < 0) page = 1
          if(page > total) page = total
          // number of the starting output messages
          const start = page * num - num
          console.log('start = ', start, ' num = ', num);
          DB.pool.query(
            'SELECT * FROM `todos` LIMIT ?, ?',
            [start, num],
            (err, res) => {
              if (err) reject(err)
              let result = {}
              // make a navigation links
              result['items'] = res
              result['total'] = total
              resolve(JSON.stringify(result))
            }
          )
        }
      )
    })
  },

  addTodo: ({ content }) => {
    return new Promise((resolve, reject) => {
      DB.pool.query(
        'INSERT INTO `todos` (content) VALUES (?)',
        [content],
        (err, res) => {
          if (err) reject(err)
          const obj = new Todo(res.insertId, content, false)
          resolve(obj)
        }
      )
    })
  },

  toggleTodo: ({ id }) => {
    return new Promise((resolve, reject) => {
      DB.pool.query(
        'SELECT completed FROM `todos` WHERE `id` = ?',
        [id],
        (err, res) => {
          if (err) reject(err)
          DB.pool.query(
            'UPDATE `todos` SET `completed` = ? WHERE `id` = ?',
            [!res[0].completed, id],
            (err, res) => {
              if (err) reject(err)
              resolve(true)
            }
          )
        }
      )
    })
  },

  delTodo: ({ id }) => {
    return new Promise((resolve, reject) => {
      DB.pool.query(
        'DELETE FROM `todos` WHERE `id` = ?',
        [id],
        (err, res) => {
          if (err) reject(err)
          resolve(true)
        }
      )
    })
  }
}

module.exports = { schema, root }