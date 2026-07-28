import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  error?: string
  onChange?: (value: string) => void
}

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string
  error?: string
  rows?: number
  onChange?: (value: string) => void
}

function callOnChange<T extends HTMLInputElement | HTMLTextAreaElement>(
  handler: ((value: string) => void) | undefined,
  e: React.ChangeEvent<T>
) {
  if (handler) handler(e.target.value)
}

export function FormInput({ label, error, id, onChange, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#1F2D2F] mb-1">
        {label}
        {rest.required && <span className="text-red-500 ml-0.5"> *</span>}
      </label>
      <input
        id={id}
        onChange={e => callOnChange(onChange, e)}
        {...rest}
        className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14637A] transition-colors
          ${error ? 'border-red-400 bg-red-50' : 'border-[#E4E9E8] bg-[#F7F9F8]'} ${rest.className ?? ''}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function FormTextarea({ label, error, id, rows = 3, onChange, ...rest }: TextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#1F2D2F] mb-1">{label}</label>
      <textarea
        id={id}
        rows={rows}
        onChange={e => callOnChange(onChange, e)}
        {...rest}
        className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14637A] resize-none transition-colors
          ${error ? 'border-red-400 bg-red-50' : 'border-[#E4E9E8] bg-[#F7F9F8]'} ${rest.className ?? ''}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function FormSelect({
  label,
  error,
  id,
  children,
  ...rest
}: {
  label: string
  error?: string
  id?: string
  children: React.ReactNode
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#1F2D2F] mb-1">{label}</label>
      <select
        id={id}
        {...rest}
        className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14637A] bg-[#F7F9F8]
          ${error ? 'border-red-400' : 'border-[#E4E9E8]'}`}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
