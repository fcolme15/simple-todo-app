import React from 'react'
import { Check, Trash2, CheckCircle2, Circle } from 'lucide-react'


const TodoCard = (props) => {
  const { todo, handleDeleteTodo, handleCompleteTodo, todoList } = props

  function handleComplete() {
    console.log("here")
    const index = todoList.findIndex(todoItem=>todoItem.input === todo.input)
    console.log(index)
    handleCompleteTodo(index);
  }

  function handleDelete() {
    console.log("here")
    const index = todoList.findIndex(todoItem=>todoItem.input === todo.input)
    console.log(index)
    handleDeleteTodo(index);
  }

  return (
    <div className={`group bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200 ${todo.complete ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={handleComplete}
            disabled={todo.complete}
            className={`flex-shrink-0 transition-colors duration-200 ${
              todo.complete 
                ? 'text-green-500 cursor-default' 
                : 'text-gray-400 hover:text-blue-500'
            }`}
          >
            {todo.complete ? (
              <CheckCircle2 size={20} />
            ) : (
              <Circle size={20} />
            )}
          </button>
          <p className={`text-gray-200 flex-1 ${
            todo.complete ? 'line-through text-gray-500' : ''
          }`}>
            {todo.input}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!todo.complete && (
            <button
              onClick={handleComplete}
              className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all duration-200"
              title="Mark as complete"
            >
              <Check size={16} />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard