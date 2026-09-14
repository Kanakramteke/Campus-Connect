import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCampus } from '../../context/CampusContext'
import OrderSummary from '../../components/payment/OrderSummary'
import PaymentMethodSelector from '../../components/payment/PaymentMethodSelector'
import UPIPaymentForm from '../../components/payment/UPIPaymentForm'
import CardPaymentForm from '../../components/payment/CardPaymentForm'
import PaymentProcessing from '../../components/payment/PaymentProcessing'
import PaymentSuccessModal from '../../components/payment/PaymentSuccessModal'
import PaymentFailureModal from '../../components/payment/PaymentFailureModal'
import PaymentCancelModal from '../../components/payment/PaymentCancelModal'
import { ArrowLeft, ShieldCheck, CheckCircle2, Ticket, Lock } from 'lucide-react'

const PaymentPage = ({ eventId: propEventId, onNavigate }) => {
  const { id: paramId } = useParams()
  const navigate = useNavigate()
  const { allEvents, isRegistered, getRegistration, draftEnrollment, enrollInEvent, user } = useCampus()

  const id = paramId || propEventId

  const [event, setEvent] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(null) // registration object
  const [paymentFailure, setPaymentFailure] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  // Find event
  useEffect(() => {
    const found = allEvents.find(e => e.id === id)
    if (found) {
      setEvent(found)
      // Free events do not require payment -> redirect back to event details
      if (found.isFree) {
        navigate(`/events/${id}`, { replace: true })
      }
    }
  }, [id, allEvents, navigate])

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Ticket className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#374375]">Event Not Found</h2>
        <p className="text-slate-500">The requested event payment page could not be loaded.</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#374375] text-white font-semibold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    )
  }

  // Check Duplicate Payment Protection
  const existingRegistration = getRegistration(event.id)
  if (existingRegistration) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl p-8 text-center space-y-6 border border-[#BABDE2]/40 shadow-xl">
          <div className="w-20 h-20 bg-[#BABDE2]/30 text-[#374375] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#374375]" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider rounded-full">
              Registration Confirmed
            </span>
            <h2 className="text-2xl font-black text-[#374375]">
              Payment Already Completed
            </h2>
            <p className="text-sm text-slate-600">
              You have already completed payment and registered for <span className="font-bold text-[#374375]">{event.title}</span>.
            </p>
          </div>

          <div className="bg-[#FFFCF5] p-4 rounded-2xl border border-[#DFAEA1]/40 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Registration ID:</span>
              <span className="font-mono font-bold text-[#374375]">{existingRegistration.registrationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono font-semibold text-slate-700">{existingRegistration.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="font-bold text-[#374375]">₹{existingRegistration.paymentAmount}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate ? onNavigate('my-events') : navigate('/my-events')}
              className="flex-1 py-3 px-5 bg-[#374375] hover:bg-[#2c365e] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              View My Events
            </button>
            <button
              onClick={() => onNavigate ? onNavigate('events', event.id) : navigate(`/events/${event.id}`)}
              className="flex-1 py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
            >
              View Event Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Handle Payment Submit
  const handlePaymentSubmit = (paymentInfo) => {
    setIsProcessing(true)
    setPaymentFailure(false)

    // Simulate safe processing delay
    setTimeout(() => {
      // 95% success simulation, easy retry setup if needed
      const isSuccess = true
      setIsProcessing(false)

      if (isSuccess) {
        const participantInfo = draftEnrollment?.participantInfo || {
          name: user.fullName,
          email: user.email,
          phone: user.phone,
          college: user.college,
          studentId: user.studentId
        }

        const reg = enrollInEvent(event.id, participantInfo, {
          paymentMethod: paymentInfo.method,
          amountPaid: event.registrationFee,
          transactionId: `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`
        })

        setPaymentSuccess(reg)
      } else {
        setPaymentFailure(true)
      }
    }, 2200)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header & Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowCancelModal(true)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#374375] hover:text-[#2c365e] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Event
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      {/* Main Page Title */}
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[#374375] tracking-tight">
          Event Registration Checkout
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Complete your registration payment for <span className="font-semibold text-slate-700">{event.title}</span>.
        </p>
      </div>

      {/* Responsive Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Payment Method Selection & Dynamic Form (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#BABDE2]/40 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#374375] mb-1">
              Payment Information
            </h2>
            <p className="text-xs text-slate-500">
              Select your preferred payment mode below. Free from additional convenience charges.
            </p>
          </div>

          {/* Payment Method Selector */}
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onSelect={(method) => setSelectedMethod(method)}
          />

          {/* Form container */}
          <div className="pt-2">
            {selectedMethod === 'upi' ? (
              <UPIPaymentForm
                fee={event.registrationFee}
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
              />
            ) : (
              <CardPaymentForm
                fee={event.registrationFee}
                onSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
          <OrderSummary event={event} fee={event.registrationFee} />
        </div>
      </div>

      {/* Modals & Overlays */}
      {isProcessing && <PaymentProcessing eventName={event.title} />}

      {paymentSuccess && (
        <PaymentSuccessModal
          registration={paymentSuccess}
          event={event}
          onClose={() => setPaymentSuccess(null)}
        />
      )}

      {paymentFailure && (
        <PaymentFailureModal
          event={event}
          eventId={event.id}
          onRetry={() => {
            setPaymentFailure(false)
          }}
        />
      )}

      {showCancelModal && (
        <PaymentCancelModal
          onContinue={() => setShowCancelModal(false)}
          onLeave={() => {
            setShowCancelModal(false)
            navigate(`/events/${event.id}`)
          }}
        />
      )}
    </div>
  )
}

export default PaymentPage
