import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { Link } from 'react-router'
import { Aviso, Boton, Tarjeta } from '../components/ui'
import { useSesion } from '../context/AuthContext'
import { auth } from '../lib/firebase'
import { mensajeDeError } from '../lib/mensajesError'

export default function PanelPage() {
  const { usuario } = useSesion()
  const [saliendo, setSaliendo] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function cerrarSesion() {
    setSaliendo(true)
    setError(null)
    try {
      await signOut(auth) // al quedar sin sesión, RutaPrivada te lleva al login
    } catch (e) {
      setError(mensajeDeError(e))
      setSaliendo(false)
    }
  }

  return (
    <Tarjeta>
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
          👋
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Mi panel</h1>
        <p className="mt-2 text-sm text-slate-500">Iniciaste sesión correctamente.</p>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Tu correo</p>
        <p className="mt-1 break-all font-semibold text-slate-900">{usuario?.email}</p>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">La demostración</p>
        <div className="space-y-2">
          <Acceso
            a="/simulador/proveedor"
            icono="🌱"
            titulo="Simulador del proveedor"
            texto="Factoring ASG: cobra hoy tu factura y ahorra con buenas prácticas."
          />
          <Acceso
            a="/simulador/tendero"
            icono="🏪"
            titulo="Simulador del tendero"
            texto="Microcrédito Pideky: tu historial de compras es tu respaldo."
          />
          <Acceso
            a="/indicadores"
            icono="📊"
            titulo="Indicadores de resultado"
            texto="Avance de las 11 metas del piloto (datos simulados)."
          />
        </div>
        <Link to="/" className="mt-3 block text-center text-sm font-medium text-emerald-700 hover:underline">
          Ver la propuesta completa
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {error && <Aviso tipo="error">{error}</Aviso>}
        <Boton variante="secundario" onClick={cerrarSesion} cargando={saliendo}>
          {saliendo ? 'Cerrando sesión…' : 'Cerrar sesión'}
        </Boton>
      </div>
    </Tarjeta>
  )
}

function Acceso({ a, icono, titulo, texto }: { a: string; icono: string; titulo: string; texto: string }) {
  return (
    <Link
      to={a}
      className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 transition hover:bg-emerald-100"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl" aria-hidden>
        {icono}
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-slate-900">{titulo}</span>
        <span className="block text-sm text-slate-600">{texto}</span>
      </span>
      <span aria-hidden className="text-emerald-700">
        →
      </span>
    </Link>
  )
}
