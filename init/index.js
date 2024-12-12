const mongoose = require("mongoose");
const initData = require("./data.js");
const Note = require("../Models/note.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/NoteDoodle";

main().then(() => {
    console.log("connected to DB");
}).catch((error) => {
    console.log(error);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Note.deleteMany({});
    await Note.insertMany(initData.data);
    console.log("Data Initialized");
}

initDB();