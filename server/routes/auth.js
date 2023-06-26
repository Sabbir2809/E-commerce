const router = require("express").Router();
const {registerC,loginC,logoutC,passwordForget,success,failed,passwordReset} = require('../controllers/auth');
const passport = require("passport");
require('dotenv').config()

router.post("/register", registerC);

router.post('/login', loginC);

router.get('/logout', logoutC);

router.post('/forgetPassword', passwordForget);

router.get('/resetPassword', passwordReset);

router.get("/login/success", success);
  
router.get("/login/failed", failed);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {successRedirect:process.env.CLIENT_URL,failureRedirect: "/login/failed",})
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get("/facebook/callback", passport.authenticate("facebook", {successRedirect:process.env.CLIENT_URL,failureRedirect: "/login/failed",})
);

module.exports = router;