import PaginaAncha from '../components/PaginaAncha'
import { DESTACADOS, INDICADORES, MES_DEL_PILOTO, type Estado, type Indicador } from '../lib/indicadores'

const ESTADOS: Record<Estado, { icono: string; texto: string; clase: string }> = {
  cumplida: { icono: '✓', texto: 'Meta cumplida', clase: 'bg-green-50 text-green-800 ring-green-200' },
  'en-camino': { icono: '◐', texto: 'En camino', clase: 'bg-amber-50 text-amber-900 ring-amber-200' },
  'linea-base': { icono: '◌', texto: 'Midiendo línea base', clase: 'bg-slate-100 text-slate-700 ring-slate-200' },
}

const DIMENSIONES: Indicador['dimension'][] = ['Ambiental (A)', 'Social (S)', 'Financiero', 'Gobierno (G)']

export default function IndicadoresPage() {
  const cumplidas = INDICADORES.filter((i) => i.estado === 'cumplida').length

  return (
    <PaginaAncha
      etiqueta="Indicadores de resultado"
      titulo="¿Cómo se mide el impacto del programa?"
      descripcion={`Avance de los 11 indicadores del piloto, con datos simulados del mes ${MES_DEL_PILOTO} de 12.`}
    >
      <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 ring-1 ring-amber-200">
        ⚠ Datos simulados para la demostración
      </p>

      {/* Fila de cifras destacadas */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {DESTACADOS.map((d) => (
          <div key={d.titulo} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">{d.titulo}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{d.valor}</p>
            <p className="text-xs text-slate-500">{d.detalle}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-medium text-slate-700">Metas cumplidas</span>
          <span className="text-sm text-slate-600">
            <strong className="text-lg text-slate-900">{cumplidas}</strong> de {INDICADORES.length}
          </span>
        </div>
        <div
          role="meter"
          aria-label="Metas cumplidas"
          aria-valuemin={0}
          aria-valuemax={INDICADORES.length}
          aria-valuenow={cumplidas}
          title={`${cumplidas} de ${INDICADORES.length} metas cumplidas`}
          className="h-2 rounded-full bg-emerald-100"
        >
          <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${(cumplidas / INDICADORES.length) * 100}%` }} />
        </div>
      </div>

      {/* Indicadores por dimensión */}
      <div className="mt-8 space-y-8">
        {DIMENSIONES.map((dim) => (
          <section key={dim}>
            <h2 className="mb-3 text-lg font-bold text-slate-900">{dim}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {INDICADORES.filter((i) => i.dimension === dim).map((i) => (
                <TarjetaIndicador key={i.nombre} indicador={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PaginaAncha>
  )
}

function TarjetaIndicador({ indicador: i }: { indicador: Indicador }) {
  const estado = ESTADOS[i.estado]
  return (
    <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-700">{i.nombre}</p>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${estado.clase}`}>
          <span aria-hidden>{estado.icono}</span>
          {estado.texto}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{i.valor}</p>
      <p className="text-xs text-slate-500">
        Meta: {i.meta}
        {i.nota && ` · ${i.nota}`}
      </p>
      {i.avance !== null && (
        <div className="mt-auto pt-3">
          <div
            role="meter"
            aria-label={`Avance: ${i.nombre}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(i.avance * 100)}
            title={`Avance hacia la meta: ${Math.round(i.avance * 100)}%`}
            className="h-2 rounded-full bg-emerald-100"
          >
            <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${Math.max(2, i.avance * 100)}%` }} />
          </div>
        </div>
      )}
    </article>
  )
}
