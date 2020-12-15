const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");

/**
 * @swagger
 * /course/add:
 *  post:
 *    tags:
 *    - "/course/"
 *    summary: Add a new course 
 *    parameters:
 *    - name: "body"
 *      in: "body"
 *      description: "Course's data"
 *      schema:
 *        type: "object"
 *        properties:
 *          name:
 *            type: "string"
 *          passcode:
 *            type: "string"
 *          allowedAbsences:
 *            type: "number"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/add", courseController.add);

/**
 * @swagger
 * /course/:
 *  get:
 *    tags:
 *    - "/course/"
 *    summary: Get all courses 
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", courseController.getAll);

/**
 * @swagger
 */

router.delete("/:id", courseController.delete);

module.exports = router;
