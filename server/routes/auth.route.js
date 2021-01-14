import express from 'express';
import authController from './../controllers/auth.controller';

const router = express.Router();

router.route('/login')
    .post(authController.login);

router.route('/register')
    .post(authController.register);


export default router;
