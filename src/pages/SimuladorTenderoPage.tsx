import { useState } from 'react'
import PaginaAncha from '../components/PaginaAncha'
import { pesos, porcentaje } from '../lib/simuladorProveedor'
import { CUPO_MAXIMO, simularTendero } from '../lib/simuladorTendero'

export default function SimuladorTenderoPage() {
  const [pedidosPorMes, setPedidos] = useState(4)
  const [valorPromedioPedido, setValor] = useState<number | null>(350_000)
  const [mesesEnPideky, setMeses] = useState(12)
  const [porcentajePagosATiempo, setPuntualidad] = useState(90)

  const valorValido = valorPromedioPedido !== null && valorPromedioPedido >= 20_000 && valorPromedioPedido <= 20_000_000
  const r = valorValido
    ? simularTendero({ pedidosPorMes, valorPromedioPedido, mesesEnPideky, porcentajePagosATiempo })
    : null

  // El factor al que más puntos le faltan es el mejor consejo para subir.
  const mejorConsejo = r ? [...r.factores].sort((a, b) => b.maximo - b.puntos - (a.maximo - a.puntos))[0] : null

  return (
    <PaginaAncha
      etiqueta="Eje comercial"
      titulo="Simulador del tendero: microcrédito Pideky"
      descripcion="Sin garantías ni papeles: tu historial de compras en Pideky es tu respaldo. Mira qué cupo de crédito se te aprobaría para surtir tu tienda."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-emerald-900/5 sm:p-6">
          <Deslizador
            etiqueta="¿Cuántos pedidos haces al mes?"
            valor={pedidosPorMes}
            texto={`${pedidosPorMes} ${pedidosPorMes === 1 ? 'pedido' : 'pedidos'}`}
            min={1}
            max={12}
            alCambiar={setPedidos}
          />

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Valor promedio de cada pedido (pesos)</span>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={valorPromedioPedido === null ? '' : valorPromedioPedido.toLocaleString('es-CO')}
                onChange={(e) => {
                  const digitos = e.target.value.replace(/\D/g, '')
                  setValor(digitos ? Number(digitos) : null)
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-8 text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>
            {!valorValido && (
              <span role="alert" className="mt-1.5 block text-sm text-red-700">
                Escribe un valor entre {pesos(20_000)} y {pesos(20_000_000)}.
              </span>
            )}
          </label>

          <Deslizador
            etiqueta="¿Cuánto tiempo llevas usando Pideky?"
            valor={mesesEnPideky}
            texto={`${mesesEnPideky} ${mesesEnPideky === 1 ? 'mes' : 'meses'}`}
            min={1}
            max={36}
            alCambiar={setMeses}
          />

          <Deslizador
            etiqueta="¿Qué parte de tus pedidos pagas a tiempo?"
            valor={porcentajePagosATiempo}
            texto={`${porcentajePagosATiempo}%`}
            min={50}
            max={100}
            paso={5}
            alCambiar={setPuntualidad}
          />
        </section>

        <section aria-live="polite" className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-emerald-900/5 sm:p-6">
          {r ? (
            <div className="space-y-5">
              <div className={`rounded-2xl p-5 ${r.cupo > 0 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                <p className={`text-sm ${r.cupo > 0 ? 'text-emerald-100' : 'text-slate-500'}`}>Cupo pre-aprobado</p>
                <p className="mt-1 text-3xl font-bold break-all sm:text-4xl">{pesos(r.cupo)}</p>
                <p className={`mt-2 text-sm ${r.cupo > 0 ? 'text-emerald-100' : 'text-slate-600'}`}>
                  {r.cupo > 0
                    ? `Crédito rotatorio al ${porcentaje(r.nivel.tasaMensual)} mensual para tus pedidos.`
                    : 'Aún no hay cupo: sigue comprando y pagando a tiempo para construir tu historial.'}
                </p>
              </div>

              <div>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-700">Tu puntaje</span>
                  <span className="text-sm text-slate-600">
                    <strong className="text-lg text-slate-900">{r.puntaje}</strong> de 1.000 · Nivel{' '}
                    <strong className="text-slate-900">{r.nivel.nombre}</strong>
                  </span>
                </div>
                <div
                  role="meter"
                  aria-valuemin={0}
                  aria-valuemax={1000}
                  aria-valuenow={r.puntaje}
                  aria-label="Puntaje crediticio"
                  title={`Puntaje: ${r.puntaje} de 1.000`}
                  className="h-2 rounded-full bg-emerald-100"
                >
                  <div className="h-2 rounded-full bg-emerald-600 transition-all" style={{ width: `${r.puntaje / 10}%` }} />
                </div>
                <div className="relative mt-1 h-4 text-xs text-slate-400">
                  {[400, 600, 800].map((m) => (
                    <span key={m} className="absolute -translate-x-1/2" style={{ left: `${m / 10}%` }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Dato titulo="Compras al mes" valor={pesos(r.compraMensual)} />
                <Dato
                  titulo="Cupo según tu nivel"
                  valor={`${r.nivel.porcentajeCupo}%`}
                  detalle={`de tus compras (máx. ${pesos(CUPO_MAXIMO)})`}
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">Qué tiene en cuenta la IA</p>
                {r.factores.map((f) => (
                  <div key={f.id} className="mb-3" title={`${f.nombre}: ${f.puntos} de ${f.maximo} puntos`}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-slate-600">{f.nombre}</span>
                      <span className="font-semibold text-slate-900">
                        {f.puntos}/{f.maximo}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-emerald-100">
                      <div className="h-2 rounded-full bg-emerald-500 transition-all" style={{ width: `${(f.puntos / f.maximo) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {r.siguienteNivel && mejorConsejo && (
                <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  <strong>💡 Para llegar a {r.siguienteNivel.nombre}</strong> te faltan {r.siguienteNivel.desde - r.puntaje}{' '}
                  puntos. {mejorConsejo.consejo}
                </p>
              )}
            </div>
          ) : (
            <p className="py-10 text-center text-slate-500">Escribe el valor promedio de tus pedidos para ver el resultado.</p>
          )}
        </section>
      </div>
    </PaginaAncha>
  )
}

function Deslizador({
  etiqueta,
  valor,
  texto,
  min,
  max,
  paso = 1,
  alCambiar,
}: {
  etiqueta: string
  valor: number
  texto: string
  min: number
  max: number
  paso?: number
  alCambiar: (v: number) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium text-slate-700">
        <span>{etiqueta}</span>
        <span className="shrink-0 text-base font-bold whitespace-nowrap text-emerald-700">{texto}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(e) => alCambiar(Number(e.target.value))}
        className="w-full accent-emerald-600"
      />
      <span className="flex justify-between text-xs text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </span>
    </label>
  )
}

function Dato({ titulo, valor, detalle }: { titulo: string; valor: string; detalle?: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{titulo}</p>
      <p className="mt-1 text-lg font-bold break-all text-slate-900 sm:text-xl">{valor}</p>
      {detalle && <p className="mt-0.5 text-xs text-slate-500">{detalle}</p>}
    </div>
  )
}
