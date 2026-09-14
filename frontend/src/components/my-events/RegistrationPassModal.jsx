import React from 'react'
import { X, Printer, Download, CheckCircle2, Ticket, Calendar, MapPin, Building2, User, QrCode } from 'lucide-react'

const RegistrationPassModal = ({ isOpen, onClose, registration, event }) => {
  if (!isOpen || !registration || !event) return null

  const participant = registration.participantInfo || {}

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Generate a clean text file download / blob triggers
    const content = `================================================
CAMPUS CONNECT - OFFICIAL DIGITAL REGISTRATION PASS
================================================
Event Name:      ${event.title}
Organized By:    ${event.organizingCollege}
Registration ID: ${registration.registrationId}
Transaction ID:  ${registration.transactionId}
Student Name:    ${participant.name || 'Student'}
College:         ${participant.college || 'VNIT Nagpur'}
Student ID:      ${participant.studentId || 'N/A'}
Date & Time:     ${event.date} • ${event.time}
Venue:           ${event.venue}
Amount Paid:     ${registration.paymentAmount === 0 ? 'Free' : `₹${registration.paymentAmount}`}
Status:          CONFIRMED
================================================`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CampusConnect_Pass_${registration.registrationId}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#374375]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#BABDE2]/40 animate-scaleUp">
        
        {/* Printable Pass Header */}
        <div className="bg-gradient-to-r from-[#374375] to-[#2c365e] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#BABDE2] text-[#374375] font-black flex items-center justify-center text-sm">
              CC
            </div>
            <span className="font-extrabold text-sm tracking-wider uppercase text-[#BABDE2]">
              Campus Connect Pass
            </span>
          </div>

          <h2 className="text-xl font-black text-white leading-tight">
            {event.title}
          </h2>
          <p className="text-xs text-[#DFAEA1] mt-1 font-medium">
            {event.organizingCollege}
          </p>
        </div>

        {/* Pass Body Content */}
        <div className="p-6 space-y-5 bg-[#FFFCF5]">
          {/* Status and Registration ID Bar */}
          <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#BABDE2]/30 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Registration ID
              </span>
              <span className="font-mono font-bold text-[#374375] text-sm">
                {registration.registrationId}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Status
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Confirmed
              </span>
            </div>
          </div>

          {/* Participant Details */}
          <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 text-xs">
            <h4 className="font-bold text-[#374375] uppercase text-[11px] tracking-wider border-b border-slate-100 pb-2">
              Participant Information
            </h4>
            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px]">Name</span>
                <span className="font-bold text-[#374375]">{participant.name || 'Student Name'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Student ID</span>
                <span className="font-mono font-semibold">{participant.studentId || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">College</span>
                <span className="font-semibold text-slate-800 truncate block">{participant.college || 'VNIT Nagpur'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Phone</span>
                <span className="font-semibold">{participant.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Event Venue & Time */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-[#895159] shrink-0" />
              <span>
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}{' '}
                • {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-[#895159] shrink-0" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>

          {/* Simulated QR Code / Barcode View */}
          <div className="bg-white p-4 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
            <div className="w-32 h-32 mx-auto bg-slate-900 rounded-xl p-2 flex items-center justify-center">
              {/* Clean Vector SVG QR Code Graphic */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <rect x="10" y="10" width="25" height="25" rx="3" />
                <rect x="15" y="15" width="15" height="15" fill="#0f172a" />
                <rect x="65" y="10" width="25" height="25" rx="3" />
                <rect x="70" y="15" width="15" height="15" fill="#0f172a" />
                <rect x="10" y="65" width="25" height="25" rx="3" />
                <rect x="15" y="70" width="15" height="15" fill="#0f172a" />
                <rect x="45" y="10" width="10" height="20" />
                <rect x="45" y="40" width="20" height="10" />
                <rect x="70" y="45" width="20" height="20" />
                <rect x="45" y="65" width="15" height="25" />
                <rect x="65" y="75" width="25" height="15" />
              </svg>
            </div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-widest">
              QR Entry Token • Present at Gate
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-100/80 border-t border-slate-200 flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-[#374375] font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Download Pass</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPassModal
