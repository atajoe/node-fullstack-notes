const Note = require("../models/Note");

exports.index = async (req,res) => {
  try{
    const notes = await Note.find({});
    res.json(notes)
  }
  catch (err) {
    console.error(err)
  }
}

exports.create_note_post = async (req,res,next) => {
    console.log('POST request made')
    console.log('Here is the request body', req.body)
    try {
      const newNote = new Note({
        title: req.body.title,
        description: req.body.description
      })
      const response = await newNote.save();
      console.log('Here is the response from backend ', response)
      res.status(201).send(response)
    }
    catch (error){
      next(error)
    }
}

exports.noteId_get = async (req,res,next) => {
    console.log('GET request made for note with id: ', req.params.id)
    try {
      const findNote = await Note.findById(req.params.id) 
      res.json(findNote) 
     

    }
    catch (err) {
      next(err)
    }
}

exports.noteId_update = (req,res,next) => {
    const { title, description } = req.body;
    Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true, context: 'query' }
      )
      .then(updatedNote => {
        res.json(updatedNote)
      })
      .catch(err => next(err))
}

exports.noteId_delete = (req,res,next) => {
    const { id } = req.params
    console.log('here is the req params', id)
    Note.findByIdAndRemove(id)
          .then(result => {
            res.status(200).json({ message: 'Successfully deleted!' })
          })
          .catch((err) => console.log(`Error from router delete handler parent. Here is the error: ${err}`))
  }

