
const mongoose = require('mongoose');
const db = async () => {
    await mongoose.connect("mongodb+srv://dhrutip2005:123@cluster0.i1jhatc.mongodb.net/blogs");
    console.log("database connected.");
}

module.exports = db;
