const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.post("/users/check", userController.checkUserInfo);
router.post("/verifyUser", userController.verifyUser);
router.get("/getUser", authenticate, userController.getUserInfo);

module.exports = router;