import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCampus } from '../../context/CampusContext'
import EnrollmentForm from './EnrollmentForm'
import EnrollmentSuccess from './EnrollmentSuccess'

export default function EnrollmentModal({ isOpen, onClose, event, onNavigate }) {
  const { enrollInEvent, saveDraftEnrollment } = useCampus()
  const navigate = useNavigate()
  const [registrationResult, setRegistrationResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !event) return null

  const handleFormSubmit = (participantInfo) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (event.isFree) {
        // Free event -> Enroll immediately and show success modal
        const result = enrollInEvent(event.id, participantInfo)
        setRegistrationResult(result)
      } else {
        // Paid event -> Save draft participant info and navigate to payment page
        saveDraftEnrollment(event.id, participantInfo)
        onClose()
        navigate(`/events/${event.id}/payment`)
      }
    }, 400)
  }

  const handleClose = () => {
    setRegistrationResult(null)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#374375]/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#FFFCF5] rounded-3xl p-6 border border-[#BABDE2] shadow-2xl z-10 text-[#374375] max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#BABDE2]/30">
            <div>
              <h3 className="text-base font-black text-[#374375]">
                {registrationResult ? 'Registration Complete' : `Enroll for ${event.title}`}
              </h3>
              <p className="text-[11px] font-bold text-[#895159]">
                {event.organizingCollege}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl text-[#374375]/60 hover:text-[#374375] hover:bg-[#BABDE2]/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-4">
            {registrationResult ? (
              <EnrollmentSuccess
                event={event}
                registration={registrationResult}
                onDone={handleClose}
                onNavigate={onNavigate}
              />
            ) : (
              <EnrollmentForm
                event={event}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
