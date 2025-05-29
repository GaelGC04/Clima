import FragmentoNube from "./FragmentoNube.js";

class Nube {
    constructor(tamanioNubes, velocidadNube, hora, pteLluvia, pteNublado, ladoIzquierdo, ladoDerecho, ladoArriba, ladoFondo, anchoNube, altoNube) {
        this.tamanioNubes = tamanioNubes;
        this.velocidadNube = velocidadNube;
        this.hora = hora;
        this.pteLluvia = pteLluvia;
        this.pteNublado = pteNublado;

        this.ladoIzquierdo = ladoIzquierdo;
        this.ladoDerecho = ladoDerecho;
        this.ladoArriba = ladoArriba;
        this.ladoFondo = ladoFondo;

        this.anchoNube = anchoNube;
        this.altoNube = altoNube;

        this.x;
        this.y;

        this.fragmentos = [];

        this.setup();
    }

    setup() {
        const cantidadMaxFragmentos = 50;
        this.x = (this.ladoIzquierdo + (Math.random() * this.ladoDerecho)) - this.anchoNube;
        this.y = (this.ladoArriba + ((Math.random() * this.ladoFondo) * (2/5))) - (this.altoNube / 3);
        
        // Se toma el centro de la nube para generar los fragmentos
        const centroX = this.x + this.anchoNube / 2;
        const centroY = this.y + this.altoNube / 2;
        
        // Se varia para dar una forma irregular
        const radioBaseX = this.anchoNube / 2;
        const radioBaseY = this.altoNube / 2;

        let nubeCreandose = true;
        let intentos = 0;
        const maxIntentos = cantidadMaxFragmentos * 3;
        while (nubeCreandose && intentos < maxIntentos) {
            intentos++;
            const xPrueba = this.x + (Math.random() * this.anchoNube);
            const yPrueba = this.y + (Math.random() * this.altoNube);
            
            const dx = (xPrueba - centroX) / radioBaseX;
            const dy = (yPrueba - centroY) / radioBaseY;
            const distancia = Math.sqrt(dx * dx + dy * dy);
            
            const angulo = Math.atan2(dy, dx);
            const radioEfectivo = 0.7 + 0.3 * Math.random();
            
            if (distancia < radioEfectivo) {
                const tamanioFragmento = 15 + (Math.random() * (this.pteNublado * 20));

                const posicionRelativa = (yPrueba - this.y) / this.altoNube;
                const baseColor = 120 + Math.floor((1 - this.pteLluvia) * 130);
                const brilloExtra = Math.floor((1 - posicionRelativa/0.3) * 50);
                const color = baseColor + brilloExtra;
                const colorNube = `rgb(${color}, ${color}, ${color})`
                
                this.fragmentos.push(new FragmentoNube(
                    xPrueba,
                    yPrueba,
                    colorNube,
                    tamanioFragmento,
                    centroX,
                    centroY,
                    radioBaseX,
                    radioBaseY
                ));
                
                if (this.fragmentos.length >= cantidadMaxFragmentos) {
                    nubeCreandose = false;
                }
            }
        }
    }

    dibujar(contexto) {
        this.fragmentos.forEach(fragmento => {
            fragmento.dibujar(contexto)
        });
    }

    actualizar(contexto) {
        this.x += this.velocidadNube;
        const centroX = this.x + this.anchoNube / 2;
        const centroY = this.y + this.altoNube / 2;
        
        const radioBaseX = this.anchoNube / 2;
        const radioBaseY = this.altoNube / 2;
        this.fragmentos.forEach(fragmento => {
            fragmento.actualizar(this.velocidadNube, centroX, centroY, radioBaseX, radioBaseY)
        });
    }
}

export default Nube;