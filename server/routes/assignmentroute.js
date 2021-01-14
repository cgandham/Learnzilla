import express from 'express';
import AssignmentController from '../controllers/assignment.controller';

const router = express.Router();

// all assignments / GET
// add assignment  /POST
router.route('/')
.get(AssignmentController.index)
.post(AssignmentController.create);

// get single assignment- GET /assignments/${id}
// update single assignment- PUT  /assignments/${id}
// delete single assignment- DELETE  /assignments/${id}
router.route('/:id')
.get(AssignmentController.get)
.put(AssignmentController.update)
.delete(AssignmentController.remove);



export default router;