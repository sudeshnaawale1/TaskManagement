import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Button from "./Button";

function TaskModel({ modelOpen, setModelOpen }) {

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('incomplete');

 const handleSumbit =(e)=>{
    e.preventDefault();
    console.log("title:", title)
    console.log("status:", status)
 }

  return (
    <>
      {modelOpen && (
        <div className="model-wrapper">
          <div className="model-container">
            <div className="model-closeButton"
            onClick={() => setModelOpen(false)}
            >
              <RiCloseLine />
            </div>
            <form className="model-form" onSubmit={(e)=> handleSumbit(e)}>
              <h2 className="model-formTitle"> Add Task</h2>
              <label htmlFor="title">
                Title
                <input type="text" id="title" value={title} onChange={(e) =>setTitle(e.target.value)}/>
              </label>
              <label htmlFor="status">
                Select status
                <select name="status" id="status" value={status} onChange={(e) =>setStatus(e.target.value)}>
                  <option value="complete">Complete</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </label>
              <label htmlFor="image">
                Image
                <input type="file" accept="image/*" id="image"/>
              </label>
              <div className="model-buttonContainer">
                <Button type="submit" color="#2e2ed2" textColor="#ffffff">
                  Add Task
                </Button>
                <Button type="button" color="#cccdde" textColor="#736f6f" 
                onClick={()=>setModelOpen(false)}
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
