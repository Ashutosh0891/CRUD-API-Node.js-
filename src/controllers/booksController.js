const Book = require("../models/booksSchema");

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, message: "Books List", books: books });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

exports.getBookById = async (req, res, next) => {
    try {
        let bookId = req.params.id;
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "No book found" })
        }
        res.status(200).json({ success: true, book: book });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}
exports.addBook = async (req, res, next) => {
    try {
        let title = req.body.title;
        let author = req.body.author;
        let summary = req.body.summary;
        let price = req.body.price;

        let book = new Book({
            title: title,
            author: author,
            summary: summary,
            price: price
        })
        await book.save();
        res.status(201).json({ success: true, message: "Book Created Successfully", book: book });


    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}
exports.updateBook = async (req, res, next) => {
    try {
        let newTitle = req.body.title;
        let newAuthor = req.body.author;
        let newSummary = req.body.summary;
        let newPrice = req.body.price;

        let bookId = req.params.id;
        let book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "no book found" })
        }

        let newBook = {}
        if (newTitle) {
            newBook.title = newTitle;
        }
        if (newAuthor) {
            newBook.author = newAuthor;
        }
        if (newSummary) {
            newBook.summary = newSummary;
        }
        if (newPrice) {
            newBook.price = newPrice;
        }
        let updatedBook = await Book.findByIdAndUpdate(bookId, { $set: newBook }, { new: true });
        res.status(200).json({ success: true, message: "Book Updated Successfully", book: updatedBook });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}
exports.deleteBook = async (req, res, next) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "no book found" })
        }
        let deletedBook = await Book.findByIdAndDelete(bookId);
        res.status(200).json({ success: true, message: "Book Deleted Successfully", book: deletedBook });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}