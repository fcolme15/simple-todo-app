import Header from './components/Header'
import Tabs from './components/Tabs'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import { useState } from 'react'
function App() {

  const [todos, setTodos] = useState([
    { input : 'First todo', complete: true },
    { input : '2 todo', complete: false },
    { input : '3 todo', complete: false },
    { input : '4 todo', complete: true }
  ])

  const [selectedTab, setSelectedTab] = useState('Open')

  function handleNewTodo (newTodo) {
    setTodos([...todos, {input: newTodo, complete: false}])
  }

  function handleCompleteTodo (index) {
    const newTodoList = [...todos]
    const updatedTask = newTodoList[index]
    updatedTask['complete'] = true
    newTodoList[index] = updatedTask
    setTodos(newTodoList)
  }

  function handleDeleteTodo (index) {
    const newTodoList = todos.filter((val, valIndex) => {
      return valIndex != index
    })
    setTodos(newTodoList)
  }

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
