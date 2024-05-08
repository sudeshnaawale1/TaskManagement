import React, {useState} from 'react'
import {MdOutlineDelete} from 'react-icons/md';
import { MdEdit } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/slices/taskSlice';
import toast from 'react-hot-toast';
import TaskModel from './TaskModel';

function TaskItem({task}) {

    
   const [updateModal, setUpdateModal] = useState(false);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        setUpdateModal(true)
    }
    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        toast.success("Task Deleted Successfully");
    }

  return (
    <>
    <div className='task-item'>
        <div className='task-item-details'>
            <div className='text-item-checkbox'>
                []
            </div>          
            <div className='task-item-texts'>                
                <p className={task.status === 'complete' ? 'task-item-text--completed' : 'task-item-text'}>
                Title: {task.title}
                </p>
            </div>
            <div className='task-item-comments'>                
                <p>
                Comments: {task.comment}
                </p>
            </div>           
        </div>        
        <div className='task-item-actions'>            
            <div className='task-item-icon' onClick={handleUpdate} role="button" tabIndex={0}>
            <MdEdit/>
            </div>
            <div className='task-item-icon' onClick={handleDelete} role="button" tabIndex={0}>
            <MdOutlineDelete />
            </div>
        </div>
        
    </div>
    <TaskModel type="update" task={task} modelOpen={updateModal} setModelOpen={setUpdateModal}/>
    </>
  )
}

export default TaskItem
