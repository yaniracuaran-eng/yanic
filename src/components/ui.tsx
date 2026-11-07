import type { ButtonHTMLAttributes, ReactNode } from 'react'

// Piezas visuales que comparten las páginas.

export function Tarjeta({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-emerald-900/5 sm:p-8">
        {children}
      </div>
    </main>
  )
}

export function Cargando({ texto }: { texto: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-6 text-center">
      <span className="size-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
      <p className="text-slate-600">{texto}</p>
    </div>
  )
}

export function Aviso({ tipo, children }: { tipo: 'error' | 'exito'; children: ReactNode }) {
  const estilos =
    tipo === 'error'
      ? 'border-red-200 bg-red-50 text-red-800'
      : 'border-emerald-200 bg-emerald-50 text-emerald-800'
  return (
    <p role={tipo === 'error' ? 'alert' : 'status'} className={`rounded-xl border px-4 py-3 text-sm ${estilos}`}>
      {children}
    </p>
  )
}

export function Boton({
  children,
  cargando = false,
  variante = 'principal',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { cargando?: boolean; variante?: 'principal' | 'secundario' }) {
  const estilos =
    variante === 'principal'
      ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600'
      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:outline-slate-400'
  return (
    <button
      {...props}
      disabled={cargando || props.disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${estilos}`}
    >
      {cargando && <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  )
}
