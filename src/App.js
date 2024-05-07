import "./App.css";
import TaskHeadline from "./Components/TaskHeadline";
import AddTask from "./Components/AddTask";
import TaskContent from "./Components/TaskContent";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="task-container">
        <TaskHeadline />
        <div className="task-wrapper">
          <AddTask />
          <TaskContent />
        </div>
      </div>
      <Toaster
      position="bottom-center"    
        style={{
          fontSize: "1.4rem"
        }}
      />
    </>
  );
}

export default App;
