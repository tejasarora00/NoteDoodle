const express = require("express");
const router = express.Router();
const Note = require("../Models/note.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");

const notesController = require("../controllers/notes.js");

router.route("/")
    .get(wrapAsync(notesController.index))
    .post(wrapAsync(notesController.createNote));

router.route("/:id")
    .put(wrapAsync(notesController.updateNote))
    .delete(isLoggedIn, wrapAsync(notesController.deleteNote));

// New Route
router.get("/new", isLoggedIn, notesController.renderNewForm);

// Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(notesController.renderEditForm));

module.exports = router;