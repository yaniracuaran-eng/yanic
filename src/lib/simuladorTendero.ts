// Cálculos del simulador de microcrédito para tenderos de Pideky.
// Imita, de forma simple, cómo un modelo de IA usaría el historial de compras como respaldo.
// Todos los valores son ILUSTRATIVOS (trabajo académico): ajústalos aquí si tu grupo tiene mejores datos.

export type Factor = {
  id: 'frecuencia' | 'antiguedad' | 'puntualidad' | 'volumen'
  nombre: string
  consejo: string
  puntos: number
  maximo: number
}

export type Nivel = {
  nombre: string
  /** Puntaje mínimo para este nivel. */
  desde: number
  /** Cupo como porcentaje de la compra mensual. */
  porcentajeCupo: number
  /** Tasa de interés mensual ilustrativa. */
  tasaMensual: number
}

export const NIVELES: Nivel[] = [
  { nombre: 'En construcción', desde: 0, porcentajeCupo: 0, tasaMensual: 0 },
  { nombre: 'Básico', desde: 400, porcentajeCupo: 50, tasaMensual: 2.0 },
  { nombre: 'Bueno', desde: 600, porcentajeCupo: 100, tasaMensual: 1.8 },
  { nombre: 'Excelente', desde: 800, porcentajeCupo: 150, tasaMensual: 1.5 },
]

export const CUPO_MAXIMO = 10_000_000

export type DatosTendero = {
  pedidosPorMes: number
  valorPromedioPedido: number
  mesesEnPideky: number
  porcentajePagosATiempo: number
}

export type ResultadoTendero = {
  puntaje: number
  nivel: Nivel
  siguienteNivel: Nivel | null
  compraMensual: number
  cupo: number
  factores: Factor[]
}

const limitar = (x: number) => Math.min(1, Math.max(0, x))

export function simularTendero(d: DatosTendero): ResultadoTendero {
  const compraMensual = d.pedidosPorMes * d.valorPromedioPedido

  const factores: Factor[] = [
    {
      id: 'puntualidad',
      nombre: 'Pagos a tiempo',
      consejo: 'Es lo que más pesa: paga tus pedidos en la fecha acordada.',
      maximo: 350,
      puntos: Math.round(limitar((d.porcentajePagosATiempo - 50) / 50) * 350),
    },
    {
      id: 'frecuencia',
      nombre: 'Frecuencia de pedidos',
      consejo: 'Haz pedidos más seguidos: 8 o más al mes da el puntaje completo.',
      maximo: 300,
      puntos: Math.round(limitar(d.pedidosPorMes / 8) * 300),
    },
    {
      id: 'antiguedad',
      nombre: 'Tiempo usando Pideky',
      consejo: 'Tu historial crece con el tiempo: 24 meses da el puntaje completo.',
      maximo: 250,
      puntos: Math.round(limitar(d.mesesEnPideky / 24) * 250),
    },
    {
      id: 'volumen',
      nombre: 'Compra mensual',
      consejo: 'Comprar $3.000.000 o más al mes da el puntaje completo.',
      maximo: 100,
      puntos: Math.round(limitar(compraMensual / 3_000_000) * 100),
    },
  ]

  const puntaje = factores.reduce((suma, f) => suma + f.puntos, 0)
  const indice = NIVELES.findLastIndex((n) => puntaje >= n.desde)
  const nivel = NIVELES[indice]
  const siguienteNivel = NIVELES[indice + 1] ?? null
  const cupo = Math.min(CUPO_MAXIMO, Math.round((compraMensual * nivel.porcentajeCupo) / 100 / 10_000) * 10_000)

  return { puntaje, nivel, siguienteNivel, compraMensual, cupo, factores }
}
