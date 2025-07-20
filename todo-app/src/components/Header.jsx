
import React from 'react'

const Header = (props) => {
  const { todoList } = props
  const todoLength = todoList.length
  const isTaskPlural = todoList.length != 1
  const taskOrTasks = isTaskPlural ? 'tasks' : 'task'

  return (
    <header className='bg-gray-900 border-b border-gray-700 px-6 py-4 '>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold text-white'>Todo App</h1>
        <p className='text-gray-400 text-sm mt-1'>
          {todoLength} open {taskOrTasks} remaining
        </p>
      </div>
    </header>
  )
}

export default Header