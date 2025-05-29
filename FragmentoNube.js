class FragmentoNube {
    constructor(x, y, colorNube, tamanio, centroX, centroY, radioX, radioY) {
        this.x = x;
        this.y = y;
        this.colorNube = colorNube;
        this.tamanio = tamanio;
        this.centroX = centroX;
        this.centroY = centroY;
        this.radioX = radioX;
        this.radioY = radioY;
    }

    dibujar(contexto) {
        const dx = (this.x - this.centroX) / this.radioX;
        const dy = (this.y - this.centroY) / this.radioY;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        
        // Se ajusta la transparencia por la distancia
        const alpha = 1 * (1 - Math.min(1, distancia * 1.2));
        
        contexto.save();
        
        const cantidadBorroso = 0.8 + (this.y / 5000) * 1.5;
        contexto.shadowColor = this.colorNube;
        contexto.shadowBlur = this.tamanio * cantidadBorroso;
        
        const gradient = contexto.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.tamanio
        );
        gradient.addColorStop(0, `${this.colorNube.replace(')', ', ' + alpha + ')')}`);
        gradient.addColorStop(1, `${this.colorNube.replace(')', ', 0)')}`);
        
        contexto.fillStyle = gradient;
        contexto.globalAlpha = alpha;
        
        contexto.beginPath();
        contexto.arc(this.x, this.y, this.tamanio, 0, Math.PI * 2);
        contexto.fill();
        
        contexto.restore();
    }

    actualizar(velocidad, centroX, centroY, radioX, radioY) {
        this.x += velocidad;
        this.centroX = centroX;
        this.centroY = centroY;
        this.radioX = radioX;
        this.radioY = radioY;
    }
}

export default FragmentoNube;