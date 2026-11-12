// Presencia del programa por departamento (28 departamentos, como dice la propuesta).
// La distribución es SIMULADA; los totales coinciden con los indicadores del piloto
// (620 productores y 7.900 tenderos).

export type Region = 'Andina' | 'Caribe' | 'Pacífica' | 'Orinoquía' | 'Amazonía'

export type Departamento = {
  nombre: string
  region: Region
  productores: number
  tenderos: number
  cadenas: string[]
}

export const REGIONES: { nombre: Region; icono: string }[] = [
  { nombre: 'Andina', icono: '⛰️' },
  { nombre: 'Caribe', icono: '🏖️' },
  { nombre: 'Pacífica', icono: '🌊' },
  { nombre: 'Orinoquía', icono: '🌾' },
  { nombre: 'Amazonía', icono: '🌳' },
]

export const DEPARTAMENTOS: Departamento[] = [
  { nombre: 'Antioquia', region: 'Andina', productores: 80, tenderos: 1500, cadenas: ['Ganadería', 'Café'] },
  { nombre: 'Boyacá', region: 'Andina', productores: 20, tenderos: 300, cadenas: ['Ganadería'] },
  { nombre: 'Caldas', region: 'Andina', productores: 55, tenderos: 250, cadenas: ['Café'] },
  { nombre: 'Cundinamarca', region: 'Andina', productores: 30, tenderos: 1200, cadenas: ['Ganadería', 'Café'] },
  { nombre: 'Huila', region: 'Andina', productores: 70, tenderos: 260, cadenas: ['Café', 'Cacao'] },
  { nombre: 'Norte de Santander', region: 'Andina', productores: 15, tenderos: 220, cadenas: ['Cacao', 'Café'] },
  { nombre: 'Quindío', region: 'Andina', productores: 25, tenderos: 150, cadenas: ['Café'] },
  { nombre: 'Risaralda', region: 'Andina', productores: 30, tenderos: 200, cadenas: ['Café'] },
  { nombre: 'Santander', region: 'Andina', productores: 60, tenderos: 420, cadenas: ['Cacao', 'Café'] },
  { nombre: 'Tolima', region: 'Andina', productores: 40, tenderos: 250, cadenas: ['Café', 'Cacao'] },
  { nombre: 'Atlántico', region: 'Caribe', productores: 0, tenderos: 600, cadenas: ['Empaques'] },
  { nombre: 'Bolívar', region: 'Caribe', productores: 10, tenderos: 330, cadenas: ['Ganadería'] },
  { nombre: 'Cesar', region: 'Caribe', productores: 12, tenderos: 200, cadenas: ['Ganadería'] },
  { nombre: 'Córdoba', region: 'Caribe', productores: 25, tenderos: 250, cadenas: ['Ganadería'] },
  { nombre: 'La Guajira', region: 'Caribe', productores: 0, tenderos: 80, cadenas: [] },
  { nombre: 'Magdalena', region: 'Caribe', productores: 8, tenderos: 200, cadenas: ['Ganadería', 'Cacao'] },
  { nombre: 'Sucre', region: 'Caribe', productores: 10, tenderos: 130, cadenas: ['Ganadería'] },
  { nombre: 'San Andrés y Providencia', region: 'Caribe', productores: 0, tenderos: 20, cadenas: [] },
  { nombre: 'Cauca', region: 'Pacífica', productores: 35, tenderos: 180, cadenas: ['Café'] },
  { nombre: 'Chocó', region: 'Pacífica', productores: 5, tenderos: 40, cadenas: ['Cacao'] },
  { nombre: 'Nariño', region: 'Pacífica', productores: 30, tenderos: 150, cadenas: ['Café'] },
  { nombre: 'Valle del Cauca', region: 'Pacífica', productores: 10, tenderos: 500, cadenas: ['Insumos', 'Café'] },
  { nombre: 'Arauca', region: 'Orinoquía', productores: 20, tenderos: 100, cadenas: ['Cacao'] },
  { nombre: 'Casanare', region: 'Orinoquía', productores: 8, tenderos: 90, cadenas: ['Ganadería'] },
  { nombre: 'Meta', region: 'Orinoquía', productores: 12, tenderos: 180, cadenas: ['Ganadería', 'Cacao'] },
  { nombre: 'Caquetá', region: 'Amazonía', productores: 6, tenderos: 60, cadenas: ['Ganadería', 'Cacao'] },
  { nombre: 'Putumayo', region: 'Amazonía', productores: 3, tenderos: 30, cadenas: ['Cacao'] },
  { nombre: 'Guaviare', region: 'Amazonía', productores: 1, tenderos: 10, cadenas: ['Cacao'] },
]

export const ICONO_CADENA: Record<string, string> = {
  Café: '☕',
  Cacao: '🍫',
  Ganadería: '🐄',
  Empaques: '📦',
  Insumos: '🧪',
}
