import React from 'react'
import TodoCard from './TodoCard'


const TodoList = ({ todos, selectedTab, handleDeleteTodo, handleCompleteTodo, lists }) => {
  const getFilteredTodos = () => {
    let filtered = todos
    
    if (selectedTab.type === 'default') {
      switch (selectedTab.name) {
        case 'All':
          break
        case 'Open':
          filtered = todos.filter(todo => !todo.complete)
          break
        case 'Completed':
          filtered = todos.filter(todo => todo.complete)
          break
        case 'Today':
          const today = new Date().toISOString().split('T')[0]
          filtered = todos.filter(todo => todo.dueDate === today && !todo.complete)
          break
        case 'Overdue':
          const now = new Date().toISOString().split('T')[0]
          filtered = todos.filter(todo => 
            todo.dueDate && todo.dueDate < now && !todo.complete
          )
          break
      }
    } else if (selectedTab.type === 'list') {
      filtered = todos.filter(todo => todo.listId === selectedTab.id)
    } else if (selectedTab.type === 'tag') {
      filtered = todos.filter(todo => todo.tags?.includes(selectedTab.name))
    }
    
    return filtered
  }

  const filteredTodos = getFilteredTodos()

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-white mb-6">
          {selectedTab.name} Tasks
        </h2>
        
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-lg">
              {selectedTab.name === 'Completed' ? 'No completed tasks yet' 
               : selectedTab.name === 'Open' ? 'No open tasks' 
               : selectedTab.name === 'Today' ? 'No tasks due today'
               : selectedTab.name === 'Overdue' ? 'No overdue tasks'
               : `No tasks in ${selectedTab.name}`}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {!['Completed', 'Overdue'].includes(selectedTab.name) && 'Add a new task to get started!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <TodoCard 
                key={todo.id} 
                todo={todo}
                lists={lists}
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
