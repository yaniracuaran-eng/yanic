import { useState } from 'react'
import PaginaAncha, { Insignia } from '../components/PaginaAncha'
import { DEPARTAMENTOS, ICONO_CADENA, REGIONES, type Region } from '../lib/territorios'

type Medida = 'productores' | 'tenderos'

export default function TerritoriosPage() {
  const [region, setRegion] = useState<'Todas' | Region>('Todas')
  const [medida, setMedida] = useState<Medida>('productores')

  const totalProductores = DEPARTAMENTOS.reduce((s, d) => s + d.productores, 0)
  const totalTenderos = DEPARTAMENTOS.reduce((s, d) => s + d.tenderos, 0)

  const lista = DEPARTAMENTOS.filter((d) => region === 'Todas' || d.region === region).sort((a, b) => b[medida] - a[medida])
  const maximo = Math.max(...lista.map((d) => d[medida]), 1)

  return (
    <PaginaAncha
      publica
      etiqueta="Territorios"
      titulo="¿Dónde estamos?"
      descripcion="El programa llega a productores y tenderos de 28 departamentos de Colombia. Mira cuántos participan en cada uno y qué producen."
    >
      <Insignia>Distribución simulada para la demostración</Insignia>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Cifra titulo="Departamentos" valor={String(DEPARTAMENTOS.length)} />
        <Cifra titulo="Regiones" valor={String(REGIONES.length)} />
        <Cifra titulo="Productores" valor={totalProductores.toLocaleString('es-CO')} />
        <Cifra titulo="Tenderos" valor={totalTenderos.toLocaleString('es-CO')} />
      </div>

      {/* Resumen por región */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {REGIONES.map((r) => {
          const deps = DEPARTAMENTOS.filter((d) => d.region === r.nombre)
          const activa = region === r.nombre
          return (
            <button
              key={r.nombre}
              onClick={() => setRegion(activa ? 'Todas' : r.nombre)}
              aria-pressed={activa}
              className={`rounded-2xl border p-4 text-left transition ${
                activa ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'
              }`}
            >
              <p className="font-semibold text-slate-900">
                <span aria-hidden>{r.icono}</span> {r.nombre}
              </p>
              <p className="mt-1 text-xs text-slate-500">{deps.length} departamentos</p>
              <p className="text-xs text-slate-500">
                {deps.reduce((s, d) => s + d.productores, 0)} productores · {deps.reduce((s, d) => s + d.tenderos, 0).toLocaleString('es-CO')} tenderos
              </p>
            </button>
          )
        })}
      </div>

      {/* Controles en una fila */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">
          {region === 'Todas' ? 'Todos los departamentos' : `Región ${region}`}
          {region !== 'Todas' && (
            <button onClick={() => setRegion('Todas')} className="ml-3 text-sm font-medium text-emerald-700 hover:underline">
              Ver todas
            </button>
          )}
        </h2>
        <div role="tablist" className="flex gap-1 rounded-xl bg-slate-100 p-1">
          {(['productores', 'tenderos'] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={medida === m}
              onClick={() => setMedida(m)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold capitalize transition ${
                medida === m ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-3 space-y-2 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
        {lista.map((d) => (
          <li key={d.nombre} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 sm:grid-cols-[12rem_1fr_auto]">
            <span className="truncate text-sm text-slate-700" title={d.nombre}>
              {d.nombre}
              <span className="ml-1" aria-label={d.cadenas.join(', ') || 'Solo tenderos'}>
                {d.cadenas.map((c) => ICONO_CADENA[c]).join('')}
              </span>
            </span>
            <span className="h-3 rounded-full bg-emerald-50" title={`${d.nombre}: ${d[medida].toLocaleString('es-CO')} ${medida}`}>
              <span
                className="block h-3 rounded-full bg-emerald-600"
                style={{ width: `${d[medida] === 0 ? 0 : Math.max(2, (d[medida] / maximo) * 100)}%` }}
              />
            </span>
            <span className="w-14 text-right text-sm font-semibold text-slate-900 tabular-nums">
              {d[medida].toLocaleString('es-CO')}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-slate-500">
        Cadenas: {Object.entries(ICONO_CADENA).map(([c, i]) => `${i} ${c}`).join(' · ')}. Los departamentos sin ícono solo
        tienen tenderos.
      </p>
    </PaginaAncha>
  )
}

function Cifra({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{titulo}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{valor}</p>
    </div>
  )
}
