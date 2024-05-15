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
  selectedStatus: 'all',
  taskList: getInitialList(),
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialValue,
  reducers: {
    addTask: (state, action) => {
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
            task.comment = action.payload.comment;
          }
        });
        localStorage.setItem("taskList", JSON.stringify(taskListArr));
        state.taskList = taskListArr;
      }      
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      state.taskList = state.taskList.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      localStorage.setItem("taskList", JSON.stringify(state.taskList));
    },
    deleteTask: (state, action) => {
      const taskList = JSON.parse(localStorage.getItem("taskList"));
      const taskListArr = taskList.filter((task) => task.id !== action.payload);
      localStorage.setItem("taskList", JSON.stringify(taskListArr));
      state.taskList = taskListArr;
    },
    updatedSelectedStatus : (state, action) => {
      state.selectedStatus = action.payload
    }
  },
});

export const { addTask, deleteTask, updateTask, updateTaskStatus, updatedSelectedStatus } = taskSlice.actions;
export default taskSlice.reducer;
