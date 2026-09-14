import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, RotateCcw, Check } from 'lucide-react'
import EventFilters from './EventFilters'

export default function FilterDrawer({
  isOpen,
  onClose,
  type,
  colleges,
  selectedCategory,
  onSelectCategory,
  selectedCollege,
  onSelectCollege,
  selectedDateOption,
  onSelectDateOption,
  customDate,
  onChangeCustomDate,
  selectedFeeOption,
  onSelectFeeOption,
  onClearAll
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#374375]/50 backdrop-blur-xs z-50 md:hidden"
          />

          {/* Drawer / Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#FFFCF5] rounded-t-3xl border-t border-[#BABDE2] shadow-2xl z-50 md:hidden flex flex-col overflow-hidden text-[#374375]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#BABDE2]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#895159]" />
                <h3 className="text-base font-black text-[#374375]">Filter Events</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#374375] hover:bg-[#BABDE2]/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Body */}
            <div className="flex-1 p-5 overflow-y-auto">
              <EventFilters
                type={type}
                colleges={colleges}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
                selectedCollege={selectedCollege}
                onSelectCollege={onSelectCollege}
                selectedDateOption={selectedDateOption}
                onSelectDateOption={onSelectDateOption}
                customDate={customDate}
                onChangeCustomDate={onChangeCustomDate}
                selectedFeeOption={selectedFeeOption}
                onSelectFeeOption={onSelectFeeOption}
              />
            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-[#BABDE2]/30 bg-[#FFFCF5] flex items-center gap-3">
              <button
                onClick={() => {
                  onClearAll()
                  onClose()
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#BABDE2]/30 text-[#374375] font-bold text-xs hover:bg-[#BABDE2]/50 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#374375] text-[#FFFCF5] font-bold text-xs hover:bg-[#895159] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" /> Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
