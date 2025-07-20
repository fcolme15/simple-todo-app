
import React from 'react'

const Header = (props) => {
  const { todoList } = props
  const todoLength = todoList.length
  const isTaskPlural = todoList.length != 1
  const taskOrTasks = isTaskPlural ? 'tasks' : 'task'
  return (
    <header>
      <h1 className='text-10xl font-extrabold text-indigo-400'> You have {todoLength} open {taskOrTasks}</h1>
    </header>
  )
}

export default Header