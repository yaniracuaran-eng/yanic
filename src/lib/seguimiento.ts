// Seguimiento a productores y proveedores del programa.
// Nombres y cifras INVENTADOS para la demostración: no corresponden a personas ni empresas reales.

export type EstadoAbora = 'verificado' | 'en-revision' | 'pendiente'

export type Evento = { fecha: string; texto: string; tipo: 'factura' | 'pago' | 'verificacion' | 'entrega' | 'alerta' }

export type Participante = {
  id: string
  nombre: string
  tipo: 'Productor' | 'Proveedor'
  cadena: 'Café' | 'Cacao' | 'Ganadería' | 'Empaques' | 'Insumos'
  municipio: string
  departamento: string
  hectareas: number | null
  estadoAbora: EstadoAbora
  practicas: string[]
  /** Puntaje ASG de 0 a 100. */
  puntajeASG: number
  facturasFinanciadas: number
  ahorroASG: number
  historial: Evento[]
}

export const PARTICIPANTES: Participante[] = [
  {
    id: 'p01',
    nombre: 'Finca La Esperanza',
    tipo: 'Productor',
    cadena: 'Café',
    municipio: 'Pitalito',
    departamento: 'Huila',
    hectareas: 12,
    estadoAbora: 'verificado',
    practicas: ['Libre de deforestación', 'Bajas en carbono', 'Trazabilidad'],
    puntajeASG: 92,
    facturasFinanciadas: 48_500_000,
    ahorroASG: 362_000,
    historial: [
      { fecha: '04 nov', texto: 'Pago anticipado recibido: $12.300.000 en 36 horas', tipo: 'pago' },
      { fecha: '03 nov', texto: 'Factura registrada por 31 cargas de café pergamino', tipo: 'factura' },
      { fecha: '15 oct', texto: 'Ábora confirmó el predio libre de deforestación', tipo: 'verificacion' },
      { fecha: '02 oct', texto: 'Entrega de 3,9 t de café en la planta', tipo: 'entrega' },
    ],
  },
  {
    id: 'p02',
    nombre: 'Asociación Cacaotera del Río',
    tipo: 'Productor',
    cadena: 'Cacao',
    municipio: 'San Vicente de Chucurí',
    departamento: 'Santander',
    hectareas: 86,
    estadoAbora: 'verificado',
    practicas: ['Libre de deforestación', 'Trazabilidad'],
    puntajeASG: 81,
    facturasFinanciadas: 96_200_000,
    ahorroASG: 640_000,
    historial: [
      { fecha: '06 nov', texto: 'Factura registrada por 4,2 t de cacao en grano', tipo: 'factura' },
      { fecha: '28 oct', texto: 'Pago anticipado recibido: $28.400.000 en 48 horas', tipo: 'pago' },
      { fecha: '10 oct', texto: 'Ábora renovó la verificación satelital de 86 ha', tipo: 'verificacion' },
    ],
  },
  {
    id: 'p03',
    nombre: 'Hacienda El Roble',
    tipo: 'Productor',
    cadena: 'Ganadería',
    municipio: 'Montería',
    departamento: 'Córdoba',
    hectareas: 140,
    estadoAbora: 'en-revision',
    practicas: ['Bajas en carbono'],
    puntajeASG: 58,
    facturasFinanciadas: 72_000_000,
    ahorroASG: 180_000,
    historial: [
      { fecha: '05 nov', texto: 'Ábora revisa un cambio de cobertura en 4 ha del predio', tipo: 'alerta' },
      { fecha: '20 oct', texto: 'Pago anticipado recibido: $18.000.000 en 60 horas', tipo: 'pago' },
      { fecha: '18 oct', texto: 'Factura registrada por ganado en pie', tipo: 'factura' },
    ],
  },
  {
    id: 'p04',
    nombre: 'Finca Los Naranjos',
    tipo: 'Productor',
    cadena: 'Café',
    municipio: 'Chinchiná',
    departamento: 'Caldas',
    hectareas: 7,
    estadoAbora: 'verificado',
    practicas: ['Libre de deforestación', 'Bajas en carbono', 'Empaques sostenibles', 'Trazabilidad'],
    puntajeASG: 97,
    facturasFinanciadas: 26_800_000,
    ahorroASG: 223_000,
    historial: [
      { fecha: '07 nov', texto: 'Alcanzó el nivel máximo de beneficio ASG (−5 puntos de tasa)', tipo: 'verificacion' },
      { fecha: '30 oct', texto: 'Pago anticipado recibido: $9.100.000 en 24 horas', tipo: 'pago' },
      { fecha: '29 oct', texto: 'Factura registrada por 22 cargas de café', tipo: 'factura' },
    ],
  },
  {
    id: 'p05',
    nombre: 'Cooperativa Lechera La Pradera',
    tipo: 'Productor',
    cadena: 'Ganadería',
    municipio: 'San Pedro de los Milagros',
    departamento: 'Antioquia',
    hectareas: 210,
    estadoAbora: 'verificado',
    practicas: ['Libre de deforestación', 'Trazabilidad'],
    puntajeASG: 76,
    facturasFinanciadas: 154_000_000,
    ahorroASG: 910_000,
    historial: [
      { fecha: '08 nov', texto: 'Entrega de 46.000 litros de leche en la semana', tipo: 'entrega' },
      { fecha: '01 nov', texto: 'Pago anticipado recibido: $38.500.000 en 48 horas', tipo: 'pago' },
      { fecha: '25 sep', texto: 'Ábora verificó 210 ha de pasturas', tipo: 'verificacion' },
    ],
  },
  {
    id: 'p06',
    nombre: 'Finca Villa Clara',
    tipo: 'Productor',
    cadena: 'Café',
    municipio: 'Popayán',
    departamento: 'Cauca',
    hectareas: 5,
    estadoAbora: 'pendiente',
    practicas: [],
    puntajeASG: 35,
    facturasFinanciadas: 0,
    ahorroASG: 0,
    historial: [
      { fecha: '09 nov', texto: 'Se inscribió en el programa; agendada la verificación satelital', tipo: 'verificacion' },
    ],
  },
  {
    id: 'p07',
    nombre: 'Asociación de Cacaoteros de Arauca',
    tipo: 'Productor',
    cadena: 'Cacao',
    municipio: 'Saravena',
    departamento: 'Arauca',
    hectareas: 120,
    estadoAbora: 'verificado',
    practicas: ['Libre de deforestación', 'Bajas en carbono'],
    puntajeASG: 84,
    facturasFinanciadas: 118_300_000,
    ahorroASG: 705_000,
    historial: [
      { fecha: '04 nov', texto: 'Pago anticipado recibido: $33.600.000 en 40 horas', tipo: 'pago' },
      { fecha: '03 nov', texto: 'Factura registrada por 5 t de cacao', tipo: 'factura' },
      { fecha: '12 oct', texto: 'Ábora confirmó cero alertas de deforestación', tipo: 'verificacion' },
    ],
  },
  {
    id: 'p08',
    nombre: 'Finca El Mirador',
    tipo: 'Productor',
    cadena: 'Café',
    municipio: 'Planadas',
    departamento: 'Tolima',
    hectareas: 9,
    estadoAbora: 'en-revision',
    practicas: ['Trazabilidad'],
    puntajeASG: 61,
    facturasFinanciadas: 14_700_000,
    ahorroASG: 40_000,
    historial: [
      { fecha: '02 nov', texto: 'Ábora pidió imágenes nuevas por nubosidad en la zona', tipo: 'alerta' },
      { fecha: '22 oct', texto: 'Pago anticipado recibido: $7.200.000 en 52 horas', tipo: 'pago' },
    ],
  },
  {
    id: 'p09',
    nombre: 'Empaques Verdes del Caribe S.A.S.',
    tipo: 'Proveedor',
    cadena: 'Empaques',
    municipio: 'Barranquilla',
    departamento: 'Atlántico',
    hectareas: null,
    estadoAbora: 'verificado',
    practicas: ['Empaques sostenibles', 'Bajas en carbono'],
    puntajeASG: 88,
    facturasFinanciadas: 210_000_000,
    ahorroASG: 1_240_000,
    historial: [
      { fecha: '06 nov', texto: 'Entregó 1,2 millones de empaques 100% reciclables', tipo: 'entrega' },
      { fecha: '31 oct', texto: 'Pago anticipado recibido: $52.000.000 en 24 horas', tipo: 'pago' },
      { fecha: '15 oct', texto: 'Certificación de material reciclado validada', tipo: 'verificacion' },
    ],
  },
  {
    id: 'p10',
    nombre: 'Agroinsumos del Valle Ltda.',
    tipo: 'Proveedor',
    cadena: 'Insumos',
    municipio: 'Tuluá',
    departamento: 'Valle del Cauca',
    hectareas: null,
    estadoAbora: 'verificado',
    practicas: ['Trazabilidad'],
    puntajeASG: 70,
    facturasFinanciadas: 64_000_000,
    ahorroASG: 160_000,
    historial: [
      { fecha: '05 nov', texto: 'Factura registrada por bioinsumos para productores de café', tipo: 'factura' },
      { fecha: '27 oct', texto: 'Pago anticipado recibido: $21.000.000 en 48 horas', tipo: 'pago' },
    ],
  },
  {
    id: 'p11',
    nombre: 'Finca La Cristalina',
    tipo: 'Productor',
    cadena: 'Café',
    municipio: 'La Unión',
    departamento: 'Nariño',
    hectareas: 4,
    estadoAbora: 'verificado',
    practicas: ['Libre de deforestación', 'Empaques sostenibles'],
    puntajeASG: 79,
    facturasFinanciadas: 11_900_000,
    ahorroASG: 99_000,
    historial: [
      { fecha: '03 nov', texto: 'Pago anticipado recibido: $5.400.000 en 30 horas', tipo: 'pago' },
      { fecha: '02 nov', texto: 'Factura registrada por 12 cargas de café especial', tipo: 'factura' },
      { fecha: '20 sep', texto: 'Ábora confirmó el predio libre de deforestación', tipo: 'verificacion' },
    ],
  },
  {
    id: 'p12',
    nombre: 'Ganadería Santa Inés',
    tipo: 'Productor',
    cadena: 'Ganadería',
    municipio: 'Puerto López',
    departamento: 'Meta',
    hectareas: 320,
    estadoAbora: 'pendiente',
    practicas: ['Bajas en carbono'],
    puntajeASG: 44,
    facturasFinanciadas: 38_000_000,
    ahorroASG: 70_000,
    historial: [
      { fecha: '07 nov', texto: 'Pendiente: cargar el polígono del predio para la verificación', tipo: 'alerta' },
      { fecha: '15 oct', texto: 'Pago anticipado recibido: $19.000.000 en 70 horas', tipo: 'pago' },
    ],
  },
]
