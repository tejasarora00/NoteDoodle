const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;