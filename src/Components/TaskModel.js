import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/slices/taskSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

function TaskModel({ type, modelOpen, setModelOpen, task }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [comment, setComment] = useState("");
  // const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && task) {
      setTitle(task.title);
      setStatus(task.status);
      setComment(task.comment);
    } else {
      setTitle("");
      setStatus("incomplete");
      setComment("");
    }
  }, [type, task, modelOpen]);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTask({
            id: uuid(),
            title,
            status,
            comment,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Created Successfully");
      } else if (type === "update") {
        if (
          task.title !== title ||
          task.status !== status ||
          task.comment !== comment
        ) {
          dispatch(
            updateTask({
              ...task,
              title,
              status,
              comment,
            })
          );
        } else {
          toast.error("No Changes Made");
        }        
      }
      setModelOpen(false);
    } else {
      toast.error(title === "" ? "Title should not be empty" : " ");
    }
    // setTitle('')
    // setStatus('incomplete')
    // setComment('')
    // console.log("title:", title)
    // console.log("status:", status)
  };

  return (
    <>
      {modelOpen && (
        <div className="model-wrapper">
          <div className="model-container">
            <div
              className="model-closeButton"
              onClick={() => setModelOpen(false)}
            >
              <RiCloseLine />
            </div>
            <form className="model-form" onSubmit={(e) => handleSumbit(e)}>
              <h2 className="model-formTitle">
                {" "}
                {type === "update" ? "Update" : "Add"} Task
              </h2>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Select status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="complete">Complete</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </label>
              <label htmlFor="title">
                Comments (Optional)
                <input
                  type="text"
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>
              <div className="model-buttonContainer">
                <Button type="submit" color="#2e2ed2" textColor="#ffffff">
                  {type === "update" ? "Update" : "Add"} Task
                </Button>
                <Button
                  type="button"
                  color="#cccdde"
                  textColor="#736f6f"
                  onClick={() => setModelOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskModel;
