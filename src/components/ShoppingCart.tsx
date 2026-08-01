import React, { useState } from 'react'; // Importamos React y el hook useState para manejar estados internos

const ShoppingCart = () => { // Declaramos el componente funcional llamado ShoppingCart
  // Declaramos una variable de estado 'isOpen' inicializada en 'false' (carrito cerrado)
  const [isOpen, setIsOpen] = useState(false);

  // Función flecha que invierte el estado actual del carrito (si está abierto lo cierra, y viceversa)
  const toggleCart = () => setIsOpen(!isOpen);

  return ( // Iniciamos el bloque de retorno que renderiza la interfaz del componente en pantalla
    <div> {/* Contenedor principal que envuelve todo el componente */}

      {/* Botón principal que siempre estará visible para abrir el carrito */}
      <button
        onClick={toggleCart} // Evento que ejecuta la función toggleCart al hacer clic en el botón
        className="fixed top-4 right-4 bg-green-700 text-white p-3 rounded shadow-md z-50" // Clases de Tailwind para fijar posición, color y diseño
      >
        🛒 Ver Carrito {/* Texto e ícono que muestra el botón al usuario */}
      </button>

      {/* Panel lateral deslizable del carrito de compras */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} // Clases dinámicas Tailwind: si isOpen es true se muestra, si es false se oculta a la derecha
      >

        <div className="p-4 border-b flex justify-between items-center"> {/* Contenedor para la cabecera del carrito con flexbox */}
          <h2 className="text-xl font-bold text-gray-800">Tus Velas</h2> {/* Título principal del carrito */}
          <button onClick={toggleCart} className="text-red-500 font-bold hover:text-red-700"> {/* Botón de cierre dentro del panel */}
            X Cerrar {/* Texto indicativo para cerrar el panel */}
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4"> {/* Contenedor para la lista de productos del carrito */}
          <p className="text-gray-600 text-center mt-10">Tu carrito está vacío en este momento.</p> {/* Mensaje por defecto cuando no hay productos */}
        </div>

      </div>

    </div>
  ); // Fin del bloque de retorno del componente
}; // Fin de la declaración del componente funcional

export default ShoppingCart; // Exportamos el componente por defecto para poder importarlo en otras vistas en esta carpeta
