import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

// all users / GET
// add user  /POST
router.route('/')
.get(UserController.index)
.post(UserController.create);

// get single user- GET /users/${id}
// update single USER- PUT  /users/${id}
// delete single USER- DELETE  /users/${id}
router.route('/:id')
.get(UserController.get)
.put(UserController.update)
.delete(UserController.remove);



export default router;