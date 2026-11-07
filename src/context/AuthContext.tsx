import { onAuthStateChanged, type User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { auth } from '../lib/firebase'

type EstadoSesion = {
  usuario: User | null
  cargando: boolean
}

const SesionContext = createContext<EstadoSesion>({ usuario: null, cargando: true })

// Escucha a Firebase y comparte con toda la app quién ha iniciado sesión.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoSesion>({ usuario: null, cargando: true })

  useEffect(() => {
    return onAuthStateChanged(auth, (usuario) => setEstado({ usuario, cargando: false }))
  }, [])

  return <SesionContext.Provider value={estado}>{children}</SesionContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSesion() {
  return useContext(SesionContext)
}
