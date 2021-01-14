import express from 'express';
import StudentByUserController from '../controllers/studentbyuser.controller';

const router = express.Router();

// Get studentID based on user id with route  /students/users

router.route('/:userid')
.get(StudentByUserController.getByUserid);


export default router;
