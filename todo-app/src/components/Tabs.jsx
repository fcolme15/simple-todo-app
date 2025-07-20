import React from 'react'

const Tabs = ({ todoList, selectedTab, setSelectedTab }) => {
  const tabs = [
    { name: 'All', icon: '📋' },
    { name: 'Open', icon: '⏳' },
    { name: 'Completed', icon: '✅' }
  ]

  return (
    <>
      {/* Mobile Tab Bar */}
      <nav className="lg:hidden bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const numOfTasks = tab.name === 'All' ? todoList.length 
              : tab.name === 'Open' ? 
                todoList.filter(val => !val.complete).length 
                : todoList.filter(val => val.complete).length
            
            return (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(tab.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  tab.name === selectedTab 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tab.name === selectedTab 
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
      <nav className="hidden lg:block w-80 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Lists</h2>
          <div className="space-y-2">
            {tabs.map((tab) => {
              const numOfTasks = tab.name === 'All' ? todoList.length 
                : tab.name === 'Open' ? 
                  todoList.filter(val => !val.complete).length 
                  : todoList.filter(val => val.complete).length
              
              return (
                <button
                  key={tab.name}
                  onClick={() => setSelectedTab(tab.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                    tab.name === selectedTab 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tab.name === selectedTab 
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
      </nav>
    </>
  )
}
export default Tabs