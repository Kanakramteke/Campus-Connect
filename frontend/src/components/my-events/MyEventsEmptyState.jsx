import React from 'react'
import { CalendarX, Compass, Calendar, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MyEventsEmptyState = ({ type = 'all', onExplore }) => {
  const navigate = useNavigate()

  const config = {
    all: {
      icon: CalendarX,
      title: 'No events yet',
      subtitle: 'You haven\'t registered for any events across Nagpur colleges.',
      buttonText: 'Explore Events',
      action: () => (onExplore ? onExplore() : navigate('/technical-events'))
    },
    upcoming: {
      icon: Calendar,
      title: 'Nothing coming up',
      subtitle: 'You don\'t have any upcoming registered events scheduled.',
      buttonText: 'Discover Events',
      action: () => (onExplore ? onExplore() : navigate('/technical-events'))
    },
    past: {
      icon: Clock,
      title: 'No past events',
      subtitle: 'Your completed event registrations and participation history will appear here.',
      buttonText: 'Browse Events',
      action: () => (onExplore ? onExplore() : navigate('/technical-events'))
    }
  }

  const current = config[type] || config.all
  const Icon = current.icon

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#BABDE2]/40 text-center space-y-5 max-w-md mx-auto shadow-sm my-6">
      <div className="w-20 h-20 rounded-full bg-[#BABDE2]/20 text-[#374375] flex items-center justify-center mx-auto ring-8 ring-[#BABDE2]/10">
        <Icon className="w-10 h-10 text-[#374375]" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-black text-[#374375]">
          {current.title}
        </h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">
          {current.subtitle}
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={current.action}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#374375] hover:bg-[#2c365e] text-white font-bold text-xs rounded-xl shadow-md transition-all duration-200 cursor-pointer"
        >
          <Compass className="w-4 h-4 text-[#DFAEA1]" />
          <span>{current.buttonText}</span>
        </button>
      </div>
    </div>
  )
}

export default MyEventsEmptyState
