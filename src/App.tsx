import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import RutaPrivada from './components/RutaPrivada'
import { AuthProvider } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import PanelPage from './pages/PanelPage'
import SimuladorProveedorPage from './pages/SimuladorProveedorPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/panel"
            element={
              <RutaPrivada>
                <PanelPage />
              </RutaPrivada>
            }
          />
          <Route
            path="/simulador/proveedor"
            element={
              <RutaPrivada>
                <SimuladorProveedorPage />
              </RutaPrivada>
            }
          />
          <Route path="*" element={<Navigate to="/panel" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
