const router = require("express").Router();
const {registerC,loginC} = require('../controllers/auth');

router.post("/register", registerC);

router.post('/login', loginC);

module.exports = router;