// Indicadores financieros y productivos del piloto, mes a mes.
// Datos SIMULADOS para la demostración (6 primeros meses de un piloto de 12).

import type { Punto } from '../components/Graficas'

export const MESES_PILOTO = ['jun', 'jul', 'ago', 'sep', 'oct', 'nov']

export type Serie = {
  id: string
  nombre: string
  descripcion: string
  tipo: 'barras' | 'linea'
  /** Si bajar es bueno (ej. morosidad), la flecha de cambio se colorea al revés. */
  menosEsMejor?: boolean
  formato: (n: number) => string
  datos: Punto[]
}

const conMeses = (valores: number[]): Punto[] => valores.map((valor, i) => ({ etiqueta: MESES_PILOTO[i], valor }))
const millones = (n: number) => `$${n.toLocaleString('es-CO')} M`
const pct = (n: number) => `${n.toLocaleString('es-CO', { maximumFractionDigits: 1 })}%`
const cantidad = (unidad: string) => (n: number) => `${n.toLocaleString('es-CO')} ${unidad}`

export const FINANCIEROS: Serie[] = [
  {
    id: 'facturas',
    nombre: 'Facturas financiadas en el mes',
    descripcion: 'Valor de las facturas de proveedores que se pagaron por adelantado.',
    tipo: 'barras',
    formato: millones,
    datos: conMeses([820, 1140, 1530, 1890, 2260, 2610]),
  },
  {
    id: 'cartera',
    nombre: 'Cartera de microcrédito activa',
    descripcion: 'Saldo prestado a tenderos de Pideky al cierre de cada mes.',
    tipo: 'linea',
    formato: millones,
    datos: conMeses([1900, 3400, 4900, 6300, 7600, 8700]),
  },
  {
    id: 'tasa',
    nombre: 'Tasa promedio del factoring ASG',
    descripcion: 'Baja a medida que más proveedores certifican prácticas sostenibles (tasa base: 24%).',
    tipo: 'linea',
    menosEsMejor: true,
    formato: pct,
    datos: conMeses([23.1, 22.9, 22.7, 22.6, 22.6, 22.6]),
  },
  {
    id: 'morosidad',
    nombre: 'Morosidad a más de 30 días',
    descripcion: 'Parte de la cartera con pagos atrasados. Meta: máximo 5%.',
    tipo: 'linea',
    menosEsMejor: true,
    formato: pct,
    datos: conMeses([2.1, 2.6, 2.9, 3.1, 3.3, 3.2]),
  },
]

export const PRODUCTIVOS: Serie[] = [
  {
    id: 'cafe',
    nombre: 'Café entregado por proveedores del programa',
    descripcion: 'Toneladas de café pergamino recibidas en el mes.',
    tipo: 'barras',
    formato: cantidad('t'),
    datos: conMeses([410, 455, 520, 600, 690, 740]),
  },
  {
    id: 'cacao',
    nombre: 'Cacao entregado',
    descripcion: 'Toneladas de cacao en grano recibidas en el mes.',
    tipo: 'barras',
    formato: cantidad('t'),
    datos: conMeses([85, 92, 98, 110, 118, 126]),
  },
  {
    id: 'leche',
    nombre: 'Leche entregada por ganaderos',
    descripcion: 'Miles de litros recibidos en el mes.',
    tipo: 'barras',
    formato: cantidad('mil L'),
    datos: conMeses([1250, 1290, 1340, 1380, 1420, 1470]),
  },
  {
    id: 'hectareas',
    nombre: 'Hectáreas monitoreadas por satélite (Ábora)',
    descripcion: 'Área de predios verificada como libre de deforestación.',
    tipo: 'linea',
    formato: cantidad('ha'),
    datos: conMeses([1400, 2300, 3100, 3900, 4700, 5400]),
  },
  {
    id: 'sostenible',
    nombre: 'Materias primas abastecidas de forma sostenible',
    descripcion: 'Avance hacia la meta corporativa de más del 80% al 2030.',
    tipo: 'linea',
    formato: pct,
    datos: conMeses([64, 66, 67, 69, 70, 72]),
  },
]

/** Último valor y cambio frente al mes anterior. */
export function resumen(serie: Serie) {
  const n = serie.datos.length
  const actual = serie.datos[n - 1].valor
  const anterior = serie.datos[n - 2].valor
  const cambio = anterior === 0 ? 0 : ((actual - anterior) / anterior) * 100
  const sube = actual > anterior
  const igual = actual === anterior
  const esBueno = igual ? null : serie.menosEsMejor ? !sube : sube
  return { actual, cambio, sube, igual, esBueno }
}
