import type { ReactNode } from 'react'
import { Link } from 'react-router'

// Marco común de las páginas anchas (simuladores e indicadores).
export default function PaginaAncha({
  etiqueta,
  titulo,
  descripcion,
  children,
}: {
  etiqueta: string
  titulo: string
  descripcion: string
  children: ReactNode
}) {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <Link to="/panel" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline">
          ← Volver a Mi panel
        </Link>

        <header className="mt-4 mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{etiqueta}</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{titulo}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">{descripcion}</p>
        </header>

        {children}

        <AvisoAcademico />
      </div>
    </main>
  )
}

export function AvisoAcademico() {
  return (
    <p className="mt-6 text-center text-xs text-slate-400">
      Simulación con valores ilustrativos. Trabajo académico del diplomado; no es un servicio oficial de Grupo Nutresa ni
      una oferta de crédito.
    </p>
  )
}
