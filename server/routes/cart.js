const {createCart,updateCart,deleteCart,userCartFind,allCart} = require('../controllers/cart');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, createCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, userCartFind);

// //GET ALL

router.get("/", verifyTokenAndAdmin, allCart);

module.exports = router;
