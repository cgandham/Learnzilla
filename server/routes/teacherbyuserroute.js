import express from 'express';
import TeacherByUserController from '../controllers/teacherbyuser.controller';

const router = express.Router();


// Get teacherID based on user idwith route  /teachers/users
router.route('/:userid')
.get(TeacherByUserController.getByUserid);


export default router;
