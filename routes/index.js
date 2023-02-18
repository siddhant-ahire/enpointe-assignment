const express = require("express");
const router = express.Router();
const warehouse = require("../controllers/warehouse");
const section = require("../controllers/section");
const category = require("../controllers/categories");
const product = require("../controllers/product");
const user = require("../controllers/user");


router.use("/warehouse", warehouse);
router.use("/section", section);
router.use("/category", category);
router.use("/product", product);
router.use("/user", user);

module.exports = router;
