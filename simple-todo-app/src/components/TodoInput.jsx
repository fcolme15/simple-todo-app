import React from 'react'
import { useState } from 'react'
import { Plus } from 'lucide-react'


const TodoInput = (props) => {
  const { handleNewTodo } = props
  const [ inputValue, setInputValue ] = useState('')

  function handleNewTask() {
    if (!inputValue) {return}
    handleNewTodo(inputValue)
    setInputValue('')
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleNewTask()
    }
  }

  
  return (
    <div className="border-t border-gray-700 bg-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={handleNewTask}
            disabled={!inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoInput