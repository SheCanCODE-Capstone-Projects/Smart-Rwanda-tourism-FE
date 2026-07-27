import type { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
}

export default function InputField({ id, label, error, className = '', ...rest }: InputFieldProps) {
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-[#1F2D2F]">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-invalid={hasError}
        className={[
          'w-full rounded-xl border px-4 py-3 text-sm text-[#1F2D2F] placeholder-[#68767A]',
          'transition-colors duration-150 outline-none',
          hasError
            ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-400 focus:border-red-400'
            : 'border-[#E4E9E8] bg-white hover:border-[#71996D] focus:ring-2 focus:ring-[#14637A] focus:border-[#14637A]',
          className,
        ].filter(Boolean).join(' ')}
        {...rest}
      />
      {hasError && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
}
