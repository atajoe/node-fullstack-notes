const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
/* GET home page. */
router.get('/', (req,res,next) => {
    Note.find()
        .exec()
        .then((result) => res.json(result))
        .catch((err) => console.log(err))
});

router.post('/', (req,res,next) => {
  console.log('POST request made')
  console.log('Here is the request body', req.body)
  if ( req.body.title === (undefined)|| req.body.description === (undefined) ){
    return res.status(400).json({ error: 'content missing'})
  }
  const newNote = new Note({
    title: req.body.title,
    description: req.body.description
  })
  newNote.save()
         .then((result) => {
          console.log('Here is the response from the backend', result)
          res.send(result)
         })
         .catch((err) => res.status(400).json(err.message))
})

router.get('/deleteall', (req,res,next) => {
  Note.deleteMany({})
      .exec()
      .then((res) => console.log(`Notes deleted! Here is the response: ${res}`))
      .catch((err) => console.log(err))

})

router.get('/:id', (req,res,next) => {
  console.log('GET request made for note with id: ', req.params.id)
  Note.findById(req.params.id)
      .then(result => result ? res.json(result) : res.status(404).send('Does not exist!'))
      .catch(err => next(err))

})

router.delete('/:id', (req,res,next) => {
  const { id } = req.params
  console.log('here is the req params', id)
  Note.findByIdAndRemove(id)
        .then(result => {
          Note.findById(id)
              .then(result => result ? res.status(404).json({ error: 'Document not deleted! Still exists in DB! '}) : res.status(200).json({ message: 'Successfully deleted!' }))
              .catch((err) => console.log(`Error from note findby id in router.delete handler, here is the error: ${err}`))
        })
        .catch((err) => console.log(`Error from router delete handler parent. Here is the error: ${err}`))
})



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
router.use(errorHandler)


module.exports = router;
