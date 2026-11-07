import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import RutaPrivada from './components/RutaPrivada'
import { AuthProvider } from './context/AuthContext'
import IndicadoresPage from './pages/IndicadoresPage'
import InicioPage from './pages/InicioPage'
import LoginPage from './pages/LoginPage'
import PanelPage from './pages/PanelPage'
import SimuladorProveedorPage from './pages/SimuladorProveedorPage'
import SimuladorTenderoPage from './pages/SimuladorTenderoPage'

const privada = (pagina: ReactNode) => <RutaPrivada>{pagina}</RutaPrivada>

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<InicioPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Privadas: piden haber iniciado sesión */}
          <Route path="/panel" element={privada(<PanelPage />)} />
          <Route path="/simulador/proveedor" element={privada(<SimuladorProveedorPage />)} />
          <Route path="/simulador/tendero" element={privada(<SimuladorTenderoPage />)} />
          <Route path="/indicadores" element={privada(<IndicadoresPage />)} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
