import React from "react";

import {v4} from 'uuid'
import {randomColor} from 'randomcolor'
import Draggable from "react-draggable";

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

  const deleteTask = (taskId) => {
    setAllTasks(allTasks.filter( taskObj => taskObj.id !== taskId))
  };

  const updateTaskPos = (data, index) => {
    const newArr = [...allTasks]
    newArr[index].defaultPosition = {x: data.x, y: data.y}
    setAllTasks(newArr)
  };

  const keyPress = e => {
    if (e.which === 13) {
      addNewTask()
    }
  };

  return (
    <div className="App">
      <div className='wrapper'>
        <input
            onChange={handleChangeInput}
            onKeyPress={keyPress}
            type="text"
            placeholder='Enter a task...'
            value={task}
        />
        <button onClick={addNewTask} className='enter'>ENTER</button>

        {
          allTasks.map( (taskObj, index) => <Draggable
              key={taskObj.id}
              defaultPosition={taskObj.defaultPosition}
              onStop={ (_,data) => updateTaskPos(data, index)}
          >
            <div className='task__item' style={{background: taskObj.color}}>
              {taskObj.task}
              <button onClick={ () => deleteTask(taskObj.id)} className='delete__task'>X</button>
            </div>
          </Draggable>)
        }
      </div>
    </div>
  )
}

export default App;
