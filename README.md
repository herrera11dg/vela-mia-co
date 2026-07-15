# Vela Mía

Bienvenido al repositorio oficial de **Vela Mía**, un proyecto de software enfocado en el comercio electrónico de velas artesanales de cera de soja. Este proyecto ha sido desarrollado como parte del programa de Análisis y Desarrollo de Software (ADSO) del SENA.

## Acerca del Proyecto

Vela Mía es una iniciativa que busca ofrecer una experiencia digital intuitiva y elegante para la exhibición y venta de productos artesanales. El aplicativo está diseñado con un enfoque en la usabilidad (UX/UI), utilizando patrones de diseño modernos y colores orgánicos que reflejan la identidad natural de la marca.

## Características Principales

- **Interfaz Web Responsiva:** Maquetación estructurada semánticamente para la presentación del catálogo de productos.
- **Diseño Unificado:** Implementación de un sistema de diseño propio basado en tonos tierra, tipografías legibles y el modelo Flexbox para un layout limpio.
- **Catálogo Interactivo:** Visualización de productos con precios, imágenes y enlace directo para encomendar.
- **Galería tipo Instagram:** Filtro por categorías, interacción de "gostos" y lightbox para visualización ampliada.
- **Selección de Aromas:** 18 aromas naturales categorizados con descripciones y filtro dinámico.
- **Formulario de Contacto:** Formulario funcional para envío de mensajes con selección de asunto.
- **Newsletter:** Captura de emails para suscripción de noticias y ofertas exclusivas.
- **Internacionalización:** Sistema de traducción listo para múltiples idiomas (i18n).

## Tecnologías Utilizadas

- **Frontend:** React 19, TypeScript
- **Estilos:** Tailwind CSS
- **Build Tool:** Vite 8
- **Enrutamiento:** React Router DOM v7
- **Internacionalización:** i18next + react-i18next
- **Iconos:** Remixicon, Lucide React
- **Control de Versiones:** Git & GitHub

## Instrucciones de Ejecución

### Requisitos previos

- Node.js 18+
- npm 9+

### Pasos para ejecutar localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/herrera11dg/Vela-Mia.git
   cd Vela-Mia
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre el navegador en `http://localhost:3000`

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Vista previa de la compilación |
| `npm run lint` | Ejecuta el linter ESLint |
| `npm run type-check` | Verifica tipos de TypeScript |

## Estructura del Proyecto

```
src/
├── i18n/
│   ├── index.ts
│   └── local/
├── pages/
│   ├── home/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Aromas.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── page.tsx
│   └── NotFound.tsx
├── router/
│   ├── config.tsx
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Autor

**Daniel Said Herrera Galeano**
- Programa: Análisis y Desarrollo de Software (ADSO)
- Ficha: 3235869

## Licencia

Este proyecto es de uso académico y educativo.
