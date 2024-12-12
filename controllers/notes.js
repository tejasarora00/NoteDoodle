const Note = require("../Models/note.js");

module.exports.index = async (req, res) => {
    const allNotes = await Note.find({});
    res.render("./notes/index.ejs", { allNotes });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./notes/new.ejs");
};

module.exports.createNote = async (req, res) => {
    const newNote = new Note(req.body.note);
    newNote.owner = req.user._id;
    await newNote.save();
    req.flash("success", "New Note Created");
    res.redirect("/notes");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        req.flash("error", "Note you are trying to access does not exists!");
        return res.redirect("/notes");
    }
    res.render("./notes/edit.ejs", { note });
};

module.exports.updateNote = async (req, res) => {
    let { id } = req.params;
    let note = await Note.findById(id);
    await Note.findByIdAndUpdate(id, { ...req.body.note });
    req.flash("success", "Note Edited Successfully");
    res.redirect("/notes");
};

module.exports.deleteNote = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Note.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Note Deleted!");
    res.redirect("/notes");
};