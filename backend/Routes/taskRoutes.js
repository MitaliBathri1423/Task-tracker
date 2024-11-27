const express = require("express");
const router = express.Router();
const { getTask, createTask, updateTask, deleteTask} = require('../Controllers/taskControllers');

router.get('/', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;