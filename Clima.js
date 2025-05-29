import Nube from './Nube.js';
import Lluvia from './Lluvia.js';

class Clima {
    constructor(contenedor, hora, pteLluvia, esGranizo, esNieve, tamanioGranizo, pteNublado, velocidadNubes, tamanioNubes, pteRelampagos, intensidadRelampagos) {
        this.contenedor = contenedor;
        this.contexto = contenedor.getContext('2d'); // Se da que hay un contexto de graficos 2D
        
        this.nubes = []; // Arreglo para almacenar las nubes

        this.hora = hora; // Hora en formato 24 horas
        this.pteLluvia = pteLluvia; // Fuerza de lluvia de 0 a 1
        this.esGranizo = esGranizo; // La lluvia es granizo o no
        this.esNieve = esNieve; // La lluvia es nieve o no (si granizo es true entonces se le da prioridad al granizo)
        this.tamanioGranizo = tamanioGranizo; // Tamaño del granizo
        this.pteNublado = pteNublado; // Cantidad de nublado de 0 a 1
        this.velocidadNubes = Math.abs(velocidadNubes); // Velocidad en que se mueven las nubes
        this.tamanioNubes = Math.abs(tamanioNubes); // Tamaño de las nubes

        this.pteRelampagos = pteRelampagos; // Porcentaje de aparición de truenos
        this.intensidadRelampagos = intensidadRelampagos; // Intensidad de los truenos

        this.ladoIzquierdo = 0;
        this.ladoDerecho = this.contenedor.width;
        this.ladoArriba = 0;
        this.ladoFondo = this.contenedor.height;

        this.setup();
    }

    setup() {
        // Se ajustan atributos en caso de recibir valores fuera de rango
        if (this.pteLluvia < 0) {
            this.pteLluvia = 0;
        } else if (this.pteLluvia > 1) {
            this.pteLluvia = 1;
        }

        if (this.hora < 0 || this.hora > 23) {
            this.hora = 12;
        }

        if (this.pteNublado < 0) {
            this.pteNublado = 0;
        } else if (this.pteNublado > 1) {
            this.pteNublado = 1;
        }

        if (this.pteRelampagos < 0) {
            this.pteRelampagos = 0;
        } else if (this.pteRelampagos > 1) {
            this.pteRelampagos = 1;
        }

        if (this.intensidadRelampagos < 0) {
            this.intensidadRelampagos = 0;
        } else if (this.intensidadRelampagos > 1) {
            this.intensidadRelampagos = 1;
        }

        this.redimensionar();
        // Se ajusta en caso de redimensionar la ventana
        window.addEventListener('resize', this.redimensionar.bind(this));
    }

    redimensionar() {
        this.contenedor.width = window.innerWidth;
        this.contenedor.height = window.innerHeight;

        this.ladoIzquierdo = this.contenedor.offsetLeft;
        this.ladoDerecho = this.contenedor.offsetLeft + this.contenedor.width;
        this.ladoArriba = this.contenedor.offsetTop;
        this.ladoFondo = this.contenedor.offsetTop + this.contenedor.height;
        this.generarNubes();
    }

    generarNubes() {
        this.nubes = [];

        const promedioNubes = 80; // Promedio de nubes a generar
        const cantidadNubes = Math.floor(this.pteNublado * promedioNubes);
        const anchoPromedioNubes = 550;
        const altoPromedioNubes = 200;

        for (let iteradorNubes = 0; iteradorNubes < cantidadNubes; iteradorNubes++) {
            const anchoNube = 50 + (Math.random() * anchoPromedioNubes);
            const altoNube = 15 + (Math.random() * altoPromedioNubes);
            this.nubes.push(new Nube(
                this.tamanioNubes,
                this.velocidadNubes,
                this.hora,
                this.pteLluvia,
                this.pteNublado,
                this.ladoIzquierdo,
                this.ladoDerecho,
                this.ladoArriba,
                this.ladoFondo,
                anchoNube,
                altoNube
            ));
        }

        this.animar();
    }

    animar() {
        requestAnimationFrame(this.animar.bind(this));
        this.contexto.fillStyle = `rgba(180, 180, 255)`;
        this.contexto.fillRect(this.ladoIzquierdo, this.ladoArriba, this.ladoDerecho, this.ladoFondo);

        this.nubes.forEach(nube => {
            nube.actualizar(this.contexto);
            nube.dibujar(this.contexto);
        });
    }
}

export default Clima;