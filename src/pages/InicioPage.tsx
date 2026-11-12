import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { AvisoAcademico } from '../components/PaginaAncha'
import { useSesion } from '../context/AuthContext'

export default function InicioPage() {
  const { usuario } = useSesion()
  const destino = usuario ? '/panel' : '/login'
  const textoBoton = usuario ? 'Ir a Mi panel' : 'Probar la demostración'

  return (
    <main className="min-h-dvh bg-white">
      {/* Portada */}
      <section className="bg-gradient-to-br from-emerald-700 to-teal-700 px-4 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            Propuesta académica · Trabajo final del diplomado
          </p>
          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">One Nutresa Open Finance &amp; AI Agro-Link</h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            Liquidez oportuna para pequeños productores y tenderos, con tasas que premian las buenas prácticas
            ambientales.
          </p>
          <Link
            to={destino}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-800 shadow-lg transition hover:bg-emerald-50"
          >
            {textoBoton} →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12">
        <Seccion numero="1" titulo="La necesidad">
          <p className="max-w-3xl text-slate-600">
            Los pequeños productores de café, cacao y ganadería, y los tenderos del canal tradicional, tienen dificultad
            para conseguir dinero a tiempo y a tasas justas. Eso frena la adopción de prácticas sostenibles en el campo y
            limita el inventario en las tiendas de barrio.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Tarjeta icono="🧑‍🌾" titulo="Proveedores agrícolas">
              Cobran sus facturas por adelantado, con tasas que bajan según su desempeño ambiental.
            </Tarjeta>
            <Tarjeta icono="🏪" titulo="Tenderos de Pideky">
              Reciben un microcrédito automático para surtir su tienda, sin trámites complejos.
            </Tarjeta>
            <Tarjeta icono="🏭" titulo="La cadena de valor">
              Abastecimiento más estable, menos interrupciones y un ecosistema digital más fuerte.
            </Tarjeta>
          </div>
        </Seccion>

        <Seccion numero="2" titulo="El objetivo">
          <ul className="grid gap-3 sm:grid-cols-3">
            <Punto>Abastecer más del 80% de las materias primas de forma sostenible al 2030.</Punto>
            <Punto>Llevar las ventas digitales del 8,1% hacia el 20% de los ingresos.</Punto>
            <Punto>Reducir el costo financiero en toda la cadena de suministro.</Punto>
          </ul>
        </Seccion>

        <Seccion numero="3" titulo="Cómo funciona">
          <div className="grid gap-4 md:grid-cols-2">
            <Eje
              icono="🌱"
              titulo="Eje de abastecimiento: factoring ASG"
              pasos={[
                'El proveedor registra su factura en el portal digital.',
                'Bancos y fintechs compiten por financiarla mediante Open Finance.',
                'Si Ábora verifica por satélite que su predio está libre de deforestación, la tasa baja.',
              ]}
            />
            <Eje
              icono="🏪"
              titulo="Eje comercial: microcrédito Pideky"
              pasos={[
                'La inteligencia artificial analiza el historial de pedidos y pagos del tendero.',
                'Se pre-aprueba un cupo de crédito rotatorio al momento de hacer el pedido.',
                'El historial digital reemplaza las garantías y los papeles tradicionales.',
              ]}
            />
          </div>
        </Seccion>

        <Seccion numero="4" titulo="Criterios ASG">
          <div className="grid gap-4 sm:grid-cols-3">
            <Tarjeta icono="🌍" titulo="Ambiental">
              Menos emisiones en la cadena agrícola y ganadera, y beneficios por usar empaques sostenibles.
            </Tarjeta>
            <Tarjeta icono="🤝" titulo="Social">
              Inclusión financiera de pequeños agricultores y microempresarios urbanos.
            </Tarjeta>
            <Tarjeta icono="⚖️" titulo="Gobierno corporativo">
              Reporte bajo NIIF S1 y S2, GRI, SASB y TCFD, y controles contra lavado de activos.
            </Tarjeta>
          </div>
        </Seccion>

        <Seccion numero="5" titulo="Viabilidad">
          <p className="max-w-3xl text-slate-600">
            La empresa no asume el riesgo de crédito ni actúa como intermediario financiero: la plataforma conecta su
            información con entidades vigiladas por la Superintendencia Financiera. Se sostiene con ahorros de
            abastecimiento, más ventas por Pideky y tarifas de uso cobradas a las entidades financieras participantes.
          </p>
        </Seccion>

        <Seccion numero="6" titulo="Innovación financiera">
          <div className="grid gap-4 sm:grid-cols-3">
            <Tarjeta icono="🔗" titulo="Open Finance">
              Integración segura por APIs entre los sistemas de la empresa y las entidades financieras.
            </Tarjeta>
            <Tarjeta icono="🤖" titulo="Inteligencia artificial">
              Puntaje de crédito alternativo con base en el historial de compras.
            </Tarjeta>
            <Tarjeta icono="🛰️" titulo="Monitoreo satelital">
              Trazabilidad ambiental de los predios con la plataforma geoinformática Ábora.
            </Tarjeta>
          </div>
        </Seccion>

        <Seccion numero="7" titulo="Riesgos y controles">
          <div className="grid gap-4 md:grid-cols-3">
            <Riesgo titulo="Tecnológico" riesgo="Fallas en las APIs o ciberataques." control="Nube redundante, ciberseguridad y planes de continuidad." />
            <Riesgo titulo="Operativo" riesgo="Mora de los tenderos o retrasos por clima u orden público." control="Cupos ajustados por IA y diversificación en 28 departamentos." />
            <Riesgo titulo="Normativo" riesgo="Cambios en protección de datos, Open Finance o reportes ASG." control="Comité de Cumplimiento y gobernanza con la Junta Directiva." />
          </div>
        </Seccion>

        <Seccion numero="8" titulo="Indicadores de resultado">
          <p className="max-w-3xl text-slate-600">
            11 indicadores miden el impacto ambiental, social, financiero y de gobierno durante un piloto de 12 meses.
            Puedes verlos, junto con los dos simuladores, en la demostración.
          </p>
        </Seccion>

        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">Explora la plataforma</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Explorar a="/mercado" icono="📈" titulo="Precios y mercado" texto="Cómo se mueven los precios del café, cacao, ganado y leche." />
            <Explorar a="/territorios" icono="🗺️" titulo="Territorios" texto="Los 28 departamentos donde está el programa." />
            <Explorar a="/indicadores" icono="📊" titulo="Indicadores" texto="Metas del piloto e indicadores financieros y productivos." privada />
            <Explorar a="/seguimiento" icono="🧑‍🌾" titulo="Seguimiento" texto="Productores y proveedores, paso a paso." privada />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">¿Por qué confiar?</h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <Punto>El dinero lo ponen entidades vigiladas por la Superintendencia Financiera de Colombia.</Punto>
            <Punto>Tus datos se manejan según la ley de Habeas Data, con conexiones seguras de Open Finance.</Punto>
            <Punto>La verificación ambiental es satelital y objetiva: no depende de papeles.</Punto>
            <Punto>Usar la plataforma no tiene costo para productores ni tenderos.</Punto>
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            ¿Tienes dudas? Pregúntale al asistente con el botón 💬 de abajo a la derecha.
          </p>
        </section>

        <section className="rounded-3xl bg-emerald-50 p-6 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Pruébalo tú mismo</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Simula el factoring ASG de un proveedor, el cupo de crédito de un tendero, sigue a los productores y revisa
            los indicadores.
          </p>
          <Link
            to={destino}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            {textoBoton} →
          </Link>
        </section>

        <AvisoAcademico />
      </div>
    </main>
  )
}

