const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
// Creating our schema
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    description:{
        type: String,
        required: true,
        minLength: 10
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, versionKey: false, id: false })

// Setting virtual properties
noteSchema.virtual("url").get(function(){
    return `/api/note/${this._id}`
})

noteSchema.virtual("id").get(function(){
    return this._id.toHexString();
})

noteSchema.path('title').get(function(n) {
    return n + ' is my the title'
})


// Redefining our toJSON schema method by using transform for alteration.
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const noteModel = mongoose.model("Note", noteSchema);
const note = new noteModel({title: 'testingsetter123', description:'lmao just testing getter functions'})

console.log(note.toJSON())

console.log(note)

console.log(note.title)




module.exports = mongoose.model("Note", noteSchema);