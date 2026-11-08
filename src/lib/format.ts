const cop = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
export const formatCOP = (n: number) => cop.format(n);
export const discountPct = (price: number, compare: number | null) =>
  compare && compare > price ? Math.round((1 - price / compare) * 100) : 0;
