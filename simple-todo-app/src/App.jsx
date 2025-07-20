import Header from './components/Header'
import Tabs from './components/Tabs'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import { useState, useEffect } from 'react'
function App() {

  const [todos, setTodos] = useState([])

  const [selectedTab, setSelectedTab] = useState('Open')

  function handleNewTodo (newTodo) {
    const newTodoList = [...todos, {input: newTodo, complete: false}]
    setTodos(newTodoList)
    saveTodo(newTodoList)
  }

  function handleCompleteTodo (index) {
    const newTodoList = [...todos]
    const updatedTask = newTodoList[index]
    updatedTask['complete'] = true
    newTodoList[index] = updatedTask
    setTodos(newTodoList)
    saveTodo(newTodoList)
  }

  function handleDeleteTodo (index) {
    const newTodoList = todos.filter((val, valIndex) => {
      return valIndex != index
    })
    setTodos(newTodoList)
    saveTodo(newTodoList)
  }

  function saveTodo(currTodos) {
    localStorage.setItem('todo-tasks', JSON.stringify({todos:currTodos}))
  }

  useEffect (() => {
    if (!localStorage || !localStorage.getItem('todo-tasks')) {return}
    let db = JSON.parse(localStorage.getItem('todo-tasks'))
    setTodos(db.todos)
  }, [])

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col'>
      <Header todoList={todos}/>
      <div className='flex flex-1 flex-col lg:flex-row'>
        <Tabs todoList={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className='flex-1 flex flex-col'>
          <TodoList todoList={todos} selectedTab={selectedTab} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo}/>
          <TodoInput handleNewTodo={handleNewTodo}/>
        </div>
      </div>
    </div>
  )
}

export default App
