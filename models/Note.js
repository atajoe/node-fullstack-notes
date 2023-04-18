require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

// Connect to mongodb database
const DBURI = process.env.MONGODB_URI
console.log("Database_URL", DBURI);
console.log('Connecting to ', DBURI)
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res) => {
          console.log('Successfully connected!')
        })
        .catch((err) => console.log(err))


// Creating our schema
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
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