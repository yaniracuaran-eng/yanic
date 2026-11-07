import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from 'firebase/auth'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Aviso, Boton, Cargando, Tarjeta } from '../components/ui'
import { useSesion } from '../context/AuthContext'
import { auth } from '../lib/firebase'
import { esEnlaceInvalido, mensajeDeError, mensajeDeErrorGoogle } from '../lib/mensajesError'

const CLAVE_CORREO = 'correoParaIniciarSesion'

type Paso =
  | 'formulario' // escribir el correo
  | 'enviado' // el enlace ya salió hacia el correo
  | 'confirmar' // volvió desde el enlace pero no sabemos su correo (otro dispositivo)
  | 'verificando' // completando el inicio de sesión con el enlace
  | 'enlaceInvalido' // el enlace venció o ya se usó
  | 'exito'

export default function LoginPage() {
  const { usuario, cargando } = useSesion()
  const navigate = useNavigate()

  // ¿La persona llegó aquí haciendo clic en el enlace del correo?
  const [vieneDelEnlace] = useState(() => isSignInWithEmailLink(auth, window.location.href))
  const [correoGuardado] = useState(() => window.localStorage.getItem(CLAVE_CORREO))
  const [paso, setPaso] = useState<Paso>(() => {
    if (!vieneDelEnlace) return 'formulario'
    return correoGuardado ? 'verificando' : 'confirmar'
  })
  const [correo, setCorreo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conGoogle, setConGoogle] = useState(false)
  const [errorGoogle, setErrorGoogle] = useState<string | null>(null)
  const yaIntentado = useRef(false)

  // Abre la ventana de Google; al volver con éxito, la sesión lleva al panel sola.
  async function entrarConGoogle() {
    setConGoogle(true)
    setErrorGoogle(null)
    try {
      const proveedor = new GoogleAuthProvider()
      proveedor.setCustomParameters({ prompt: 'select_account' })
      await signInWithPopup(auth, proveedor)
    } catch (e) {
      setErrorGoogle(mensajeDeErrorGoogle(e))
    } finally {
      setConGoogle(false)
    }
  }

  async function completarInicio(correoUsado: string) {
    setPaso('verificando')
    setError(null)
    try {
      await signInWithEmailLink(auth, correoUsado, window.location.href)
      window.localStorage.removeItem(CLAVE_CORREO)
      setPaso('exito')
    } catch (e) {
      setError(mensajeDeError(e))
      setCorreo(correoUsado) // así puede reintentar sin volver a escribirlo
      setPaso(esEnlaceInvalido(e) ? 'enlaceInvalido' : 'confirmar')
    }
  }

  // Al volver desde el correo en el mismo dispositivo, completa el inicio de sesión solo.
  useEffect(() => {
    if (!vieneDelEnlace || !correoGuardado || yaIntentado.current) return
    yaIntentado.current = true
    void completarInicio(correoGuardado)
  }, [vieneDelEnlace, correoGuardado])

  async function enviarEnlace(e: FormEvent) {
    e.preventDefault()
    const limpio = correo.trim()
    if (!limpio) {
      setError('Escribe tu correo electrónico.')
      return
    }
    setEnviando(true)
    setError(null)
    try {
      await sendSignInLinkToEmail(auth, limpio, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      })
      window.localStorage.setItem(CLAVE_CORREO, limpio)
      setCorreo(limpio)
      setPaso('enviado')
    } catch (e) {
      setError(mensajeDeError(e))
    } finally {
      setEnviando(false)
    }
  }

  function confirmarCorreo(e: FormEvent) {
    e.preventDefault()
    const limpio = correo.trim()
    if (!limpio) {
      setError('Escribe el mismo correo al que te llegó el enlace.')
      return
    }
    void completarInicio(limpio)
  }

  function pedirEnlaceNuevo() {
    setError(null)
    setPaso('formulario')
    navigate('/login', { replace: true }) // quita el código viejo de la dirección
  }

  // Si ya hay sesión (y no estamos en medio de completarla), ir al panel.
  if (!cargando && usuario && paso !== 'verificando') {
    return <Navigate to="/panel" replace />
  }

  return (
    <Tarjeta>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
          🔐
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-slate-500">Sin contraseña: entra con Google o con un enlace a tu correo.</p>
      </div>

      {paso === 'verificando' && <Cargando texto="Verificando tu enlace…" />}

      {paso === 'exito' && <Cargando texto="¡Listo! Entrando a tu panel…" />}

      {paso === 'formulario' && (
        <div className="mb-5 space-y-3">
          <button
            type="button"
            onClick={entrarConGoogle}
            disabled={conGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {conGoogle ? (
              <span className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
            ) : (
              <LogoGoogle />
            )}
            {conGoogle ? 'Esperando a Google…' : 'Continuar con Google'}
          </button>
          {errorGoogle && <Aviso tipo="error">{errorGoogle}</Aviso>}

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />o con un enlace a tu correo
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </div>
      )}

      {paso === 'formulario' && (
        <form onSubmit={enviarEnlace} className="space-y-4" noValidate>
          <CampoCorreo valor={correo} alCambiar={setCorreo} deshabilitado={enviando} />
          {error && <Aviso tipo="error">{error}</Aviso>}
          <Boton type="submit" cargando={enviando}>
            {enviando ? 'Enviando…' : 'Enviarme el enlace'}
          </Boton>
        </form>
      )}

      {paso === 'enviado' && (
        <div className="space-y-4">
          <Aviso tipo="exito">
            Te enviamos un enlace a <strong className="break-all">{correo}</strong>. Ábrelo desde este mismo
            dispositivo para entrar.
          </Aviso>
          <p className="text-center text-sm text-slate-500">
            ¿No lo ves? Revisa la carpeta de spam o correo no deseado.
          </p>
          <Boton
            variante="secundario"
            onClick={() => {
              setError(null)
              setPaso('formulario')
            }}
          >
            Usar otro correo
          </Boton>
        </div>
      )}

      {paso === 'confirmar' && (
        <form onSubmit={confirmarCorreo} className="space-y-4" noValidate>
          {!correoGuardado && (
            <Aviso tipo="exito">
              Parece que abriste el enlace en otro dispositivo. Por seguridad, escribe el correo al que te llegó.
            </Aviso>
          )}
          <CampoCorreo valor={correo} alCambiar={setCorreo} />
          {error && <Aviso tipo="error">{error}</Aviso>}
          <Boton type="submit">Confirmar y entrar</Boton>
        </form>
      )}

      {paso === 'enlaceInvalido' && (
        <div className="space-y-4">
          {error && <Aviso tipo="error">{error}</Aviso>}
          <Boton onClick={pedirEnlaceNuevo}>Pedir un enlace nuevo</Boton>
        </div>
      )}
    </Tarjeta>
  )
}

function LogoGoogle() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

function CampoCorreo({
  valor,
  alCambiar,
  deshabilitado = false,
}: {
  valor: string
  alCambiar: (v: string) => void
  deshabilitado?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">Correo electrónico</span>
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="tucorreo@ejemplo.com"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        disabled={deshabilitado}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:opacity-60"
      />
    </label>
  )
}
