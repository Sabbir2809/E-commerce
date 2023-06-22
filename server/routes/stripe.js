const router = require("express").Router();
const stripeC = require('../controllers/stripe')

router.post("/payment", stripeC);

module.exports = router;
