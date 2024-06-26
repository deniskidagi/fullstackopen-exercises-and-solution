const http = require('http');
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

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
  if(!body.content){
    return response.status(404).json({
      error: "Content missing"
    })
  }

  const note = {
    content: content.body,
    important: Boolean(body.important) || false,
    id: generateId()
  }
  notes = notes.concat(note)

  response.json(note)
})




app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === id)
  if(note){
    response.json(notes)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  return notes.filter(note => note.id === id)
  response.status(404).end()
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})