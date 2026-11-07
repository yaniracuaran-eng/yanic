// Cálculos del simulador de factoring ASG para proveedores.
// Todos los valores son ILUSTRATIVOS (trabajo académico): ajústalos aquí si tu grupo tiene mejores datos.

/** Tasa de descuento anual que pagaría un proveedor sin ningún beneficio ASG (24% = 2% mensual). */
export const TASA_BASE_ANUAL = 24

/** Tasa mínima a la que se puede llegar, aunque cumpla todas las prácticas. */
export const TASA_MINIMA_ANUAL = 18

export type PracticaASG = {
  id: string
  nombre: string
  descripcion: string
  /** Puntos porcentuales que se restan a la tasa anual. */
  reduccion: number
}

export const PRACTICAS_ASG: PracticaASG[] = [
  {
    id: 'deforestacion',
    nombre: 'Predio libre de deforestación',
    descripcion: 'Verificado por monitoreo satelital con la plataforma Ábora.',
    reduccion: 2,
  },
  {
    id: 'carbono',
    nombre: 'Prácticas bajas en carbono',
    descripcion: 'Aporta a descarbonizar el Alcance 3 de la cadena agrícola y ganadera.',
    reduccion: 1.5,
  },
  {
    id: 'empaques',
    nombre: 'Empaques sostenibles',
    descripcion: 'Usa materiales reciclados, reutilizables o eco-diseñados.',
    reduccion: 1,
  },
  {
    id: 'trazabilidad',
    nombre: 'Trazabilidad de origen',
    descripcion: 'Registra el origen de su producción en el portal de proveedores.',
    reduccion: 0.5,
  },
]

export type ResultadoSimulacion = {
  tasaAplicada: number
  descuentoSinASG: number
  descuentoConASG: number
  recibeHoy: number
  ahorro: number
}

/** Descuento simple: valor × tasa anual × días / 360. */
function descuento(valor: number, tasaAnual: number, dias: number) {
  return valor * (tasaAnual / 100) * (dias / 360)
}

export function simular(valorFactura: number, dias: number, practicasCumplidas: string[]): ResultadoSimulacion {
  const reduccionTotal = PRACTICAS_ASG.filter((p) => practicasCumplidas.includes(p.id)).reduce(
    (suma, p) => suma + p.reduccion,
    0,
  )
  const tasaAplicada = Math.max(TASA_MINIMA_ANUAL, TASA_BASE_ANUAL - reduccionTotal)
  const descuentoSinASG = descuento(valorFactura, TASA_BASE_ANUAL, dias)
  const descuentoConASG = descuento(valorFactura, tasaAplicada, dias)

  return {
    tasaAplicada,
    descuentoSinASG,
    descuentoConASG,
    recibeHoy: valorFactura - descuentoConASG,
    ahorro: descuentoSinASG - descuentoConASG,
  }
}

const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function pesos(valor: number) {
  return formatoPesos.format(Math.round(valor))
}

export function porcentaje(valor: number) {
  return `${valor.toLocaleString('es-CO', { maximumFractionDigits: 1 })}%`
}
