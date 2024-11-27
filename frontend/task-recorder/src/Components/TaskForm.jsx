import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ taskToEdit, refreshTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    deadline: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        deadline: taskToEdit.deadline,
      });
    }
  }, [taskToEdit]); // Re-run if taskToEdit changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      // Update existing task
      axios
        .put(`http://localhost:5000/api/tasks/${taskToEdit._id}`, task)
        .then((response) => {
          refreshTasks(); // Refresh task list
        })
        .catch((error) => {
          console.error("Error updating task", error);
        });
    } else {
      // Create new task
      axios
        .post("http://localhost:5000/api/tasks", task)
        .then((response) => {
          refreshTasks(); // Refresh task list
        })
        .catch((error) => {
          console.error("Error creating task", error);
        });
    }
    setTask({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      deadline: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{taskToEdit ? "Edit Task" : "Add Task"}</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div>
        <label>Status</label>
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Priority</label>
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Deadline</label>
        <input
          type="date"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />
      </div>
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
