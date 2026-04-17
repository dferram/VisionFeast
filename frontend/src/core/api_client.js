// core/api_client.js

// Límite de peticiones de seguridad para prevenir que la app se rompa
const MAX_PETICIONES_POR_MINUTO = 30; // Puedes subir o bajar este número
const TIEMPO_ENTRE_PETICIONES = 60000 / MAX_PETICIONES_POR_MINUTO; // Tiempo mínimo de espera entre peticiones

let tiempoUltimaPeticion = 0;

/**
 * Función fetch envuelta con un Rate Limiter (Limitador de Peticiones).
 * Si llamas a esta función 100 veces seguidas, automáticamente las pondrá en cola
 * y las irá ejecutando poco a poco (ej. 1 cada 2 segundos) para no saturar 
 * ni romper tu servidor backend.
 */
export async function apiFetch(url, options = {}) {
    const ahora = Date.now();
    
    // Calcula si debe esperar antes de lanzar la siguiente petición
    const tiempoAEsperar = Math.max(0, tiempoUltimaPeticion + TIEMPO_ENTRE_PETICIONES - ahora);
    
    // Actualiza el marcador de tiempo para la siguiente petición en la cola
    tiempoUltimaPeticion = ahora + tiempoAEsperar;

    // Si necesita esperar, pausa la ejecución unos milisegundos sin trabar el navegador
    if (tiempoAEsperar > 0) {
        console.warn(`Petición en cola, esperando ${tiempoAEsperar}ms para no saturar la app...`);
        await new Promise(resolve => setTimeout(resolve, tiempoAEsperar));
    }

    try {
        // Ejecutar la petición real
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error("Error al comunicar con la API:", error);
        throw error;
    }
}