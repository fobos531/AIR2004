const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance");

/**
 * @swagger
 * /attendance/add:
 *  post:
 *    tags:
 *    - "/attendance/"
 *    summary: Add a new attendance 
 *    parameters:
 *    - name: "body"
 *      in: "body"
 *      description: "Attendance's data"
 *      schema:
 *        type: "object"
 *        properties:
 *          lecture:
 *            type: "number"
 *          user:
 *            type: "number"
 *          qrCode:
 *            type: "string"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/add", attendanceController.add);

/**
 * @swagger
 * /attendance/:
 *  get:
 *    tags:
 *    - "/attendance/"
 *    summary: Get all attendances 
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", attendanceController.getAll);


module.exports = router;
