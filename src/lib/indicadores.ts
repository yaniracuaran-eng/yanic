// Indicadores de resultado del programa (sección 8 del documento).
// Los valores "actuales" son SIMULADOS (mes 6 de un piloto imaginario) para la demostración.

export type Estado = 'cumplida' | 'en-camino' | 'linea-base'

export type Indicador = {
  dimension: 'Ambiental (A)' | 'Social (S)' | 'Financiero' | 'Gobierno (G)'
  nombre: string
  valor: string
  meta: string
  /** Avance hacia la meta, de 0 a 1. Null cuando aún se mide la línea base. */
  avance: number | null
  estado: Estado
  nota?: string
}

export const MES_DEL_PILOTO = 6

export const INDICADORES: Indicador[] = [
  {
    dimension: 'Ambiental (A)',
    nombre: 'Proveedores financiados con predios libres de deforestación (verificados por Ábora)',
    valor: '100%',
    meta: '100%',
    avance: 1,
    estado: 'cumplida',
  },
  {
    dimension: 'Ambiental (A)',
    nombre: 'Reducción promedio de la tasa por buen desempeño ASG',
    valor: '1,4 puntos',
    meta: 'Al menos 1 punto',
    avance: 1,
    estado: 'cumplida',
  },
  {
    dimension: 'Ambiental (A)',
    nombre: 'Emisiones de Alcance 3 evitadas por los proveedores',
    valor: '3.150 t CO2e',
    meta: 'Medir la línea base en el año 1',
    avance: null,
    estado: 'linea-base',
  },
  {
    dimension: 'Social (S)',
    nombre: 'Pequeños productores con acceso a liquidez anticipada',
    valor: '620',
    meta: '1.000 productores',
    avance: 0.62,
    estado: 'en-camino',
  },
  {
    dimension: 'Social (S)',
    nombre: 'Tenderos de Pideky con cupo de crédito activo',
    valor: '7.900',
    meta: '13.200 tenderos',
    avance: 7900 / 13200,
    estado: 'en-camino',
  },
  {
    dimension: 'Social (S)',
    nombre: 'Tenderos que acceden por primera vez a crédito formal',
    valor: '46%',
    meta: 'Al menos 40%',
    avance: 1,
    estado: 'cumplida',
  },
  {
    dimension: 'Financiero',
    nombre: 'Tiempo de pago al proveedor tras aprobar su factura',
    valor: '48 horas',
    meta: 'Menos de 72 horas',
    avance: 1,
    estado: 'cumplida',
    nota: 'Menos es mejor',
  },
  {
    dimension: 'Financiero',
    nombre: 'Morosidad de la cartera de microcrédito a más de 30 días',
    valor: '3,2%',
    meta: 'Máximo 5%',
    avance: 1,
    estado: 'cumplida',
    nota: 'Menos es mejor',
  },
  {
    dimension: 'Financiero',
    nombre: 'Crecimiento de compras en Pideky de tenderos con cupo (frente a los que no lo tienen)',
    valor: '12%',
    meta: 'Al menos 10%',
    avance: 1,
    estado: 'cumplida',
  },
  {
    dimension: 'Financiero',
    nombre: 'Participación de las ventas digitales en los ingresos',
    valor: '9,4%',
    meta: '20% al 2030 (hoy 8,1%)',
    avance: 9.4 / 20,
    estado: 'en-camino',
  },
  {
    dimension: 'Gobierno (G)',
    nombre: 'Operaciones verificadas LA/FT/FPADM y reportadas bajo NIIF S1 y S2',
    valor: '100%',
    meta: '100%, sin incidentes',
    avance: 1,
    estado: 'cumplida',
  },
]

export const DESTACADOS = [
  { titulo: 'Productores con liquidez', valor: '620', detalle: 'meta: 1.000' },
  { titulo: 'Tenderos con cupo', valor: '7.900', detalle: 'meta: 13.200' },
  { titulo: 'Ahorro en la tasa', valor: '1,4 pts', detalle: 'por prácticas ASG' },
  { titulo: 'Morosidad', valor: '3,2%', detalle: 'máximo: 5%' },
]
