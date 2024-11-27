import React, { useState } from "react";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";

function App() {
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleRefreshTasks = () => {
    setRefreshTasks(!refreshTasks); // Toggle the refresh state to re-fetch tasks
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList refreshTasks={refreshTasks} />
    </div>
  );
}

export default App;
