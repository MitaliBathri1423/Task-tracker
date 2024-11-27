import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ refreshTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All"); // New state to manage filter

  // Fetch tasks from backend based on filter
  useEffect(() => {
    let url = "http://localhost:5000/api/tasks";
    if (filter !== "All") {
      url += `?status=${filter}`; // Add filter to the URL if it's not "All"
    }

    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, [filter, refreshTasks]); // Re-fetch tasks when filter or refreshTasks changes

  // Handle task status update
  const handleStatusToggle = (taskId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    axios
      .put(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus })
      .then((response) => {
        refreshTasks(); // Refresh the task list after status update
      })
      .catch((error) => {
        console.error("Error updating task status", error);
      });
  };

  // Handle task deletion
  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then((response) => {
        refreshTasks(); // Refresh the task list after deletion
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  return (
    <div>
      <h2>Task List</h2>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            <button onClick={() => handleStatusToggle(task._id, task.status)}>
              Mark as {task.status === "Pending" ? "Completed" : "Pending"}
            </button>
            <button>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
