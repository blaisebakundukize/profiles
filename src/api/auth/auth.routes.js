import { Router } from 'express';

import authController from './auth.controller';

const authRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * definitions:
 *   RegisterResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Registration completed successfully
 *       user:
 *         $ref: '#/definitions/User'
 *       token:
 *         type: string
 *   Error:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 *         description: Error message
 *   UserLogin:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   LoginResponse:
 *     type: object
 *     properties:
 *       user:
 *         $ref: '#/definitions/User'
 *       token:
 *         type: string
 *   User:
 *     type: object
 *     properties:
 *       id:
 *           type: integer
 *       username:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: register a user
 *     tags: [Auth]
 *     description: register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: user username
 *                 example: username1
 *               password:
 *                 type: string
 *                 description: user password
 *                 example: simplePassword
 *               confirmPassword:
 *                 type: string
 *                 description: confirm password should matches user password
 *                 example: simplePassword
 *     responses:
 *       201:
 *         description: user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#definitions/RegisterResponse'
 *       400:
 *         description: failed to register user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#definitions/Error'
 */
authRouter.post('/register', authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login a user
 *     tags: [Auth]
 *     description: register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: user username
 *                 example: username1
 *               password:
 *                 type: string
 *                 description: user password
 *                 example: simplePassword
 *     responses:
 *       200:
 *         description: user is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#definitions/LoginResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#definitions/Error'
 */
authRouter.post('/login', authController.login);

export { authRouter };
