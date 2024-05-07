import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Button from "./Button";
import {useDispatch} from "react-redux";
import { addTask } from "../redux/slices/taskSlice";
import { v4 as uuid} from 'uuid';
import toast from 'react-hot-toast';

function TaskModel({ modelOpen, setModelOpen }) {

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('incomplete');
  const [image, setImage] = useState(null); 

  const dispatch = useDispatch();

 const handleSumbit =(e)=>{
    e.preventDefault();
    const currentTime = new Date().toLocaleDateString();
    const formData = new FormData();
    formData.append('image', image);

    // console.log("formData;", formData)

    if(title && status && image){
      dispatch(addTask({
        id: uuid(),
        title,
        status,
        time : new Date().toLocaleString(),
        image : formData
      }));
      toast.success("Task Created Successfully");
      setModelOpen(false)
    }else{
      toast.error(title === "" ? "Title should not be empty" : "Image should not be empty")
    }
    setTitle('')
    setStatus('incomplete')
    setImage(null);   
    // console.log("title:", title)
    // console.log("status:", status)
 };

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
                <input type="file" accept="image/*" id="image" onChange={(e) => setImage(e.target.files[0])}/>
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
