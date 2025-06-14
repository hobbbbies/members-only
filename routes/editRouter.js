const express = require("express");
const router = express.Router();
const controller = require("../controllers/editController");

router.get("/", controller.getMessage);

router.post("/", controller.postMessage)

router.get("/delete", controller.deleteMessage);

module.exports = router;