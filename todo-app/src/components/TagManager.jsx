import React from 'react'

const TagManager = ({ allTags, onCreateTag }) => {
    const [isCreating, setIsCreating] = useState(false)
    const [newTagName, setNewTagName] = useState('')
  
    const handleCreate = () => {
      if (newTagName.trim() && !allTags.includes(newTagName.trim())) {
        onCreateTag(newTagName.trim())
        setNewTagName('')
        setIsCreating(false)
      }
    }
  
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Tags</h3>
          <button
            onClick={() => setIsCreating(true)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            + New Tag
          </button>
        </div>
        
        {isCreating && (
          <div className="flex items-center space-x-2 mb-3">
            <input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="Tag name..."
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
                setNewTagName('')
              }}
              className="text-gray-400 hover:text-gray-300"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    )
  }

export default TagManager