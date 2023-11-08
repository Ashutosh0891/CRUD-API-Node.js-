const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';

module.exports = async (req, res, next) => {
    const token = req.header('auth-Token');
    if (!token) {
        return res.status(401).json({ success: false, error: 'authenticate using valid token' })
    }

    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next()
}