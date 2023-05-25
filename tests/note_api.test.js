const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/Note');
const helper = require('./test_helper');


beforeEach(async () => {
    await Note.deleteMany({})

    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()

    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/note')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/note')
    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/note')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain("Browser can only execute JavaScript")

})

test('a valid note can be added', async () => {
    const newNote = {
        title: 'async/await simplifies making async calls',
        description: 'This description required to be 10 chars long.'
    }
    await api
            .post('/api/note')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    
    const contents = notesAtEnd.map(r => r.title)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test('note will not be saved to database if containing empty field', async () => {
    const newNote = {
        title: '',
        description: 'This description is awesome!'
    }

    await api
            .post('/api/note')
            .send(newNote)
            .expect(400)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('A specific note can be retrieved', async () => {
    const queryNotes = helper.notesInDb()

    const oneNote = queryNotes[0];

    const response = await api
            .get(`/api/note/${oneNote.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    expect(response.body).toEqual(oneNote)
})

afterAll(async () => {
    await mongoose.connection.close()
})