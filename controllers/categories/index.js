const express = require("express");
const { isAuthenticated } = require("../../utilities/helper");
const router = express.Router();
const controllers = require("./controllers")

router.post("/create", controllers.createCategory);
router.get("/list", controllers.getCategories);

module.exports = router;