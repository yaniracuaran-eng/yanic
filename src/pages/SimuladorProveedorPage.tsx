import { useState } from 'react'
import { Link } from 'react-router'
import {
  PRACTICAS_ASG,
  TASA_BASE_ANUAL,
  pesos,
  porcentaje,
  simular,
} from '../lib/simuladorProveedor'

const VALOR_MINIMO = 100_000
const VALOR_MAXIMO = 5_000_000_000

export default function SimuladorProveedorPage() {
  const [valor, setValor] = useState<number | null>(10_000_000)
  const [dias, setDias] = useState(60)
  const [cumplidas, setCumplidas] = useState<string[]>(['deforestacion'])

  const valorValido = valor !== null && valor >= VALOR_MINIMO && valor <= VALOR_MAXIMO
  const resultado = valorValido ? simular(valor, dias, cumplidas) : null

  function alternar(id: string) {
    setCumplidas((actual) => (actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id]))
  }

  return (
    <main className="min-h-dvh bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <Link to="/panel" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline">
          ← Volver a Mi panel
        </Link>

        <header className="mt-4 mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Eje de abastecimiento</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Simulador del proveedor: factoring ASG</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Descubre cuánto dinero recibirías hoy por tu factura y cuánto te ahorras gracias a tus buenas prácticas
            ambientales.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Datos del proveedor */}
          <section className="space-y-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-emerald-900/5 sm:p-6">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Valor de tu factura (pesos)</span>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={valor === null ? '' : valor.toLocaleString('es-CO')}
                  onChange={(e) => {
                    const digitos = e.target.value.replace(/\D/g, '')
                    setValor(digitos ? Number(digitos) : null)
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-8 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              {!valorValido && (
                <span role="alert" className="mt-1.5 block text-sm text-red-700">
                  Escribe un valor entre {pesos(VALOR_MINIMO)} y {pesos(VALOR_MAXIMO)}.
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-slate-700">
                <span>¿En cuántos días te pagarían la factura?</span>
                <span className="shrink-0 text-base font-bold whitespace-nowrap text-emerald-700">{dias} días</span>
              </span>
              <input
                type="range"
                min={15}
                max={120}
                step={15}
                value={dias}
                onChange={(e) => setDias(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="flex justify-between text-xs text-slate-400">
                <span>15</span>
                <span>120</span>
              </span>
            </label>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-700">¿Qué prácticas ASG cumples?</legend>
              <div className="space-y-2">
                {PRACTICAS_ASG.map((p) => {
                  const activa = cumplidas.includes(p.id)
                  return (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                        activa ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={activa}
                        onChange={() => alternar(p.id)}
                        className="mt-1 size-4 accent-emerald-600"
                      />
                      <span className="flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="font-semibold text-slate-900">{p.nombre}</span>
                          <span className="shrink-0 text-sm font-semibold text-emerald-700">−{porcentaje(p.reduccion)}</span>
                        </span>
                        <span className="block text-sm text-slate-500">{p.descripcion}</span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </section>

          {/* Resultados */}
          <section
            aria-live="polite"
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-emerald-900/5 sm:p-6"
          >
            {resultado ? (
              <div className="space-y-5">
                <div className="rounded-2xl bg-emerald-600 p-5 text-white">
                  <p className="text-sm text-emerald-100">Recibes hoy</p>
                  <p className="mt-1 text-3xl font-bold break-all sm:text-4xl">{pesos(resultado.recibeHoy)}</p>
                  <p className="mt-2 text-sm text-emerald-100">En lugar de esperar {dias} días.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Dato titulo="Tu tasa anual" valor={porcentaje(resultado.tasaAplicada)} detalle={`Base: ${porcentaje(TASA_BASE_ANUAL)}`} />
                  <Dato
                    titulo="Te ahorras"
                    valor={pesos(resultado.ahorro)}
                    detalle="gracias a tus prácticas ASG"
                    destacado={resultado.ahorro > 0}
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">Costo de recibir el dinero hoy</p>
                  <Barra etiqueta="Sin prácticas ASG" valor={resultado.descuentoSinASG} maximo={resultado.descuentoSinASG} color="bg-slate-400" />
                  <Barra etiqueta="Con tus prácticas ASG" valor={resultado.descuentoConASG} maximo={resultado.descuentoSinASG} color="bg-emerald-500" />
                </div>

                {resultado.ahorro === 0 && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Marca las prácticas ASG que cumples para ver cuánto baja tu tasa.
                  </p>
                )}
              </div>
            ) : (
              <p className="py-10 text-center text-slate-500">Escribe el valor de tu factura para ver el resultado.</p>
            )}
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Simulación con valores ilustrativos. Trabajo académico del diplomado; no es un servicio oficial de Grupo Nutresa
          ni una oferta de crédito.
        </p>
      </div>
    </main>
  )
}

function Dato({ titulo, valor, detalle, destacado = false }: { titulo: string; valor: string; detalle: string; destacado?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 ${destacado ? 'bg-emerald-50' : 'bg-slate-50'}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{titulo}</p>
      <p className={`mt-1 text-lg font-bold break-all sm:text-xl ${destacado ? 'text-emerald-700' : 'text-slate-900'}`}>{valor}</p>
      <p className="mt-0.5 text-xs text-slate-500">{detalle}</p>
    </div>
  )
}

function Barra({ etiqueta, valor, maximo, color }: { etiqueta: string; valor: number; maximo: number; color: string }) {
  const ancho = maximo > 0 ? Math.max(4, (valor / maximo) * 100) : 0
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-slate-600">{etiqueta}</span>
        <span className="font-semibold text-slate-900">{pesos(valor)}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100">
        <div className={`h-3 rounded-full transition-all ${color}`} style={{ width: `${ancho}%` }} />
      </div>
    </div>
  )
}
