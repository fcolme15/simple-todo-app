import React from 'react'
import TodoCard from './TodoCard'
const TodoList = (props) => {
  const { todoList, selectedTab } = props 
  const filteredTodoList = selectedTab === 'All' ? todoList 
    : selectedTab === 'Completed' ? 
    todoList.filter(val => val.complete)
      : todoList.filter(val => !val.complete)

  return (
    < >
      {filteredTodoList.map( (todo, index) => {
        return (
          <TodoCard key={index} {...props} todo={todo}/>
        )
      })}
      
    </ >
  )
}

export default TodoList