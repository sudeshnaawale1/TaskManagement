import React, { useState } from "react";
import Button, { SelectStatusButton } from "./Button";
import TaskModel from "./TaskModel";
import { useDispatch, useSelector } from "react-redux";
import { updatedSelectedStatus } from "../redux/slices/taskSlice";

function AddTask() {
  const [modelOpen, setModelOpen] = useState(false);

  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.task.selectedStatus);

  const handStatusChange = (e) => {
    const status = e.target.value;
    dispatch(updatedSelectedStatus(status));
  };

  return (
    <div className="add-task-container">
      <Button
        type="button"
        color="#2e2ed2"
        textColor="#ffffff"
        onClick={() => setModelOpen(true)}
      >
        Add Task
      </Button>
      <SelectStatusButton
        color="#cfcaca"
        textColor="#242222"
        id="status"
        value={selectedStatus}
        onChange={(e) => handStatusChange(e)}
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </SelectStatusButton>
      <TaskModel type="add" modelOpen={modelOpen} setModelOpen={setModelOpen} />
    </div>
  );
}

export default AddTask;
