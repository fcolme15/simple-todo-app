import React from 'react'
import { Check, Trash2, CheckCircle2, Circle } from 'lucide-react'


const TodoCard = ({ todo, handleDeleteTodo, handleCompleteTodo, lists }) => {
  const listName = lists.find(list => list.id === todo.listId)?.name || 'No List'
  
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.complete
  const isToday = todo.dueDate === new Date().toISOString().split('T')[0]

  return (
    <div className={`group bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200 ${
      todo.complete ? 'opacity-75' : ''
    } ${isOverdue ? 'border-red-500/50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => handleCompleteTodo(todo.id)}
            disabled={todo.complete}
            className={`flex-shrink-0 mt-1 transition-colors duration-200 ${
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
          <div className="flex-1 min-w-0">
            <p className={`text-gray-200 ${
              todo.complete ? 'line-through text-gray-500' : ''
            }`}>
              {todo.text}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">
                {listName}
              </span>
              
              {todo.dueDate && (
                <span className={`px-2 py-1 rounded flex items-center gap-1 ${
                  isOverdue ? 'bg-red-500/20 text-red-400' :
                  isToday ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {/* <Calendar size={12} />
                  {new Date(todo.dueDate).toLocaleDateString()} */}
                </span>
              )}
              
              {todo.tags?.map(tag => (
                <span key={tag} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded flex items-center gap-1">
                  {/* <Tag size={10} /> */}
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!todo.complete && (
            <button
              onClick={() => handleCompleteTodo(todo.id)}
              className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all duration-200"
              title="Mark as complete"
            >
              <Check size={16} />
            </button>
          )}
          <button
            onClick={() => handleDeleteTodo(todo.id)}
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