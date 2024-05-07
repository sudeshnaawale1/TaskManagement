import { createSlice } from "@reduxjs/toolkit";

const getInitialList = () => {
  const localTask = localStorage.getItem("taskList");
  if (localTask) {
    return JSON.parse(localTask);
  }
  localStorage.setItem("taskList", JSON.stringify([]));
  return []
};

const initialValue = {
  taskList: getInitialList(),
};

export const taskSlice = createSlice({
    name : 'task',
    initialState: initialValue,
    reducers : {
        addTask : (state, action) => {
            // state.taskList.push(action.payload);
            const newTaskList = [...state.taskList, action.payload];
            state.taskList = newTaskList;
            const taskList = localStorage.getItem("taskList");
            if(taskList){
                const taskListArr = JSON.parse(taskList);
                taskListArr.push({...action.payload});
                localStorage.setItem("taskList", JSON.stringify(taskListArr));
            }else{
                localStorage.setItem("taskList", JSON.stringify({...action.payload}))
            }
        }
    }
});

export const {addTask} = taskSlice.actions;
export default taskSlice.reducer;
