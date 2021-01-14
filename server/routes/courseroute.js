import express from 'express';
import CourseController from '../controllers/course.controller';

const router = express.Router();

// all courses / GET
// add course  /POST
router.route('/')
.get(CourseController.index)
.post(CourseController.create);

// get single course- GET /courses/${id}
// update single course- PUT  /courses/${id}
// delete single course- DELETE  /courses/${id}
router.route('/:id')
.get(CourseController.get)
.put(CourseController.update)
.delete(CourseController.remove);

router.route('/:id/students')
.get(CourseController.getStudents)



export default router;