import Clima from './Clima.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorClima');

    const hora = 12;
    const pteLluvia = 0;
    const esGranizo = false;
    const esNieve = false;
    const tamanioGranizo = 0.5;
    const pteNublado = 1;
    const velocidadNubes = 0.1;
    const tamanioNubes = 0.5;
    const pteRelampagos = 0;
    const intensidadRelampagos = 0;

    new Clima(
        contenedor,
        hora,
        pteLluvia,
        esGranizo,
        esNieve,
        tamanioGranizo,
        pteNublado,
        velocidadNubes,
        tamanioNubes,
        pteRelampagos,
        intensidadRelampagos
    );
});