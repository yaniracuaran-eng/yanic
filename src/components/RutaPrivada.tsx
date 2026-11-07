import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useSesion } from '../context/AuthContext'
import { Cargando, Tarjeta } from './ui'

// Deja pasar solo a quien inició sesión; a los demás los manda al login.
export default function RutaPrivada({ children }: { children: ReactNode }) {
  const { usuario, cargando } = useSesion()

  if (cargando) {
    return (
      <Tarjeta>
        <Cargando texto="Comprobando tu sesión…" />
      </Tarjeta>
    )
  }

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}
