import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Asistente from './components/Asistente'
import Menu from './components/Menu'
import RutaPrivada from './components/RutaPrivada'
import { AuthProvider } from './context/AuthContext'
import IndicadoresPage from './pages/IndicadoresPage'
import InicioPage from './pages/InicioPage'
import LoginPage from './pages/LoginPage'
import MercadoPage from './pages/MercadoPage'
import PanelPage from './pages/PanelPage'
import SeguimientoPage from './pages/SeguimientoPage'
import SimuladorProveedorPage from './pages/SimuladorProveedorPage'
import SimuladorTenderoPage from './pages/SimuladorTenderoPage'
import TerritoriosPage from './pages/TerritoriosPage'

const privada = (pagina: ReactNode) => <RutaPrivada>{pagina}</RutaPrivada>

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Menú fijo arriba en todas las páginas */}
        <Menu />

        <Routes>
          {/* Públicas */}
          <Route path="/" element={<InicioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mercado" element={<MercadoPage />} />
          <Route path="/territorios" element={<TerritoriosPage />} />

          {/* Privadas: piden haber iniciado sesión */}
          <Route path="/panel" element={privada(<PanelPage />)} />
          <Route path="/simulador/proveedor" element={privada(<SimuladorProveedorPage />)} />
          <Route path="/simulador/tendero" element={privada(<SimuladorTenderoPage />)} />
          <Route path="/indicadores" element={privada(<IndicadoresPage />)} />
          <Route path="/seguimiento" element={privada(<SeguimientoPage />)} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Asistente virtual en todas las páginas */}
        <Asistente />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
