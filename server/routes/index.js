const express = require("express");
const router = express.Router();

const user = require("./user");
const course = require("./course");
const lecture = require("./lecture");

router.use("/user", user);
router.use("/course", course);
router.use("/lecture", lecture);

module.exports = router;
