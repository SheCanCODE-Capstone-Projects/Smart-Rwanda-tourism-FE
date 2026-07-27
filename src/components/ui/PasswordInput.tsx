import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string
  label: string
  error?: string
}

export default function PasswordInput({ id, label, error, className = '', ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-[#1F2D2F]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-describedby={hasError ? `${id}-error` : undefined}
          aria-invalid={hasError}
          className={[
            'w-full rounded-xl border px-4 py-3 pr-12 text-sm text-[#1F2D2F] placeholder-[#68767A]',
            'transition-colors duration-150 outline-none',
            hasError
              ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-400 focus:border-red-400'
              : 'border-[#E4E9E8] bg-white hover:border-[#71996D] focus:ring-2 focus:ring-[#14637A] focus:border-[#14637A]',
            className,
          ].filter(Boolean).join(' ')}
          {...rest}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-3 flex items-center text-[#68767A] hover:text-[#1F2D2F] transition-colors"
        >
          {visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              className="w-5 h-5" aria-hidden="true">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              className="w-5 h-5" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {hasError && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}
