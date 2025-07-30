const express = require('express');
const {
  getTasks, createTask, updateTask, deleteTask, getTaskById
} = require('../controllers/task.controller');
const authMiddleware = require('../middlewares/auth.middleware');


const router = express.Router();

router.use(authMiddleware); // protect all task routes

router.get('/', getTasks);          // GET all tasks
router.post('/', createTask);       // POST new task
router.get('/:id', getTaskById);    // ✅ GET task by ID (NEW)
router.put('/:id', updateTask);     // PUT update task
router.delete('/:id', deleteTask);  // DELETE task
 


module.exports = router;
