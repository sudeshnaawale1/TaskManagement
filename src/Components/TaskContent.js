import React from 'react'
import { useSelector } from 'react-redux'
import TaskItem from './TaskItem';
import NoTaskFound from './NoTaskFound';

function TaskContent() {
     
    const taskList = useSelector((state)=>state.task.taskList);
    const selectedStatus = useSelector((state) => state.task.selectedStatus);

    const taskListFiltered = selectedStatus === 'all' ? taskList : taskList.filter(task => task.status === selectedStatus);

     const taskListSorted = [...taskListFiltered]
     taskListSorted.sort((a, b) => new Date(a.time) - new Date(b.time));

    // console.log("taskList", taskListSorted)
    // console.log("taskList")

  return (
   <div>
    {
        taskListSorted && taskListSorted.length > 0 ? 
        taskListSorted.map((task)=>(
          <TaskItem key={task.id} task={task}  selectedStatus={selectedStatus} />
        ))
        : 
        <NoTaskFound/>
    }
   </div>
  )
}

export default TaskContent
