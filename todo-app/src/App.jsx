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
    <>
      <Header todoList={todos}/>
      <Tabs todoList={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList todoList={todos} selectedTab={selectedTab} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo}/>
      <TodoInput handleNewTodo={handleNewTodo}/>
    </>
  )
}

export default App
