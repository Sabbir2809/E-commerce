const {updateUser,deleteUser,getUser,getAllUser,getUserStats} = require('../controllers/user');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, getUser);

//GET ALL USER
router.get("/", verifyTokenAndAdmin, getAllUser);

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
