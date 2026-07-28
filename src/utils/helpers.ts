export const formatCurrency = (amount: number, currency = 'RWF') =>
  new Intl.NumberFormat('en-RW', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-RW', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${value}T00:00:00`),
  );
