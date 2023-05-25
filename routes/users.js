const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");
/* GET User HOMEPAGE */
router.get('/', usersController.index);

router.post('/create-user', usersController.create_new_user);

module.exports = router;