import React from 'react'
import { X, Edit2, Save } from 'lucide-react'
import { useState } from 'react'
const ListManager = ({ lists, onCreateList, onDeleteList, onEditList }) => {
    const [isCreating, setIsCreating] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [newListName, setNewListName] = useState('')
    const [editValue, setEditValue] = useState('')
  
    const handleCreate = () => {
      if (newListName.trim()) {
        onCreateList(newListName.trim())
        setNewListName('')
        setIsCreating(false)
      }
    }
  
    const handleEdit = (list) => {
      setEditingId(list.id)
      setEditValue(list.name)
    }
  
    const handleSaveEdit = () => {
      if (editValue.trim()) {
        onEditList(editingId, editValue.trim())
        setEditingId(null)
        setEditValue('')
      }
    }
  
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Lists</h3>
          <button
            onClick={() => setIsCreating(true)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            + New List
          </button>
        </div>
        
        <div className="space-y-2">
          {lists.map((list) => (
            <div key={list.id} className="flex items-center justify-between group">
              {editingId === list.id ? (
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Save size={14} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between flex-1">
                  <span className="text-gray-300 text-sm">{list.name}</span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(list)}
                      className="text-gray-400 hover:text-blue-300"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDeleteList(list.id)}
                      className="text-gray-400 hover:text-red-300"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isCreating && (
            <div className="flex items-center space-x-2">
              <input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                placeholder="List name..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                autoFocus
              />
              <button
                onClick={handleCreate}
                className="text-green-400 hover:text-green-300"
              >
                <Save size={14} />
              </button>
              <button
                onClick={() => {
                  setIsCreating(false)
                  setNewListName('')
                }}
                className="text-gray-400 hover:text-gray-300"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

export default ListManager