const router = require("express").Router();
const {createC,updateC,deleteC,getproductC,getallC} = require('../controllers/product');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controllers/verifyToken");

  router.post("/", verifyTokenAndAdmin, createC);
  router.put("/:id", verifyTokenAndAdmin, updateC);
  router.delete("/:id", verifyTokenAndAdmin, deleteC);
  router.get("/find/:id", getproductC);
  router.get("/", getallC);


module.exports = router;