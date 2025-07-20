import React from 'react'

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
    <div className='px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
      <p>{todo.input}</p>
      <div >
        <button 
          disabled={todo.completed} 
          className='px-4 py-2 m-2 bg-blue-950 text-white rounded hover:bg-blue-900'
          onClick={ handleComplete }>
          <h6>Completed</h6>
        </button>
        <button 
          className='px-4 py-2 m-2 bg-blue-950 text-white rounded hover:bg-blue-900'
          onClick={ handleDelete }>
          <h6>Deleted</h6>
        </button>
      </div>
    </div>
  )
}

export default TodoCard