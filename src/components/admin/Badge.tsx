type BadgeVariant = 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'gray' | 'lime'

const variants: Record<BadgeVariant, string> = {
  green:  'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red:    'bg-red-100 text-red-700',
  blue:   'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  gray:   'bg-gray-100 text-gray-600',
  lime:   'bg-lime-100 text-lime-700',
}

interface BadgeProps {
  label: string
  variant: BadgeVariant
}

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {label}
    </span>
  )
}

// Helper mappers
export function userStatusBadge(status: string): BadgeVariant {
  return status === 'ACTIVE' ? 'green' : status === 'INACTIVE' ? 'gray' : 'red'
}

export function userRoleBadge(role: string): BadgeVariant {
  return role === 'ADMIN' ? 'red' : role === 'PROVIDER' ? 'purple' : 'blue'
}

export function providerStatusBadge(status: string): BadgeVariant {
  return status === 'VERIFIED' ? 'green' : status === 'PENDING' ? 'yellow' : 'red'
}

export function bookingStatusBadge(status: string): BadgeVariant {
  return status === 'CONFIRMED' ? 'green' : status === 'COMPLETED' ? 'blue'
    : status === 'CANCELLED' ? 'red' : 'yellow'
}

export function reviewStatusBadge(status: string): BadgeVariant {
  return status === 'APPROVED' ? 'green' : status === 'PENDING' ? 'yellow' : 'gray'
}

export function packageStatusBadge(status: string): BadgeVariant {
  return status === 'PUBLISHED' ? 'green' : status === 'DRAFT' ? 'yellow' : 'gray'
}
