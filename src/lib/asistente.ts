// Asistente virtual con respuestas preparadas (sin inteligencia artificial).
// Busca palabras clave en la pregunta y devuelve la respuesta del tema que más coincide.
// Para agregar o cambiar respuestas, edita la lista TEMAS.

export type Respuesta = {
  texto: string
  enlace?: { a: string; texto: string }
}

type Tema = Respuesta & { id: string; palabras: string[] }

export const SUGERENCIAS = [
  '¿Qué es el programa?',
  '¿Cómo baja mi tasa?',
  '¿Cómo obtengo un cupo de crédito?',
  '¿Mis datos están seguros?',
  '¿Dónde están presentes?',
  '¿Cómo van los precios del café?',
]

export const BIENVENIDA: Respuesta = {
  texto:
    '¡Hola! 👋 Soy el asistente de Agro-Link. Respondo preguntas sobre el programa, las tasas, los créditos, los precios y más. Escribe tu pregunta o elige una de abajo.',
}

const TEMAS: Tema[] = [
  {
    id: 'saludo',
    palabras: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'hey', 'saludos'],
    texto: '¡Hola! ¿En qué te puedo ayudar? Puedes preguntarme por las tasas, los créditos para tenderos, los precios o dónde estamos.',
  },
  {
    id: 'que-es',
    palabras: ['programa','agro-link', 'agro link', 'de que se trata', 'para que sirve', 'plataforma', 'propuesta'],
    texto:
      'One Nutresa Open Finance & AI Agro-Link es una propuesta para dar liquidez oportuna a pequeños productores y tenderos. Los productores cobran sus facturas por adelantado con tasas que bajan si cuidan el ambiente, y los tenderos de Pideky reciben un microcrédito automático usando su historial de compras como respaldo.',
    enlace: { a: '/', texto: 'Ver la propuesta completa' },
  },
  {
    id: 'factoring',
    palabras: ['factoring', 'factura', 'adelantar', 'adelanto', 'anticipo', 'anticipado', 'pago rapido', 'cobrar', 'liquidez'],
    texto:
      'Con el factoring ASG registras tu factura en el portal de proveedores y bancos o fintechs compiten por pagártela por adelantado. Recibes el dinero en pocos días (la meta es menos de 72 horas) en lugar de esperar 60 o 90 días.',
    enlace: { a: '/simulador/proveedor', texto: 'Probar el simulador del proveedor' },
  },
  {
    id: 'tasa',
    palabras: ['tasa', 'interes', 'descuento', 'baja mi tasa', 'asg', 'ambiental', 'sostenible', 'practicas', 'carbono', 'empaques', 'deforestacion', 'beneficio'],
    texto:
      'Tu tasa baja según tus prácticas sostenibles: predio libre de deforestación (−2 puntos), prácticas bajas en carbono (−1,5), empaques sostenibles (−1) y trazabilidad de origen (−0,5). Con todas, la tasa de ejemplo pasa de 24% a 19% al año.',
    enlace: { a: '/simulador/proveedor', texto: 'Calcular mi ahorro' },
  },
  {
    id: 'abora',
    palabras: ['abora', 'satelite', 'satelital', 'verificacion', 'verificar', 'monitoreo', 'predio'],
    texto:
      'Ábora es la plataforma geoinformática que revisa con imágenes de satélite que tu predio esté libre de deforestación. Si queda verificado, obtienes el mayor descuento en tu tasa. No tienes que llevar papeles: la revisión se hace a distancia.',
    enlace: { a: '/seguimiento', texto: 'Ver el seguimiento de productores' },
  },
  {
    id: 'credito',
    palabras: ['tendero', 'tienda', 'credito', 'cupo', 'pideky', 'prestamo', 'microcredito', 'surtir', 'financiar pedido'],
    texto:
      'Si eres tendero de Pideky, la inteligencia artificial revisa tu historial: si pagas a tiempo, con qué frecuencia pides, cuánto llevas en Pideky y cuánto compras. Con eso se pre-aprueba un cupo rotatorio para financiar tus pedidos, sin garantías ni papeles.',
    enlace: { a: '/simulador/tendero', texto: 'Ver qué cupo tendría' },
  },
  {
    id: 'puntaje',
    palabras: ['puntaje', 'nivel', 'subir de nivel', 'mejorar', 'excelente', 'basico'],
    texto:
      'Tu puntaje va de 0 a 1.000. Lo que más pesa es pagar a tiempo (350 puntos), luego la frecuencia de pedidos (300), el tiempo en Pideky (250) y tu compra mensual (100). Desde 400 puntos ya tienes cupo; desde 800 eres nivel Excelente.',
    enlace: { a: '/simulador/tendero', texto: 'Ver mi puntaje simulado' },
  },
  {
    id: 'requisitos',
    palabras: ['requisito', 'papeles', 'garantia', 'documentos', 'fiador', 'codeudor', 'que necesito', 'como me inscribo', 'inscribir'],
    texto:
      'No necesitas finca raíz como garantía ni estados financieros auditados. Para los productores, el respaldo es la factura aprobada y la verificación satelital; para los tenderos, su historial de compras en Pideky.',
  },
  {
    id: 'entrar',
    palabras: ['iniciar sesion', 'entrar', 'login', 'ingresar', 'google', 'enlace', 'correo', 'contrasena', 'cuenta', 'registrar'],
    texto:
      'Puedes entrar con el botón "Continuar con Google" o pidiendo un enlace a tu correo. No necesitas contraseña.',
    enlace: { a: '/login', texto: 'Ir a iniciar sesión' },
  },
  {
    id: 'seguridad',
    palabras: ['seguro', 'seguridad', 'datos', 'privacidad', 'habeas', 'confiar', 'confianza', 'fraude', 'vigilad', 'superintendencia', 'riesgo'],
    texto:
      'En la propuesta, el dinero lo ponen entidades vigiladas por la Superintendencia Financiera de Colombia, los datos se manejan según la ley de Habeas Data y hay controles contra el lavado de activos. Además, la plataforma usa conexiones seguras (APIs de Open Finance) y planes de continuidad ante fallas.',
    enlace: { a: '/', texto: 'Ver riesgos y controles' },
  },
  {
    id: 'costo',
    palabras: ['cuanto cuesta', 'costo', 'gratis', 'cobran', 'comision', 'pagar por usar', 'precio de la plataforma'],
    texto:
      'Usar la plataforma no tiene costo para productores ni tenderos: solo pagas la tasa del adelanto o del crédito. La plataforma se sostiene cobrando una tarifa de uso a las entidades financieras participantes.',
  },
  {
    id: 'precios',
    palabras: ['precio', 'mercado', 'cafe', 'cacao', 'leche', 'ganado', 'cuanto pagan', 'vender', 'cotizacion'],
    texto:
      'En la sección de mercado ves los precios de referencia del café, el cacao, el ganado y la leche en los últimos 12 meses, con consejos sobre qué significa cada cambio. Recuerda confirmar siempre con la fuente oficial antes de vender.',
    enlace: { a: '/mercado', texto: 'Ver precios del mercado' },
  },
  {
    id: 'territorios',
    palabras: ['donde', 'departamento', 'region', 'municipio', 'territorio', 'presentes', 'cobertura', 'mi zona', 'ciudad'],
    texto:
      'El programa está en 28 departamentos de las 5 regiones de Colombia, con productores de café, cacao y ganadería y tenderos en todo el país.',
    enlace: { a: '/territorios', texto: 'Ver territorios' },
  },
  {
    id: 'indicadores',
    palabras: ['indicador', 'meta', 'impacto', 'resultado', 'avance', 'medir', 'cifras', 'estadistica', 'productivo', 'financiero'],
    texto:
      'El tablero de indicadores muestra las 11 metas del piloto (ambientales, sociales, financieras y de gobierno) y, en otra pestaña, los indicadores financieros y productivos mes a mes.',
    enlace: { a: '/indicadores', texto: 'Ver indicadores' },
  },
  {
    id: 'seguimiento',
    palabras: ['seguimiento', 'mi finca', 'estado', 'historial', 'proveedores', 'productores', 'participantes'],
    texto:
      'En seguimiento ves a cada productor y proveedor: si su predio está verificado por satélite, sus prácticas sostenibles, su puntaje ASG y la historia de sus facturas y pagos.',
    enlace: { a: '/seguimiento', texto: 'Ver seguimiento' },
  },
  {
    id: 'humano',
    palabras: ['asesor', 'persona', 'humano', 'llamar', 'telefono', 'contacto', 'whatsapp', 'hablar con alguien'],
    texto:
      'Esta plataforma es una demostración académica, así que no hay asesores reales. En un programa real, aquí aparecerían los canales de atención al productor y al tendero.',
  },
  {
    id: 'gracias',
    palabras: ['gracias', 'muchas gracias', 'listo', 'perfecto', 'ok', 'chao', 'adios'],
    texto: '¡Con gusto! 🌱 Si tienes otra pregunta, aquí estoy.',
  },
]

const NO_ENTENDI: Respuesta = {
  texto:
    'Todavía no tengo una respuesta preparada para eso. 🙏 Soy un asistente sencillo: prueba con otras palabras o elige una de las preguntas sugeridas.',
}

export function normalizar(t: string) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[¿?¡!.,;:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function responder(pregunta: string): Respuesta {
  const q = ` ${normalizar(pregunta)} `
  let mejor: Tema | null = null
  let mejorPuntaje = 0
  for (const tema of TEMAS) {
    // Las frases de varias palabras valen más que una palabra suelta.
    // Cada palabra clave debe coincidir con el inicio de una palabra ("requisito" encuentra "requisitos").
    const puntaje = tema.palabras.reduce((s, p) => (q.includes(` ${normalizar(p)}`) ? s + p.split(' ').length : s), 0)
    if (puntaje > mejorPuntaje) {
      mejor = tema
      mejorPuntaje = puntaje
    }
  }
  return mejor ? { texto: mejor.texto, enlace: mejor.enlace } : NO_ENTENDI
}
