
const http = require('http');
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


const Note = require('./models/note');

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

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id;
  Note.findById(id).then(note => {
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  })
  .catch(error => {
    next(error)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important
  }
  Note.findByIdAndUpdate(request.params.id, note, {new: true})
  .then(updatedNote => {
    response.json(updatedNote)
  })
  .catch(error => next(error))
})





const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})