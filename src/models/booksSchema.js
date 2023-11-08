const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: String, required: false }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;