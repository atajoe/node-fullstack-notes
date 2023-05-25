const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const noteController = require('../controllers/noteController');

/* GET home page. */
router.get('/', noteController.index);

/* Create a new note */
router.post('/', noteController.create_note_post);

/* GET handler for a note ID */
router.get('/:id', noteController.noteId_get);

/*UPDATE handler for a note ID */
router.put('/:id', noteController.noteId_update);

/* DELETE handler for a note ID */
router.delete('/:id', noteController.noteId_delete);

/** SECRET ROUTE TO DELETE ALL NOTES IN THE DATABASE **/
router.get('/deleteall', (req,res,next) => {
  Note.deleteMany({})
      .exec()
      .then((res) => console.log(`Notes deleted! Here is the response: ${res}`))
      .catch((err) => console.log(err))

})

module.exports = router;
