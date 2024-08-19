const express = require('express');
const { register, login, createTestUser, createAdminUser, createUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// router.post('/register', register);
router.post('/login', login);
// router.post('/create-admin',auth, createAdminUser);
// router.post('/create-test-user',auth, createTestUser);
router.post('/create-account', createUser);

module.exports = router;