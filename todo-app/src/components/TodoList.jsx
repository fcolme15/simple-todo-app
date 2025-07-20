import React from 'react'
import TodoCard from './TodoCard'
const TodoList = (props) => {
  const { todoList, selectedTab } = props 
  const filteredTodoList = selectedTab === 'All' ? todoList 
    : selectedTab === 'Completed' ? 
    todoList.filter(val => val.complete)
      : todoList.filter(val => !val.complete)

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-white mb-6">
          {selectedTab} Tasks
        </h2>
        
        {filteredTodoList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-lg">
              {selectedTab === 'Completed' ? 'No completed tasks yet' 
               : selectedTab === 'Open' ? 'No open tasks' 
               : 'No tasks yet'}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {selectedTab !== 'Completed' && 'Add a new task to get started!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodoList.map((todo, index) => (
              <TodoCard 
                key={`${todo.input}-${index}`} 
                todo={todo}
                todoList={todoList}
                handleDeleteTodo={handleDeleteTodo}
                handleCompleteTodo={handleCompleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoList

{filteredTodoList.map( (todo, index) => {
          return (
            <TodoCard key={index} {...props} todo={todo}/>
          )
        })}