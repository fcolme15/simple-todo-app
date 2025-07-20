import React from 'react'
import ListManager from './ListManager'



const Tabs = ({ todos, lists, selectedTab, setSelectedTab }) => {
  const allTags = [...new Set(todos.flatMap(todo => todo.tags || []))]
  
  const defaultTabs = [
    { name: 'All', icon: '📋', type: 'default' },
    { name: 'Open', icon: '⏳', type: 'default' },
    { name: 'Completed', icon: '✅', type: 'default' },
    { name: 'Today', icon: '📅', type: 'default' },
    { name: 'Overdue', icon: '⚠️', type: 'default' }
  ]

  const getTaskCount = (tabName, tabType, id = null) => {
    if (tabType === 'default') {
      switch (tabName) {
        case 'All':
          return todos.length
        case 'Open':
          return todos.filter(todo => !todo.complete).length
        case 'Completed':
          return todos.filter(todo => todo.complete).length
        case 'Today':
          const today = new Date().toISOString().split('T')[0]
          return todos.filter(todo => todo.dueDate === today && !todo.complete).length
        case 'Overdue':
          const now = new Date().toISOString().split('T')[0]
          return todos.filter(todo => 
            todo.dueDate && todo.dueDate < now && !todo.complete
          ).length
        default:
          return 0
      }
    } else if (tabType === 'list') {
      return todos.filter(todo => todo.listId === id).length
    } else if (tabType === 'tag') {
      return todos.filter(todo => todo.tags?.includes(tabName)).length
    }
    return 0
  }

  return (
    <>
      {/* Mobile Tab Bar */}
      <nav className="lg:hidden bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex space-x-1 overflow-x-auto">
          {[...defaultTabs, 
            ...lists.map(list => ({ name: list.name, icon: '📝', type: 'list', id: list.id })),
            ...allTags.map(tag => ({ name: tag, icon: '🏷️', type: 'tag' }))
          ].map((tab) => {
            const numOfTasks = getTaskCount(tab.name, tab.type, tab.id)
            const isSelected = selectedTab.name === tab.name && selectedTab.type === tab.type
            
            return (
              <button
                key={`${tab.type}-${tab.name}`}
                onClick={() => setSelectedTab({ name: tab.name, type: tab.type, id: tab.id })}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {numOfTasks}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-80 max-h-[80vh] bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-6">
          {/* Default Views */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Views</h2>
            <div className="space-y-2">
              {defaultTabs.map((tab) => {
                const numOfTasks = getTaskCount(tab.name, tab.type)
                const isSelected = selectedTab.name === tab.name && selectedTab.type === tab.type
                
                return (
                  <button
                    key={tab.name}
                    onClick={() => setSelectedTab({ name: tab.name, type: tab.type })}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isSelected 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {numOfTasks}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Lists */}
          <div className="mb-8">
            <ListManager 
              lists={lists} 
              onCreateList={(name) => {}} 
              onDeleteList={(id) => {}} 
              onEditList={(id, name) => {}}
            />
            <div className="space-y-2">
              {lists.map((list) => {
                const numOfTasks = getTaskCount(list.name, 'list', list.id)
                const isSelected = selectedTab.name === list.name && selectedTab.type === 'list'
                
                return (
                  <button
                    key={list.id}
                    onClick={() => setSelectedTab({ name: list.name, type: 'list', id: list.id })}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* <List size={18} /> */}
                      <span className="font-medium">{list.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isSelected 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {numOfTasks}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
              <div className="space-y-2">
                {allTags.map((tag) => {
                  const numOfTasks = getTaskCount(tag, 'tag')
                  const isSelected = selectedTab.name === tag && selectedTab.type === 'tag'
                  
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTab({ name: tag, type: 'tag' })}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {/* <Tag size={16} /> */}
                        <span className="font-medium">{tag}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isSelected 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {numOfTasks}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Tabs