import { Router } from 'express';

import userController from './user.controller';
import { uploadFile } from '../../middleware/upload.middleware';

const userRouter = Router();

/**
 * @swagger
 * /api/v1/users/profiles/upload:
 *   post:
 *     summary: Create new profiles
 *     tags: [Profiles]
 *     description: Upload new profiles for saving into database
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *     responses:
 *       201:
 *         description: File Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *          description: BadRequest - File not created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#definitions/Error'
 *       401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#definitions/Error'
 */
userRouter.post(
  '/profiles/upload',
  uploadFile.single('file'),
  userController.saveCSVUsers
);

/**
 * @swagger
 * /api/v1/users/profiles:
 *   get:
 *     summary: Get profiles
 *     tags: [Profiles]
 *     description: Fetch profiles based on pagination
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of page to use for skipping items before starting to collect items
 *     responses:
 *       200:
 *         description: Get profiles successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       names:
 *                         type: string
 *                       nid:
 *                         type: string
 *                       phone_number:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       email:
 *                         type: string
 *                       belongTo:
 *                         type: integer
 *                       errors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             field:
 *                               type: string
 *                             error:
 *                               type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       400:
 *          description: Could not fetch profiles
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#definitions/Error'
 *       401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#definitions/Error'
 */
userRouter.get('/profiles', userController.getProfiles);

export { userRouter };
