import React from 'react'

const Tabs = (props) => { 
  const tabs = ['All', 'Open', 'Completed']
  const { todoList, selectedTab, setSelectedTab } = props

  return (
    <nav>
      {tabs.map((tab, index) => {
        const numOfTasks = tab === 'All' ? todoList.length 
        : tab === 'Open' ? 
        todoList.filter(val => !val.complete).length 
            : todoList.filter(val => val.complete).length
        return (
          <button onClick={() => {setSelectedTab(tab)}} key={index} className={'px-4 py-2 m-2 bg-blue-950 text-white rounded hover:bg-blue-900 ' + (tab===selectedTab ? 'bg-blue-800' : ' ')}> 
            <h4>{tab}
              <span className='text-gray-500'>
                &nbsp;{numOfTasks}
              </span>
            </h4>
          </button>
        )
      })}
      <hr/>
    </nav>
  )
}

export default Tabs