import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import Button from "./Button";
import NoTaskFound from "./NoTaskFound";
import { deleteAllTask } from "../redux/slices/taskSlice";
import toast from "react-hot-toast";

function TaskContent() {
  const dispatch = useDispatch();

  const taskList = useSelector((state) => state.task.taskList);
  const selectedStatus = useSelector((state) => state.task.selectedStatus);

  const taskListFiltered =
    selectedStatus === "all"
      ? taskList
      : taskList.filter((task) => task.status === selectedStatus);

  const taskListSorted = [...taskListFiltered];
  taskListSorted.sort((a, b) => new Date(a.time) - new Date(b.time));

  const handleDeteleAll = () => {
    const allComplete = taskList.every((task) => task.status === "complete");
    if (allComplete) {
      dispatch(deleteAllTask());
    } else {
      toast.error("All tasks must be marked as complete.");
    }
  };

  return (
    <div>
      {taskListSorted && taskListSorted.length > 0 ? (
        <>
          {taskListSorted.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              selectedStatus={selectedStatus}
            />
          ))}
          <p className="task-content-button">
            <Button
              type="button"
              color="#2e2ed2"
              textColor="#ffffff"
              onClick={handleDeteleAll}
            >
              Delete All
            </Button>
          </p>
        </>
      ) : (
        <NoTaskFound />
      )}
    </div>
  );
}

export default TaskContent;
