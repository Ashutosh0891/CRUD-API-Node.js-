const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const validatingToken = require('../middleware/auth')

const { body } = require('express-validator');

router.post('/signup', [
    body('name', 'invalid name').isLength({ min: 2 }),
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password').isLength({ min: 6 })
], authController.postSignup);

router.post('/login', [
    body('email', 'invalid email').isEmail(),
    body('password', 'invalid password').isLength({ min: 6 })
], authController.postLogin)

router.get('/getUser', validatingToken, authController.getUser);

module.exports = router