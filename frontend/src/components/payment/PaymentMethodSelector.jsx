import React from 'react'
import { QrCode, CreditCard, CheckCircle2 } from 'lucide-react'

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
  const methods = [
    {
      id: 'upi',
      name: 'UPI / VPA',
      description: 'Google Pay, PhonePe, Paytm, BHIM UPI',
      icon: QrCode,
      tag: 'Recommended'
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay, Maestro',
      icon: CreditCard
    }
  ]

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        Select Payment Method
      </label>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = selectedMethod === method.id

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`relative flex items-start gap-3.5 p-4 rounded-xl text-left border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#374375] bg-[#BABDE2]/15 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-[#BABDE2] hover:bg-slate-50/60'
              }`}
            >
              {/* Radio Indicator */}
              <div className="pt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-[#374375] fill-[#374375]/10" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white" />
                )}
              </div>

              {/* Icon & Label */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#374375]' : 'text-slate-500'}`} />
                  <span className="font-bold text-[#374375] text-sm truncate">
                    {method.name}
                  </span>
                  {method.tag && (
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#895159] text-white">
                      {method.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {method.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PaymentMethodSelector
