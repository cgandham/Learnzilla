import express from 'express';
import AuthController from './../controllers/auth.controller';
//import AuthController from '../controllers/auth.controller';

const router = express.Router();

// authenticate and login POST /login ->
router.route('/login/')
.post(AuthController.login);

// logout POST /logout ->
router.route('/logout')
.post(AuthController.logout);

// register POST /register ->
router.route('/register/')
.post(AuthController.register);

export default router;
