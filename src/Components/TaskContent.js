import React from 'react'
import { useSelector } from 'react-redux'

function TaskContent() {
     
    const taskList = useSelector((state)=>state.task.taskList);

     const taskListSorted = [...taskList]
     taskListSorted.sort((a, b) => new Date(a.time) - new Date(b.time));

    console.log("taskList", taskListSorted)
    console.log("taskList")

  return (
   <div>
    {
        taskListSorted && taskListSorted.length > 0 ? 'task here' : 'task not found'
    }
   </div>
  )
}

export default TaskContent
