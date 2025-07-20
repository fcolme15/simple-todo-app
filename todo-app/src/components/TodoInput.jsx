import React from 'react'
import { useState } from 'react'
import { Plus } from 'lucide-react'


const TodoInput = ({ handleNewTodo, lists }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectedListId, setSelectedListId] = useState(lists[0]?.id || '')
  const [dueDate, setDueDate] = useState('')
  const [tags, setTags] = useState('')

  const handleNewTask = () => {
    if (!inputValue.trim()) return
    
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    handleNewTodo({
      text: inputValue.trim(),
      listId: selectedListId,
      dueDate: dueDate || null,
      tags: tagArray
    })
    
    setInputValue('')
    setTags('')
    setDueDate('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNewTask()
    }
  }

  return (
    <div className="border-t border-gray-700 bg-gray-800 p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={handleNewTask}
            disabled={!inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {lists.map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
          
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-0"
          />
        </div>
      </div>
    </div>
  )
}

export default TodoInput