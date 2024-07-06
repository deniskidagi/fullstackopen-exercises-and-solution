
const http = require('http');
const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


const Note = require('./models/note')



let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


app.get('/', (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(note => Number(note.id)))
  : 0
  return String(maxId + 1)
}
app.post('/api/notes', (request, response) => {
  const body = request.body
  if(body.content === undefined){
    return response.status(404).json({
      error: "Content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  }) 
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})




app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  Note.findById(id).then(note => response.json(note))
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  return notes.filter(note => note.id === id)
  response.status(404).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})