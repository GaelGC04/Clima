class Clima {
    constructor(contenedor, hora, pteLluvia, esGranizo, tamanioGranizo, pteNublado, velocidadNubes, tamanioNubes) {
        this.contenedor = contenedor;
        this.hora = hora; // Hora en formato 24 horas
        this.pteLluvia = pteLluvia; // Fuerza de lluvia de 0 a 1
        this.esGranizo = esGranizo; // La lluvia es granizo o no
        this.tamanioGranizo = tamanioGranizo; // Tamaño del granizo
        this.pteNublado = pteNublado; // Cantidad de nublado de 0 a 1
        this.velocidadNubes = velocidadNubes; // Velocidad en que se mueven las nubes
        this.tamanioNubes = tamanioNubes; // Tamaño de las nubes
    }
}

export default Clima;