import React from 'react'
import { useState } from 'react'


const TodoInput = (props) => {
  const { handleNewTodo } = props
  const [ inputValue, setInputValue ] = useState('')

  function handleNewTask() {
    if (!inputValue) {return}
    handleNewTodo(inputValue)
    setInputValue('')
  }
  return (
    <div className='ml-5'>
      <input value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} placeholder='Add Task'/>
      <button 
        className='px-4 py-2 m-2 bg-blue-950 text-white rounded hover:bg-blue-900'
        onClick={handleNewTask}>
        +
      </button>
    </div>
  )
}

export default TodoInput