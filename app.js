class Item {
    constructor(nombreProducto, precioProducto, anioProducto) {
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.anioProducto = anioProducto;
    }
}

// Interfaz
class UI {
    agregarProducto(item) {
        const listaProductos = document.getElementById('lista-productos'); 
        const elemento = document.createElement('div');
        
        elemento.innerHTML = `
            <div class="card small-card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center p-2">
                    <span class="nombre-producto">${item.nombreProducto}</span>
                    <button class="btn btn-danger btn-sm" name="eliminar">Eliminar</button> <!-- Botón de eliminar -->
                </div>
                <div class="card-body p-2">
                    <p class="precio-producto"><strong>Precio:</strong> Q ${item.precioProducto}</p>
                    <p class="anio-producto"><strong>Año:</strong> ${item.anioProducto}</p>
                </div>
            </div>
        `;
        
        listaProductos.appendChild(elemento);
    }

    reiniciarFormulario() {
        document.getElementById('nuevo-producto-form').reset(); 
    }

    eliminarProducto(elemento) {
        if (elemento.name === 'eliminar') {
            elemento.closest('.card').remove(); 
            this.mostrarMensaje('Producto eliminado correctamente', 'danger'); 
        }
    }

    mostrarMensaje(mensaje, claseCss) {
        const div = document.createElement('div');
        div.className = `alert alert-${claseCss} mt-4`;  
        div.appendChild(document.createTextNode(mensaje));
        
        const contenedor = document.querySelector('.container');
        const app = document.querySelector('#app');
        contenedor.insertBefore(div, app);
        
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}

// Eventos del DOM
document.getElementById('nuevo-producto-form').addEventListener('submit', function(event) { 
    event.preventDefault();

    const nombreProducto = document.getElementById('nombreProducto').value; 
    const precioProducto = document.getElementById('precioProducto').value; 
    const anioProducto = document.getElementById('anioProducto').value; 

    const item = new Item(nombreProducto, precioProducto, anioProducto);
    const ui = new UI();

    if (nombreProducto === '' || precioProducto === '' || anioProducto === '') {
        return ui.mostrarMensaje('Por favor, completa todos los campos', 'info'); 
    }

    ui.agregarProducto(item);
    ui.reiniciarFormulario();
    ui.mostrarMensaje('Producto agregado exitosamente', 'success'); 
});

document.getElementById('lista-productos').addEventListener('click', function(e) {
    const ui = new UI();
    ui.eliminarProducto(e.target);
});