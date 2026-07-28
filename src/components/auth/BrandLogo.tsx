interface BrandLogoProps {
  dark?: boolean
}

export default function BrandLogo({ dark = false }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-2.5" aria-label="RwandaWays">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#B7D91D]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#062F36"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <p className={`text-xl font-bold tracking-tight ${dark ? 'text-[#062F36]' : 'text-white'}`}>
        Rwanda<span className={dark ? 'text-[#14637A]' : 'text-[#B7D91D]'}>Ways</span>
      </p>
    </div>
  )
}
