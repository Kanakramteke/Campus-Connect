import React from 'react'

const MyEventsTabs = ({ activeTab, onTabChange, counts = {} }) => {
  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events', count: counts.upcoming },
    { id: 'past', label: 'Past Events', count: counts.past },
    { id: 'all', label: 'All Registered', count: counts.all }
  ]

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 max-w-md">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
              isActive
                ? 'bg-[#374375] text-[#FFFCF5] shadow-md'
                : 'text-slate-600 hover:text-[#374375] hover:bg-white/60'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-[#BABDE2]/40 text-[#FFFCF5]' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default MyEventsTabs
