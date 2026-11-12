import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useSesion } from '../context/AuthContext'

// Menú fijo arriba, en todas las páginas. En celular se abre con el botón ☰.
const SECCIONES: { a: string; texto: string; corto?: string; icono: string; privada: boolean }[] = [
  { a: '/', texto: 'Inicio', icono: '🏠', privada: false },
  { a: '/mercado', texto: 'Mercado', icono: '📈', privada: false },
  { a: '/territorios', texto: 'Territorios', icono: '🗺️', privada: false },
  { a: '/indicadores', texto: 'Indicadores', icono: '📊', privada: true },
  { a: '/seguimiento', texto: 'Seguimiento', icono: '🧑‍🌾', privada: true },
  { a: '/simulador/proveedor', texto: 'Simulador proveedor', corto: 'Proveedor', icono: '🌱', privada: true },
  { a: '/simulador/tendero', texto: 'Simulador tendero', corto: 'Tendero', icono: '🏪', privada: true },
]

export default function Menu() {
  const { usuario } = useSesion()
  const [abierto, setAbierto] = useState(false)

  const claseEnlace = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${
      isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`

  const enlaces = (corto: boolean) =>
    SECCIONES.map((s) => (
    <NavLink key={s.a} to={s.a} end={s.a === '/'} className={claseEnlace} title={s.texto}>
      <span aria-hidden>{s.icono}</span>
      {corto && s.corto ? s.corto : s.texto}
      {s.privada && !usuario && (
        <span className="text-xs" title="Requiere iniciar sesión" aria-label="requiere iniciar sesión">
          🔒
        </span>
      )}
    </NavLink>
  ))

  const botonCuenta = (
    <Link
      to={usuario ? '/panel' : '/login'}
      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition hover:bg-emerald-700"
    >
      {usuario ? 'Mi panel' : 'Entrar'}
    </Link>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-bold text-emerald-800">
          <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white" aria-hidden>
            🌱
          </span>
          <span>Agro-Link</span>
        </Link>

        {/* Computador: enlaces en una fila */}
        <nav aria-label="Secciones" className="hidden flex-1 items-center gap-0.5 xl:flex">
          {enlaces(true)}
        </nav>
        <div className="ml-auto hidden xl:block">{botonCuenta}</div>

        {/* Celular y tableta: botón ☰ */}
        <div className="ml-auto flex items-center gap-2 xl:hidden">
          {botonCuenta}
          <button
            onClick={() => setAbierto((a) => !a)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
            className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-700"
          >
            {abierto ? '×' : '☰'}
          </button>
        </div>
      </div>

      {abierto && (
        // Al tocar una sección, el menú del celular se cierra solo.
        <nav
          id="menu-movil"
          aria-label="Secciones"
          onClick={() => setAbierto(false)}
          className="grid gap-1 border-t border-slate-100 px-4 py-3 sm:grid-cols-2 xl:hidden"
        >
          {enlaces(false)}
        </nav>
      )}
    </header>
  )
}
