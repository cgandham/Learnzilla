import express from 'express';
import TeacherController from '../controllers/teacher.controller';

const router = express.Router();

// all teachers / GET
// add teachers  /POST
router.route('/')
.get(TeacherController.index)
.post(TeacherController.create);

// get single user- GET /teachers/${id}
// update single USER- PUT  /teachers/${id}
// delete single USER- DELETE  /teachers/${id}
router.route('/:id')
.get(TeacherController.get)
.put(TeacherController.update)
.delete(TeacherController.remove);

export default router;
