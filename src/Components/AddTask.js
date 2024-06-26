import React, { useState } from "react";
import Button, { SelectStatusButton } from "./Button";
import TaskModel from "./TaskModel";

function AddTask() {
  const [modelOpen, setModelOpen] = useState(true);

  return (
    <div className="add-task-container">
      <Button type="button" color="#2e2ed2" textColor="#ffffff" onClick={()=>setModelOpen(true)}>
        Add Task
      </Button>
      <SelectStatusButton color="#837c7c" textColor="#242222" id="status">
        <option value="All">All</option>
        <option value="Complete">Complete</option>
        <option value="Incomplete">Incomplete</option>
      </SelectStatusButton>
      <TaskModel modelOpen={modelOpen} setModelOpen={setModelOpen} />
    </div>
  );
}

export default AddTask;
