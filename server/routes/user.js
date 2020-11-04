const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

/**
 * @swagger
 * /user/login:
 *  post:
 *    tags:
 *    - "/user/"
 *    summary: Sign in the application
 *    parameters:
 *    - name: "body"
 *      in: "body"
 *      description: "Account's email address and password"
 *      schema:
 *        type: "object"
 *        properties:
 *          email:
 *            type: "string"
 *          password:
 *            type: "string"
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /user/register:
 *  post:
 *    tags:
 *    - "/user/"
 *    summary: Register a new account
 *    parameters:
 *    - name: "body"
 *      in: "body"
 *      description: "Account's data"
 *      schema:
 *        type: "object"
 *        properties:
 *          email:
 *            type: "string"
 *          password:
 *            type: "string"
 *          jmbag:
 *            type: "string"
 *          phoneNumber:
 *            type: "string"
 *          userType:
 *            type: "string"
 *            enum: [Student, Teacher, Admin]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /user/:
 *  get:
 *    tags:
 *    - "/user/"
 *    summary: Get all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", userController.getAllUsers);

module.exports = router;
