import logo from './logo.svg';
import './App.css';
import TaskHeadline from './Components/TaskHeadline';
import AddTask from './Components/AddTask';
import TaskContent from './Components/TaskContent';

function App() {
  return (
    <div className='task-container'>
      <TaskHeadline/>
      <div className='task-wrapper'>
        <AddTask/>
        <TaskContent/>
      </div>
    </div>
  );
}


export default App;
