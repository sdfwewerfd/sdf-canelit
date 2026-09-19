document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del HTML
    const sobre = document.getElementById('sobre');
    const carta = document.getElementById('carta');
    const cieloCalido = document.getElementById('cieloCalido');

    // --- CONFIGURACIÓN DE AUDIO ---

    // 1. Sonido de clic de PS4 (el sonido rápido al seleccionar)
    const sonidoClickPS4 = new Audio('ps4_click.mp3'); 
    sonidoClickPS4.volume = 0.7; // Volumen al 70%

    // 2. Música de fondo relajante (el tema central que encontraste)
    const musicaFondo = new Audio('musica_fondo.mp3');
    
    // --- ESTA ES LA PARTE CLAVE PARA EL BUCLE ---
    musicaFondo.loop = true; // Activa el BUCLE INFINITO (se repite sola al terminar)
    musicaFondo.volume = 0;   // Inicia en silencio para un efecto de entrada suave

    // Evento al hacer clic en el sobre
    sobre.addEventListener('click', () => {
        // Reproducir el sonido de clic de PS4 inmediatamente
        sonidoClickPS4.play().catch(err => console.log("Audio de clic bloqueado por el navegador:", err));

        // --- ANIMACIÓN DE APERTURA ---

        // 1. Abrir la solapa del sobre
        sobre.classList.add('abrir-solapa');

        // 2. Transición para ocultar el sobre y activar el fondo cálido
        setTimeout(() => {
            sobre.classList.add('desaparecer');
            cieloCalido.classList.add('activo');
        }, 600); // Espera a que la solapa se abra (0.6 segundos)

        // 3. Desplegar la carta e iniciar la música de fondo
        setTimeout(() => {
            carta.classList.add('mostrar');

            // --- REPRODUCCIÓN Y ENTRADA SUAVE DE MÚSICA DE FONDO ---
            musicaFondo.play().then(() => {
                // Efecto de Fade-in (subida de volumen progresiva)
                let vol = 0;
                const fadeIn = setInterval(() => {
                    if (vol < 0.30) { // Volumen máximo relajante (30%)
                        vol += 0.02; // Sube el volumen poco a poco
                        musicaFondo.volume = vol;
                    } else {
                        // Al llegar al volumen máximo, detenemos el intervalo
                        clearInterval(fadeIn);
                    }
                }, 200); // Velocidad del fade-in (cada 0.2 segundos)
            }).catch(err => console.log("Audio de fondo bloqueado por el navegador:", err));

        }, 1000); // Espera total desde el clic para mostrar la carta (1 segundo)
    });
});