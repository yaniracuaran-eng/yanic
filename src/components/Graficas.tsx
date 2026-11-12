import { useEffect, useRef, useState } from 'react'

// Gráficas sencillas (una sola serie) con tooltip al pasar el mouse o tocar.
// La serie usa el color de acento; ejes y cuadrícula van en gris suave.

export type Punto = { etiqueta: string; valor: number }

type Props = {
  titulo: string
  datos: Punto[]
  formato: (n: number) => string
  alto?: number
}

const MARGEN = { arriba: 12, abajo: 26, izquierda: 8, derecha: 8 }

function escala(datos: Punto[], alto: number, desdeCero: boolean, ANCHO: number) {
  const valores = datos.map((d) => d.valor)
  let min = desdeCero ? 0 : Math.min(...valores)
  let max = Math.max(...valores)
  if (!desdeCero) {
    const margen = (max - min) * 0.15 || max * 0.05
    min -= margen
    max += margen
  }
  const altoUtil = alto - MARGEN.arriba - MARGEN.abajo
  const y = (v: number) => MARGEN.arriba + altoUtil - ((v - min) / (max - min || 1)) * altoUtil
  const anchoUtil = ANCHO - MARGEN.izquierda - MARGEN.derecha
  const paso = anchoUtil / datos.length
  const x = (i: number) => MARGEN.izquierda + paso * i + paso / 2
  return { x, y, paso, base: alto - MARGEN.abajo }
}

function Tooltip({ visible, x, texto, etiqueta, ANCHO }: { visible: boolean; x: number; texto: string; etiqueta: string; ANCHO: number }) {
  if (!visible) return null
  const izquierda = Math.min(85, Math.max(15, (x / ANCHO) * 100))
  return (
    <div
      className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
      style={{ left: `${izquierda}%` }}
    >
      <span className="text-slate-300">{etiqueta}: </span>
      <strong>{texto}</strong>
    </div>
  )
}

function EjeX({ datos, x, base, ANCHO }: { datos: Punto[]; x: (i: number) => number; base: number; ANCHO: number }) {
  return (
    <>
      <line x1={MARGEN.izquierda} x2={ANCHO - MARGEN.derecha} y1={base} y2={base} stroke="#cbd5e1" strokeWidth={1} />
      {datos.map((d, i) =>
        i % 2 === 0 || datos.length <= 6 || ANCHO >= 480 ? (
          <text key={d.etiqueta} x={x(i)} y={base + 17} textAnchor="middle" fontSize={12} fill="#64748b">
            {d.etiqueta}
          </text>
        ) : null,
      )}
    </>
  )
}

/** Mide el ancho real del contenedor para que 1 unidad del dibujo = 1 píxel (texto siempre legible). */
function useAncho() {
  const ref = useRef<HTMLElement>(null)
  const [ancho, setAncho] = useState(600)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => setAncho(Math.max(240, Math.round(el.getBoundingClientRect().width)))
    medir()
    const obs = new ResizeObserver(medir)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, ancho] as const
}

