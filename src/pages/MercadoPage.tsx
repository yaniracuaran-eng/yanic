import { GraficoLinea, TablaDatos } from '../components/Graficas'
import PaginaAncha, { Insignia } from '../components/PaginaAncha'
import { comportamiento, PRODUCTOS, type Producto } from '../lib/mercado'

const pct = (n: number) => `${Math.abs(n).toLocaleString('es-CO', { maximumFractionDigits: 1 })}%`

export default function MercadoPage() {
  return (
    <PaginaAncha
      publica
      etiqueta="Precios y mercado"
      titulo="¿Cómo se mueven los precios?"
      descripcion="Precios de referencia de lo que producen los proveedores del programa en los últimos 12 meses, y qué significa cada cambio para ti."
    >
      <Insignia>Precios de ejemplo: consulta siempre la fuente oficial antes de vender</Insignia>

      {/* Resumen rápido */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PRODUCTOS.map((p) => {
          const c = comportamiento(p)
          return (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-emerald-200"
            >
              <p className="text-xs font-medium text-slate-500">
                <span aria-hidden>{p.icono}</span> {p.nombre}
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{p.formato(c.actual)}</p>
              <Cambio valor={c.cambioMensual} texto="este mes" />
            </a>
          )
        })}
      </div>

      <div className="mt-8 space-y-6">
        {PRODUCTOS.map((p) => (
          <TarjetaProducto key={p.id} p={p} />
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-slate-700">
        <h2 className="font-semibold text-slate-900">¿Por qué te sirve esta información?</h2>
        <p className="mt-1">
          Saber cómo se mueven los precios te ayuda a decidir cuándo vender. Con el factoring ASG no tienes que esperar el
          pago de tu factura para tener dinero, y con buenas prácticas ambientales pagas menos por adelantarlo.
        </p>
      </section>
    </PaginaAncha>
  )
}

function Cambio({ valor, texto }: { valor: number; texto: string }) {
  const sube = valor > 0
  const igual = Math.abs(valor) < 0.05
  return (
    <p className={`text-xs font-medium ${igual ? 'text-slate-600' : sube ? 'text-green-700' : 'text-red-700'}`}>
      {igual ? '→' : sube ? '↑' : '↓'} {pct(valor)} {texto}
    </p>
  )
}

function TarjetaProducto({ p }: { p: Producto }) {
  const c = comportamiento(p)
  return (
    <article id={p.id} className="scroll-mt-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            <span aria-hidden>{p.icono}</span> {p.nombre}
          </h2>
          <p className="text-sm text-slate-500">Precio de referencia {p.unidad}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-slate-900">{p.formato(c.actual)}</p>
          <Cambio valor={c.cambioAnual} texto="en 12 meses" />
        </div>
      </div>

      <div className="mt-4">
        <GraficoLinea titulo={`Precio de ${p.nombre} en los últimos 12 meses`} datos={p.datos} formato={p.formato} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-xs text-slate-500">Más alto</p>
          <p className="font-semibold text-slate-900">{p.formato(c.maximo)}</p>
          <p className="text-xs text-slate-400">{c.mesMaximo}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-xs text-slate-500">Más bajo</p>
          <p className="font-semibold text-slate-900">{p.formato(c.minimo)}</p>
          <p className="text-xs text-slate-400">{c.mesMinimo}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-xs text-slate-500">Este mes</p>
          <Cambio valor={c.cambioMensual} texto="" />
        </div>
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        💡 {p.consejo(c.cambioAnual)}
      </p>
      <p className="mt-2 text-xs text-slate-400">Precio oficial: {p.fuenteOficial}.</p>
      <TablaDatos datos={p.datos} formato={p.formato} columna="Precio" />
    </article>
  )
}
