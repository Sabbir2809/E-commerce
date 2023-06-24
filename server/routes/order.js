const {orderCreate,orderUpdate,deleteOrder,userorder,getAllOrder,monthIncome} = require('../controllers/order');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, orderCreate);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, orderUpdate);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, userorder);

// //GET ALL

router.get("/", verifyTokenAndAdmin, getAllOrder);

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, monthIncome);

module.exports = router;
