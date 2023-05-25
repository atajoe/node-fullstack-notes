const Note = require('../models/Note');

const initialNotes = [
    {
        title: 'HTML is easy',
        description: 'HTML is too easy'
    },
    {
        title: 'Browser can only execute JavaScript',
        description: 'What the title just said!'
    }   
]


const nonExistingId = async () => {
    const note = new Note({ title: 'willremovethissoon', description: 'will surely delete this!'})
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {
    initialNotes, nonExistingId, notesInDb
}