// Precios de referencia de las materias primas del programa, últimos 12 meses.
// Valores ILUSTRATIVOS para la demostración: no son precios oficiales.

import type { Punto } from '../components/Graficas'

const MESES = ['dic', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov']
const conMeses = (valores: number[]): Punto[] => valores.map((valor, i) => ({ etiqueta: MESES[i], valor }))
const pesos = (n: number) => `$${Math.round(n).toLocaleString('es-CO')}`

export type Producto = {
  id: string
  nombre: string
  icono: string
  unidad: string
  fuenteOficial: string
  datos: Punto[]
  formato: (n: number) => string
  /** Qué significa el comportamiento del precio para quien vende. */
  consejo: (cambioAnual: number) => string
}

export const PRODUCTOS: Producto[] = [
  {
    id: 'cafe',
    nombre: 'Café pergamino seco',
    icono: '☕',
    unidad: 'por carga de 125 kg',
    fuenteOficial: 'Federación Nacional de Cafeteros',
    datos: conMeses([2_450_000, 2_510_000, 2_480_000, 2_560_000, 2_620_000, 2_590_000, 2_650_000, 2_700_000, 2_680_000, 2_730_000, 2_760_000, 2_780_000]),
    formato: pesos,
    consejo: (c) =>
      c > 0
        ? 'El precio viene subiendo: es un buen momento para vender. Si necesitas el dinero ya, el factoring ASG te lo adelanta sin esperar el pago.'
        : 'El precio viene bajando: adelantar tus facturas te ayuda a tener caja mientras el mercado se recupera.',
  },
  {
    id: 'cacao',
    nombre: 'Cacao en grano',
    icono: '🍫',
    unidad: 'por kilo',
    fuenteOficial: 'Fedecacao',
    datos: conMeses([24_000, 23_600, 23_900, 23_100, 22_700, 22_900, 22_300, 21_900, 22_100, 21_700, 21_600, 21_500]),
    formato: pesos,
    consejo: (c) =>
      c > 0
        ? 'El precio viene subiendo: buen momento para vender tu cosecha.'
        : 'El precio viene bajando: adelantar tus facturas te da liquidez sin vender a pérdida, y las prácticas ASG bajan tu costo financiero.',
  },
  {
    id: 'ganado',
    nombre: 'Ganado gordo en pie',
    icono: '🐄',
    unidad: 'por kilo',
    fuenteOficial: 'Fedegán',
    datos: conMeses([9_100, 9_150, 9_120, 9_200, 9_260, 9_300, 9_280, 9_350, 9_420, 9_480, 9_590, 9_650]),
    formato: pesos,
    consejo: (c) =>
      c > 0
        ? 'El precio viene subiendo de forma estable. Las prácticas bajas en carbono te dan además una mejor tasa al adelantar tus facturas.'
        : 'El precio viene bajando: planifica tus ventas y usa el factoring para cubrir gastos.',
  },
  {
    id: 'leche',
    nombre: 'Leche cruda pagada al productor',
    icono: '🥛',
    unidad: 'por litro',
    fuenteOficial: 'Unidad de Seguimiento de Precios de la Leche (MADR)',
    datos: conMeses([1_900, 1_905, 1_910, 1_920, 1_915, 1_930, 1_940, 1_945, 1_950, 1_960, 1_970, 1_980]),
    formato: pesos,
    consejo: (c) =>
      c > 0
        ? 'Subidas pequeñas pero constantes: la leche da un ingreso estable para planificar.'
        : 'El precio viene bajando: revisa tus costos y aprovecha el pago anticipado para no endeudarte.',
  },
]

export function comportamiento(p: Producto) {
  const valores = p.datos.map((d) => d.valor)
  const actual = valores[valores.length - 1]
  const anterior = valores[valores.length - 2]
  const inicio = valores[0]
  const maximo = Math.max(...valores)
  const minimo = Math.min(...valores)
  return {
    actual,
    cambioMensual: ((actual - anterior) / anterior) * 100,
    cambioAnual: ((actual - inicio) / inicio) * 100,
    maximo,
    mesMaximo: p.datos[valores.indexOf(maximo)].etiqueta,
    minimo,
    mesMinimo: p.datos[valores.indexOf(minimo)].etiqueta,
  }
}
