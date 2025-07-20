import Header from './components/Header'
import Tabs from './components/Tabs'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import { useState, useEffect } from 'react'

function App() {
  // Load initial data from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure todos is always an array
        if (key === 'todo-tasks' && !Array.isArray(parsed)) {
          console.warn('Invalid todos data in localStorage, using defaults')
          return defaultValue
        }
        return parsed
      }
      return defaultValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return defaultValue
    }
  }

  const defaultTodos = [
    {
      id: 1,
      text: "Learn React fundamentals",
      complete: false,
      listId: 1,
      dueDate: "2025-07-22",
      tags: ["learning", "react"]
    },
    {
      id: 2,
      text: "Master Tailwind CSS",
      complete: false,
      listId: 1,
      dueDate: null,
      tags: ["learning", "css"]
    },
    {
      id: 3,
      text: "Build a todo app",
      complete: true,
      listId: 1,
      dueDate: "2025-07-19",
      tags: ["project", "react"]
    },
    {
      id: 4,
      text: "Finish math homework",
      complete: false,
      listId: 2,
      dueDate: "2025-07-20",
      tags: ["homework"]
    }
  ]

  const defaultLists = [
    { id: 1, name: "Programming" },
    { id: 2, name: "School" },
    { id: 3, name: "Personal" }
  ]

  const [todos, setTodos] = useState(() => loadFromStorage('todo-tasks', defaultTodos))
  const [lists, setLists] = useState(() => loadFromStorage('todo-lists', defaultLists))
  const [selectedTab, setSelectedTab] = useState(() => loadFromStorage('selected-tab', { name: 'Open', type: 'default' }))
  const [nextId, setNextId] = useState(() => loadFromStorage('next-id', 5))

  // Save functions
  const saveTodos = (newTodos) => {
    try {
      localStorage.setItem('todo-tasks', JSON.stringify(newTodos))
    } catch (error) {
      console.error('Error saving todos to localStorage:', error)
    }
  }

  const saveLists = (newLists) => {
    try {
      localStorage.setItem('todo-lists', JSON.stringify(newLists))
    } catch (error) {
      console.error('Error saving lists to localStorage:', error)
    }
  }

  const saveSelectedTab = (newTab) => {
    try {
      localStorage.setItem('selected-tab', JSON.stringify(newTab))
    } catch (error) {
      console.error('Error saving selected tab to localStorage:', error)
    }
  }

  const saveNextId = (newNextId) => {
    try {
      localStorage.setItem('next-id', JSON.stringify(newNextId))
    } catch (error) {
      console.error('Error saving next ID to localStorage:', error)
    }
  }

  // Update selectedTab with localStorage persistence
  const updateSelectedTab = (newTab) => {
    setSelectedTab(newTab)
    saveSelectedTab(newTab)
  }

  const handleNewTodo = (todoData) => {
    const newTodo = {
      id: nextId,
      complete: false,
      ...todoData
    }
    const newTodos = [...todos, newTodo]
    const newNextId = nextId + 1
    
    setTodos(newTodos)
    setNextId(newNextId)
    saveTodos(newTodos)
    saveNextId(newNextId)
  }

  const handleCompleteTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, complete: true } : todo
    )
    setTodos(newTodos)
    saveTodos(newTodos)
  }

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    saveTodos(newTodos)
  }

  const handleCreateList = (name) => {
    const newList = {
      id: Math.max(...lists.map(l => l.id)) + 1,
      name
    }
    const newLists = [...lists, newList]
    setLists(newLists)
    saveLists(newLists)
  }

  const handleDeleteList = (id) => {
    // Move todos from deleted list to first available list
    const firstListId = lists.find(list => list.id !== id)?.id
    let updatedTodos = todos
    
    if (firstListId) {
      updatedTodos = todos.map(todo =>
        todo.listId === id ? { ...todo, listId: firstListId } : todo
      )
      setTodos(updatedTodos)
      saveTodos(updatedTodos)
    }
    
    const newLists = lists.filter(list => list.id !== id)
    setLists(newLists)
    saveLists(newLists)
  }

  const handleEditList = (id, name) => {
    const newLists = lists.map(list =>
      list.id === id ? { ...list, name } : list
    )
    setLists(newLists)
    saveLists(newLists)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header todos={todos} currentView={selectedTab.name} />
      <div className='flex flex-col lg:flex-row max-h-[68vh]'>
        <Tabs
          todos={todos}
          lists={lists}
          selectedTab={selectedTab}
          setSelectedTab={updateSelectedTab}
        />
        <TodoList
          todos={todos}
          selectedTab={selectedTab}
          lists={lists}
          handleDeleteTodo={handleDeleteTodo}
          handleCompleteTodo={handleCompleteTodo}
        />
      </div>
      {/* Navigation */}
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <TodoInput
            handleNewTodo={handleNewTodo}
            lists={lists}
          />
        </div>
      </div>
    </div>
  )
}

export default App