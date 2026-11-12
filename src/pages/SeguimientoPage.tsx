import { useMemo, useState } from 'react'
import PaginaAncha, { Insignia } from '../components/PaginaAncha'
import { PARTICIPANTES, type EstadoAbora, type Evento, type Participante } from '../lib/seguimiento'
import { pesos } from '../lib/simuladorProveedor'

const ESTADOS: Record<EstadoAbora, { icono: string; texto: string; clase: string }> = {
  verificado: { icono: '✓', texto: 'Verificado', clase: 'bg-green-50 text-green-800 ring-green-200' },
  'en-revision': { icono: '◐', texto: 'En revisión', clase: 'bg-amber-50 text-amber-900 ring-amber-200' },
  pendiente: { icono: '◌', texto: 'Pendiente', clase: 'bg-slate-100 text-slate-700 ring-slate-200' },
}

const ICONO_EVENTO: Record<Evento['tipo'], string> = {
  factura: '🧾',
  pago: '💸',
  verificacion: '🛰️',
  entrega: '🚚',
  alerta: '⚠️',
}

const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export default function SeguimientoPage() {
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState<'todos' | Participante['tipo']>('todos')
  const [estado, setEstado] = useState<'todos' | EstadoAbora>('todos')
  const [abierto, setAbierto] = useState<string | null>(null)

  const filtrados = useMemo(() => {
    const q = normalizar(busqueda.trim())
    return PARTICIPANTES.filter(
      (p) =>
        (tipo === 'todos' || p.tipo === tipo) &&
        (estado === 'todos' || p.estadoAbora === estado) &&
        (!q || normalizar(`${p.nombre} ${p.municipio} ${p.departamento} ${p.cadena}`).includes(q)),
    )
  }, [busqueda, tipo, estado])

  const total = PARTICIPANTES.length
  const verificados = PARTICIPANTES.filter((p) => p.estadoAbora === 'verificado').length
  const financiado = PARTICIPANTES.reduce((s, p) => s + p.facturasFinanciadas, 0)
  const ahorro = PARTICIPANTES.reduce((s, p) => s + p.ahorroASG, 0)

  return (
    <PaginaAncha
      etiqueta="Seguimiento"
      titulo="Productores y proveedores"
      descripcion="Sigue a cada participante: su verificación satelital, sus prácticas sostenibles y la historia de sus facturas y pagos."
    >
      <Insignia>Nombres y cifras inventados para la demostración</Insignia>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Cifra titulo="Participantes en la muestra" valor={String(total)} detalle="productores y proveedores" />
        <Cifra titulo="Verificados por Ábora" valor={`${verificados} de ${total}`} detalle="predios o empresas" />
        <Cifra titulo="Facturas financiadas" valor={pesos(financiado)} detalle="en lo que va del piloto" />
        <Cifra titulo="Ahorro por prácticas ASG" valor={pesos(ahorro)} detalle="menos intereses pagados" />
      </div>

      {/* Filtros en una sola fila */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, municipio o cadena…"
          aria-label="Buscar participante"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as typeof tipo)}
          aria-label="Filtrar por tipo"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
        >
          <option value="todos">Todos los tipos</option>
          <option value="Productor">Productores</option>
          <option value="Proveedor">Proveedores</option>
        </select>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as typeof estado)}
          aria-label="Filtrar por estado de verificación"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
        >
          <option value="todos">Todos los estados</option>
          <option value="verificado">Verificados</option>
          <option value="en-revision">En revisión</option>
          <option value="pendiente">Pendientes</option>
        </select>
      </div>

      <p className="mt-3 text-sm text-slate-500" aria-live="polite">
        Mostrando {filtrados.length} de {total}
      </p>

      <div className="mt-2 space-y-3">
        {filtrados.map((p) => (
          <Ficha key={p.id} p={p} abierta={abierto === p.id} alternar={() => setAbierto(abierto === p.id ? null : p.id)} />
        ))}
        {filtrados.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-center text-slate-500">
            No hay participantes con esos filtros. Prueba con otra búsqueda.
          </p>
        )}
      </div>
    </PaginaAncha>
  )
}

function Cifra({ titulo, valor, detalle }: { titulo: string; valor: string; detalle: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{titulo}</p>
      <p className="mt-1 text-xl font-semibold break-all text-slate-900">{valor}</p>
      <p className="text-xs text-slate-500">{detalle}</p>
    </div>
  )
}

function Ficha({ p, abierta, alternar }: { p: Participante; abierta: boolean; alternar: () => void }) {
  const e = ESTADOS[p.estadoAbora]
  return (
    <article className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <button onClick={alternar} aria-expanded={abierta} className="flex w-full items-start gap-3 p-4 text-left">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl" aria-hidden>
          {p.cadena === 'Café' ? '☕' : p.cadena === 'Cacao' ? '🍫' : p.cadena === 'Ganadería' ? '🐄' : p.cadena === 'Empaques' ? '📦' : '🧪'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-900">{p.nombre}</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${e.clase}`}>
              <span aria-hidden>{e.icono}</span>
              {e.texto}
            </span>
          </span>
          <span className="mt-0.5 block text-sm text-slate-500">
            {p.tipo} de {p.cadena.toLowerCase()} · {p.municipio}, {p.departamento}
            {p.hectareas !== null && ` · ${p.hectareas} ha`}
          </span>
          <span className="mt-2 flex items-center gap-2">
            <span className="text-xs text-slate-500">Puntaje ASG</span>
            <span
              role="meter"
              aria-label={`Puntaje ASG de ${p.nombre}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={p.puntajeASG}
              className="h-2 max-w-40 flex-1 rounded-full bg-emerald-100"
            >
              <span className="block h-2 rounded-full bg-emerald-600" style={{ width: `${p.puntajeASG}%` }} />
            </span>
            <span className="text-xs font-semibold text-slate-900">{p.puntajeASG}/100</span>
          </span>
        </span>
        <span className="text-slate-400" aria-hidden>
          {abierta ? '▲' : '▼'}
        </span>
      </button>

      {abierta && (
        <div className="grid gap-4 border-t border-slate-100 p-4 sm:grid-cols-2">
          <div className="space-y-3 text-sm">
            <Dato titulo="Facturas financiadas" valor={pesos(p.facturasFinanciadas)} />
            <Dato titulo="Ahorro por prácticas ASG" valor={pesos(p.ahorroASG)} />
            <div>
              <p className="text-xs font-medium text-slate-500">Prácticas sostenibles certificadas</p>
              {p.practicas.length ? (
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {p.practicas.map((pr) => (
                    <li key={pr} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-800">
                      ✓ {pr}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-slate-500">Aún ninguna: puede empezar por la verificación satelital.</p>
              )}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500">Historial reciente</p>
            <ol className="space-y-2">
              {p.historial.map((ev) => (
                <li key={ev.fecha + ev.texto} className="flex gap-3 text-sm">
                  <span aria-hidden>{ICONO_EVENTO[ev.tipo]}</span>
                  <span>
                    <span className="block text-xs text-slate-400">{ev.fecha}</span>
                    <span className="text-slate-700">{ev.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </article>
  )
}

function Dato({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{titulo}</p>
      <p className="font-semibold text-slate-900">{valor}</p>
    </div>
  )
}
