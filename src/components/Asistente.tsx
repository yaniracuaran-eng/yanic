import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { BIENVENIDA, responder, SUGERENCIAS, type Respuesta } from '../lib/asistente'

type Mensaje = { de: 'usuario' | 'asistente'; contenido: Respuesta }

// Botón flotante con el asistente virtual, disponible en todas las páginas.
export default function Asistente() {
  const [abierto, setAbierto] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([{ de: 'asistente', contenido: BIENVENIDA }])
  const [texto, setTexto] = useState('')
  const finRef = useRef<HTMLDivElement>(null)
  const entradaRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, abierto])

  useEffect(() => {
    if (abierto) entradaRef.current?.focus()
  }, [abierto])

  function preguntar(pregunta: string) {
    const limpia = pregunta.trim()
    if (!limpia) return
    setMensajes((m) => [
      ...m,
      { de: 'usuario', contenido: { texto: limpia } },
      { de: 'asistente', contenido: responder(limpia) },
    ])
    setTexto('')
  }

  function enviar(e: FormEvent) {
    e.preventDefault()
    preguntar(texto)
  }

  return (
    <>
      {abierto && (
        <div
          role="dialog"
          aria-label="Asistente virtual"
          className="fixed inset-x-3 bottom-20 z-50 flex max-h-[75dvh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:right-5 sm:left-auto sm:w-96"
        >
          <header className="flex items-center gap-3 bg-emerald-700 px-4 py-3 text-white">
            <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-lg" aria-hidden>
              🌱
            </span>
            <div className="flex-1">
              <p className="font-semibold">Asistente Agro-Link</p>
              <p className="text-xs text-emerald-100">Respuestas automáticas · Demostración académica</p>
            </div>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar el asistente"
              className="rounded-lg px-2 py-1 text-xl leading-none hover:bg-white/15"
            >
              ×
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.de === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.de === 'usuario' ? 'rounded-br-md bg-emerald-600 text-white' : 'rounded-bl-md bg-slate-100 text-slate-800'
                  }`}
                >
                  <p>{m.contenido.texto}</p>
                  {m.contenido.enlace && (
                    <Link
                      to={m.contenido.enlace.a}
                      onClick={() => setAbierto(false)}
                      className="mt-2 inline-block rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50"
                    >
                      {m.contenido.enlace.texto} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <div ref={finRef} />
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-3 py-2">
            {SUGERENCIAS.map((s) => (
              <button
                key={s}
                onClick={() => preguntar(s)}
                className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800 hover:bg-emerald-100"
              >
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={enviar} className="flex gap-2 border-t border-slate-100 p-3">
            <input
              ref={entradaRef}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe tu pregunta…"
              aria-label="Tu pregunta"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-base outline-none focus:border-emerald-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!texto.trim()}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        aria-label={abierto ? 'Cerrar el asistente' : 'Abrir el asistente virtual'}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 font-semibold text-white shadow-xl transition hover:bg-emerald-700 sm:right-5 sm:bottom-5"
      >
        <span aria-hidden>{abierto ? '×' : '💬'}</span>
        <span className="hidden sm:inline">{abierto ? 'Cerrar' : '¿Tienes preguntas?'}</span>
      </button>
    </>
  )
}
