const express = require('express');
const { signup, login, reset } = require('../controllers/user.controller');
const { profile } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/reset',authMiddleware, reset);
router.get('/profile', authMiddleware, profile);

module.exports = router;
