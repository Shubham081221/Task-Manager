import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div class="app">
        <h1>Task Manager</h1>
         <div class="task-form">
          <input type="text" placeholder="Enter task" />
          <button>Add Task</button>
        </div>
          <ul class="task-list">
            <li class="task">
            <span>Learn React</span>
            <button class="complete">Complete</button>
            <button class="delete">Delete</button>
            </li>

          </ul>

    </div>
  )
}

export default App
