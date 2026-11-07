import { FirebaseError } from 'firebase/app'

// Traduce los códigos de error de Firebase a mensajes claros en español.
const mensajes: Record<string, string> = {
  'auth/invalid-email': 'El correo no es válido. Revisa que esté bien escrito.',
  'auth/missing-email': 'Escribe tu correo electrónico.',
  'auth/operation-not-allowed':
    'El inicio de sesión con enlace no está activado en Firebase. Actívalo en Authentication > Sign-in method.',
  'auth/configuration-not-found':
    'Firebase Authentication aún no está activado en el proyecto. Actívalo en Firebase Console > Authentication > Comenzar.',
  'auth/too-many-requests': 'Hiciste demasiados intentos. Espera unos minutos y vuelve a probar.',
  'auth/quota-exceeded': 'Se alcanzó el límite de correos por hoy. Inténtalo más tarde.',
  'auth/network-request-failed': 'No hay conexión a internet. Revisa tu conexión e inténtalo de nuevo.',
  'auth/invalid-action-code': 'Este enlace ya se usó o no es válido. Pide un enlace nuevo.',
  'auth/expired-action-code': 'Este enlace ya venció. Pide un enlace nuevo.',
  'auth/unauthorized-continue-uri':
    'Esta dirección web no está autorizada en Firebase. Agrégala en Authentication > Settings > Authorized domains.',
  'auth/invalid-continue-uri': 'La dirección de regreso del enlace no es válida.',
  'auth/user-disabled': 'Esta cuenta está desactivada.',
}

export function mensajeDeError(error: unknown): string {
  if (error instanceof FirebaseError && mensajes[error.code]) {
    return mensajes[error.code]
  }
  console.error(error)
  return 'Ocurrió un error inesperado. Inténtalo de nuevo en unos minutos.'
}

// Mensajes propios del botón "Continuar con Google".
const mensajesGoogle: Record<string, string> = {
  'auth/operation-not-allowed':
    'El acceso con Google no está activado en Firebase. Actívalo en Authentication > Sign-in method > Google.',
  'auth/popup-closed-by-user': 'Cerraste la ventana de Google antes de terminar. Inténtalo de nuevo.',
  'auth/cancelled-popup-request': 'Cerraste la ventana de Google antes de terminar. Inténtalo de nuevo.',
  'auth/popup-blocked':
    'Tu navegador bloqueó la ventana de Google. Permite las ventanas emergentes para esta página e inténtalo de nuevo.',
  'auth/account-exists-with-different-credential':
    'Ya existe una cuenta con ese correo. Entra con el enlace por correo.',
  'auth/unauthorized-domain':
    'Esta dirección web no está autorizada en Firebase. Agrégala en Authentication > Settings > Authorized domains.',
}

export function mensajeDeErrorGoogle(error: unknown): string {
  if (error instanceof FirebaseError && mensajesGoogle[error.code]) {
    return mensajesGoogle[error.code]
  }
  return mensajeDeError(error)
}

export function esEnlaceInvalido(error: unknown): boolean {
  return (
    error instanceof FirebaseError &&
    (error.code === 'auth/invalid-action-code' || error.code === 'auth/expired-action-code')
  )
}
