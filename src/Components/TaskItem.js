import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus } from "../redux/slices/taskSlice";
import toast from "react-hot-toast";
import TaskModel from "./TaskModel";
import { v4 as uuid } from "uuid";

function TaskItem({ task, selectedStatus }) {
  const [updateModal, setUpdateModal] = useState(false);
  const [isChecked, setIsChecked] = useState(task.status === "complete");

  const dispatch = useDispatch();

  const handleUpdate = () => {
    setUpdateModal(true);
  };
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success("Task Deleted Successfully");
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    const newStatus = isChecked ? "incomplete" : "complete";
    dispatch(updateTaskStatus({ taskId: task.id, newStatus }));
    if (!isChecked && task.comment == "") {
      setUpdateModal(true);
    }
  };

  useEffect(() => {
    setIsChecked(task.status === "complete");
  }, [task.status]);

  if (selectedStatus === "all" || task.status === selectedStatus) {
    return (
      <>
        <div className="task-item">
          <div className="task-item-details">
            <div className="text-item-checkbox">
              <input
                type="checkbox"
                id={uuid()}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            <div
              className={`task-item-texts ${
                isChecked ? "task-item-text--completed" : ""
              }`}
            >
              <p>Title: {task.title}</p>
            </div>
            {task.status === "complete" && (
              <div
                className={`task-item-comments ${
                  isChecked ? "" : "task-item-hidden-comments"
                }`}
              >
                <p>Comments: {task.comment}</p>
              </div>
            )}
            {/* <div className="task-item-comments">
            <p>Comments: {task.comment}</p>
          </div> */}
          </div>
          <div className="task-item-actions">
            <div
              className="task-item-icon"
              onClick={handleUpdate}
              role="button"
              tabIndex={0}
            >
              <MdEdit />
            </div>
            <div
              className="task-item-icon"
              onClick={handleDelete}
              role="button"
              tabIndex={0}
            >
              <MdOutlineDelete />
            </div>
          </div>
        </div>
        <TaskModel
          type="update"
          task={task}
          modelOpen={updateModal}
          setModelOpen={setUpdateModal}
        />
      </>
    );
  }
}

export default TaskItem;
