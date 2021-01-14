import express from 'express';
import TodoController from '../controllers/sticky.controller';

const router = express.Router();

// search- GET /todos
// create- POST/ todos

router.route('/todos')
.get(TodoController.index)
.post(TodoController.create);

// retrieve - GET /todo/${id}
// update - GET /todo/${id}
// delete - DELETE /todos/${id}

router.route('/todos/:id')
.get(TodoController.get)
.put(TodoController.update)
.delete(TodoController.remove)

//module.exports = router;

export default router;