function Seccion({ numero, titulo, children }: { numero: string; titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-slate-900 sm:text-2xl">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-800">
          {numero}
        </span>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

function Tarjeta({ icono, titulo, children }: { icono: string; titulo: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <span className="text-2xl" aria-hidden>
        {icono}
      </span>
      <h3 className="mt-2 font-semibold text-slate-900">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-600">{children}</p>
    </div>
  )
}

function Explorar({
  a,
  icono,
  titulo,
  texto,
  privada = false,
}: {
  a: string
  icono: string
  titulo: string
  texto: string
  privada?: boolean
}) {
  return (
    <Link to={a} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <span className="text-2xl" aria-hidden>
        {icono}
      </span>
      <h3 className="mt-2 font-semibold text-slate-900">{titulo}</h3>
      <p className="mt-1 text-sm text-slate-600">{texto}</p>
      {privada && <p className="mt-2 text-xs text-slate-400">🔐 Requiere iniciar sesión</p>}
    </Link>
  )
}

function Punto({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
      <span className="font-bold text-emerald-600" aria-hidden>
        ✓
      </span>
      {children}
    </li>
  )
}

function Eje({ icono, titulo, pasos }: { icono: string; titulo: string; pasos: string[] }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 font-semibold text-slate-900">
        <span className="text-2xl" aria-hidden>
          {icono}
        </span>
        {titulo}
      </h3>
      <ol className="mt-3 space-y-2">
        {pasos.map((p, n) => (
          <li key={p} className="flex gap-3 text-sm text-slate-600">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              {n + 1}
            </span>
            {p}
          </li>
        ))}
      </ol>
    </div>
  )
}

function Riesgo({ titulo, riesgo, control }: { titulo: string; riesgo: string; control: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">{titulo}</h3>
      <p className="mt-2 text-sm text-slate-600">
        <span className="font-medium text-slate-800">Riesgo: </span>
        {riesgo}
      </p>
      <p className="mt-1 text-sm text-slate-600">
        <span className="font-medium text-slate-800">Control: </span>
        {control}
      </p>
    </div>
  )
}
