import { createSlice } from "@reduxjs/toolkit";

const getInitialList = () => {
  const localTask = localStorage.getItem("taskList");
  if (localTask) {
    return JSON.parse(localTask);
  }
  localStorage.setItem("taskList", JSON.stringify([]));
  return [];
};

const initialValue = {
  taskList: getInitialList(),
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialValue,
  reducers: {
    addTask: (state, action) => {
      // state.taskList.push(action.payload);
      const newTaskList = [...state.taskList, action.payload];
      state.taskList = newTaskList;
      const taskList = localStorage.getItem("taskList");
      if (taskList) {
        const taskListArr = JSON.parse(taskList);
        taskListArr.push({ ...action.payload });
        localStorage.setItem("taskList", JSON.stringify(taskListArr));
      } else {
        localStorage.setItem("taskList", JSON.stringify({ ...action.payload }));
      }
    },
    updateTask: (state, action) => {
      const taskList = localStorage.getItem("taskList");
      if (taskList) {
        const taskListArr = JSON.parse(taskList);
        taskListArr.forEach((task, index) => {
          if (task.id === action.payload.id) {
            task.title = action.payload.title;
            task.status = action.payload.status;
          }
        });
        localStorage.setItem("taskList", JSON.stringify(taskListArr));
        state.taskList = taskListArr;
      }      
    },
    deleteTask: (state, action) => {
      const taskList = JSON.parse(localStorage.getItem("taskList"));
      const taskListArr = taskList.filter((task) => task.id !== action.payload);
      // const taskListArr = taskList.forEach((task, index) => {
      //   task.id === action.payload ? taskListArr.splice(index, 1) : ''
      // })
      localStorage.setItem("taskList", JSON.stringify(taskListArr));
      state.taskList = taskListArr;
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
