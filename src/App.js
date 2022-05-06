import React from "react";

import {v4} from 'uuid'
import {randomColor} from 'randomcolor'

import './App.css';

function App() {

  const [task, setTask] = React.useState('')
  const [allTasks, setAllTasks] = React.useState(
      JSON.parse(localStorage.getItem('allTasks')) || []
  )

  React.useEffect( () => {
      localStorage.setItem('allTasks', JSON.stringify(allTasks))
  }, [allTasks])

  const handleChangeInput = (e) => {
    setTask(e.target.value)
  }

  const addNewTask = () => {
    if (task.trim() !== '') {
      const newTask = {
        id: v4(),
        task,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPosition: {
          x: -100,
          y: -100
        }
      }
      setAllTasks( tasks => [...tasks, newTask])
      setTask('')
    } else {
      alert('Enter something =(')
      setTask('')
    }
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <input
            onChange={handleChangeInput}
            type="text"
            placeholder='Enter a task...'
            value={task}
        />
        <button onClick={addNewTask} className='enter'>ENTER</button>
      </div>
    </div>
  )
}

export default App;
