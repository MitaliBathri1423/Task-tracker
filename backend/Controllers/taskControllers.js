const Task = require("../Models/Task");

const getTask = async (req,res) =>{
  try{
    const tasks = await Task.find();
    res.join(tasks);
  }catch(error) {
    res.status(500).json({message: 'Server Error'});
  }
};

const createTask = async(req,res) => {
  try{
    const {title, description, deadline, priority, status} = req.body;
    const newTask = new Task({
      title,
      description,
      deadline,
      priority,
      status
    });
    await newTask.save();
    res.status(201).json(newTask);
  }catch(error) {
    res.status(500).json({ message: 'Server Error'});
  }
};

const updateTask = async(req,res) => {
  const{id} = req.params;
  try{
    const updateTask = await Task.findByIdAndUpdate(id);
    if(!deletedTask) {
      return res.status(404).json({ message : 'Task not found'});
    }
    res.join({ message: ' Task deleted succesfully'});

  }catch(error){
    res.status(500).json({ message: 'Server Error'});
  }
};

const deleteTask = async(req,res) => {
  const{id} = req.params;
  try{
    const deleteTask = await Task.findByIdAndDelete(id);
    if(!deleteTask){
      return res.status(404).json({message: 'Task not found'});
    }
    res.join({message: 'Task deleted successfully'});

  }catch(error){
    res.status(500).json({ message: 'Server Error'});
  }
};

module.exports = {getTask, createTask, updateTask, deleteTask};