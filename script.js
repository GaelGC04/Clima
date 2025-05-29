import Nubes from './Nube.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedorClima');

    const hora = 12;
    const pteLluvia = 0.2;
    const esGranizo = false;
    const tamanioGranizo = 0.5;
    const pteNublado = 0.5;
    const velocidadNubes = 0.5;
    const tamanioNubes = 0.5;

    new Clima(
        contenedor,
        hora,
        pteLluvia,
        esGranizo,
        tamanioGranizo,
        pteNublado,
        velocidadNubes,
        tamanioNubes
    );
});