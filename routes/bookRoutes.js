const express = require('express');

const router = express.Router();

const bookController = require('../controllers/booksController');

const validatingToken = require('../middleware/auth')

router.get('/getAllBooks', validatingToken, bookController.getAllBooks);

router.post('/addBook', validatingToken, bookController.addBook);

router.get('/book/:id', validatingToken, bookController.getBookById);

router.put('/updateBook/:id', validatingToken, bookController.updateBook);

router.delete('/removeBook/:id', validatingToken, bookController.deleteBook);

module.exports = router;