export function GraficoLinea({ titulo, datos, formato, alto = 170 }: Props) {
  const [activo, setActivo] = useState<number | null>(null)
  const [ref, ANCHO] = useAncho()
  const { x, y, paso, base } = escala(datos, alto, false, ANCHO)
  const camino = datos.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.valor)}`).join(' ')

  return (
    <figure ref={ref} className="relative">
      <figcaption className="sr-only">{titulo}</figcaption>
      <Tooltip
        visible={activo !== null}
        x={activo !== null ? x(activo) : 0}
        etiqueta={activo !== null ? datos[activo].etiqueta : ''}
        texto={activo !== null ? formato(datos[activo].valor) : ''}
        ANCHO={ANCHO}
      />
      <svg viewBox={`0 0 ${ANCHO} ${alto}`} className="w-full" role="img" aria-label={titulo} onMouseLeave={() => setActivo(null)}>
        <EjeX datos={datos} x={x} base={base} ANCHO={ANCHO} />
        {activo !== null && (
          <line x1={x(activo)} x2={x(activo)} y1={MARGEN.arriba} y2={base} stroke="#94a3b8" strokeDasharray="3 3" />
        )}
        <path d={camino} fill="none" stroke="#059669" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {datos.map((d, i) => (
          <circle
            key={d.etiqueta}
            cx={x(i)}
            cy={y(d.valor)}
            r={activo === i ? 5 : i === datos.length - 1 ? 4 : 0}
            fill="#059669"
            stroke="white"
            strokeWidth={2}
          />
        ))}
        {datos.map((d, i) => (
          <rect
            key={`zona-${d.etiqueta}`}
            x={x(i) - paso / 2}
            y={0}
            width={paso}
            height={alto}
            fill="transparent"
            onMouseEnter={() => setActivo(i)}
            onClick={() => setActivo(i)}
          >
            <title>{`${d.etiqueta}: ${formato(d.valor)}`}</title>
          </rect>
        ))}
      </svg>
    </figure>
  )
}

export function GraficoBarras({ titulo, datos, formato, alto = 170 }: Props) {
  const [activo, setActivo] = useState<number | null>(null)
  const [ref, ANCHO] = useAncho()
  const { x, y, paso, base } = escala(datos, alto, true, ANCHO)
  const ancho = Math.min(36, paso - 6)

  return (
    <figure ref={ref} className="relative">
      <figcaption className="sr-only">{titulo}</figcaption>
      <Tooltip
        visible={activo !== null}
        x={activo !== null ? x(activo) : 0}
        etiqueta={activo !== null ? datos[activo].etiqueta : ''}
        texto={activo !== null ? formato(datos[activo].valor) : ''}
        ANCHO={ANCHO}
      />
      <svg viewBox={`0 0 ${ANCHO} ${alto}`} className="w-full" role="img" aria-label={titulo} onMouseLeave={() => setActivo(null)}>
        {datos.map((d, i) => {
          const tope = y(d.valor)
          const h = Math.max(0, base - tope)
          const color = activo === null || activo === i ? '#059669' : '#a7f3d0'
          return (
            <g key={d.etiqueta}>
              {/* Esquinas redondeadas arriba, base recta sobre el eje */}
              <rect x={x(i) - ancho / 2} y={tope} width={ancho} height={h} rx={4} fill={color} />
              <rect x={x(i) - ancho / 2} y={tope + Math.min(4, h)} width={ancho} height={Math.max(0, h - 4)} fill={color} />
            </g>
          )
        })}
        <EjeX datos={datos} x={x} base={base} ANCHO={ANCHO} />
        {datos.map((d, i) => (
          <rect
            key={`zona-${d.etiqueta}`}
            x={x(i) - paso / 2}
            y={0}
            width={paso}
            height={alto}
            fill="transparent"
            onMouseEnter={() => setActivo(i)}
            onClick={() => setActivo(i)}
          >
            <title>{`${d.etiqueta}: ${formato(d.valor)}`}</title>
          </rect>
        ))}
      </svg>
    </figure>
  )
}

/** Tabla accesible con los mismos datos de una gráfica. */
export function TablaDatos({ datos, formato, columna }: { datos: Punto[]; formato: (n: number) => string; columna: string }) {
  return (
    <details className="mt-2 text-sm">
      <summary className="cursor-pointer text-emerald-700 hover:underline">Ver como tabla</summary>
      <table className="mt-2 w-full text-left text-slate-700">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            <th className="py-1 font-medium">Mes</th>
            <th className="py-1 text-right font-medium">{columna}</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr key={d.etiqueta} className="border-b border-slate-100">
              <td className="py-1">{d.etiqueta}</td>
              <td className="py-1 text-right tabular-nums">{formato(d.valor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}
