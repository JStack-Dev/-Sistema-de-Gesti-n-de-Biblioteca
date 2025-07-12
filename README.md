# 📚 Sistema de Gestión de Biblioteca

Sistema completo desarrollado desde cero para gestionar libros, usuarios y préstamos en una biblioteca real. Consta de un backend en **Node.js + Express + Sequelize + MySQL** y un frontend hecho en **React + TypeScript + Vite**. Todo está conectado a una base de datos real y puede ser utilizado directamente en producción.

---

## 🚀 Tecnologías utilizadas

### 🔧 Backend
- Node.js → Entorno de ejecución para JavaScript en el servidor.
- Express → Framework minimalista para crear rutas y lógica del servidor.
- TypeScript → Tipado estático para mayor seguridad y mantenimiento del código.
- Sequelize → ORM que permite mapear modelos JS a tablas de la base de datos.
- MySQL → Motor de base de datos relacional donde se almacena la información.
- Dotenv → Para gestionar variables de entorno sensibles (host, contraseñas, etc.).
- CORS → Para permitir peticiones entre dominios distintos (frontend y backend).
- ts-node-dev → Ejecuta proyectos TypeScript en desarrollo con recarga automática.

### 💻 Frontend
- React → Biblioteca para construir interfaces de usuario con componentes.
- TypeScript → Añade tipado estático al frontend para evitar errores comunes.
- Vite → Herramienta moderna para desarrollo frontend con recarga rápida.
- React Router DOM → Librería para gestionar rutas y navegación entre páginas.

---

## 📁 Estructura del Proyecto

```
📦 biblioteca-app/
├── backend-biblioteca/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.ts
├── frontend-biblioteca/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
```

---

## 🧠 ¿Cómo se ha desarrollado el proyecto?

1. **📐 Diseño de la base de datos en MySQL**
   - Diseñé la base de datos `biblioteca` y creé las tablas `usuarios`, `libros` y `prestamos`.
   - Inserté registros de prueba reales para simular un entorno funcional.
   - Definí correctamente las claves primarias y foráneas para garantizar la integridad referencial.

2. **⚙️ Configuración del backend**
   - Inicialicé el proyecto con `npm init` y fui instalando todas las dependencias necesarias: Express, Sequelize, dotenv, cors y TypeScript.
   - Organicé el código de forma profesional en carpetas: `models`, `controllers`, `routes` y `config`.

3. **🔌 Conexión con Sequelize**
   - Configuré la conexión a la base de datos a través de variables de entorno definidas en el archivo `.env`.
   - Definí los modelos Sequelize basándome en la estructura de las tablas.
   - Establecí correctamente las relaciones entre usuarios, libros y préstamos.

4. **🚦 Creación de endpoints del backend**
   - Implementé rutas GET y POST para gestionar usuarios, libros, préstamos y devoluciones.
   - Añadí validaciones importantes para evitar errores como:
     - Impedir prestar libros que ya están ocupados.
     - Bloquear devoluciones de libros que ya han sido devueltos.
     - Validar que los IDs proporcionados existan en la base de datos.

5. **🧪 Pruebas del backend con Postman**
   - Probé cada endpoint usando Postman para verificar su funcionamiento y robustez.
   - Me aseguré de que las respuestas JSON, los estados HTTP y los errores estuvieran bien controlados antes de pasar al frontend.

6. **🖼️ Desarrollo del frontend con React**
   - Creé el frontend con Vite + TypeScript para una arquitectura moderna.
   - Desarrollé componentes reutilizables para listar usuarios, libros y préstamos, además de formularios para prestar y devolver libros.
   - Usé `useEffect` y `fetch` para consumir las rutas del backend.
   - Implementé la navegación con React Router y añadí estilos básicos con CSS para dejarlo presentable.

---

## ⚙️ Instalación y uso

### 🔌 Backend

1. Ir a la carpeta `backend-biblioteca`:
```bash
cd backend-biblioteca
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` con los datos de tu base de datos:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=biblioteca
DB_PORT=3306
```

4. Ejecutar el servidor:
```bash
npm run dev
```

---

### 💻 Frontend

1. Ir a la carpeta `frontend-biblioteca`:
```bash
cd frontend-biblioteca
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar la app:
```bash
npm run dev
```

---

## 🛠️ Funcionalidades

- 📄 Listado de usuarios
- 📚 Ver libros disponibles
- ✅ Prestar libros
- 🔁 Devolver libros
- 📆 Historial de préstamos
- 🌐 Navegación entre vistas con React Router

---

## 📌 Validaciones inteligentes

- Solo se permite prestar libros disponibles.
- No se puede devolver un libro ya devuelto.
- Se valida que los IDs existan antes de operar.

---

## 🚀 Últimas actualizaciones

### ✅ Gestión de Usuarios

- **Listar usuarios**: La app obtiene todos los usuarios registrados desde el backend (`GET /api/usuarios`).
- **Añadir usuarios**: Se puede crear un nuevo usuario a través de un formulario en React (`POST /api/usuarios`).
- **Eliminar usuarios**: Cada usuario listado incluye un botón para eliminarlo (`DELETE /api/usuarios/:id`).

### ✅ Gestión de Libros

- **Listar libros**: Se muestran todos los libros disponibles en la base de datos (`GET /api/libros`).
- **Añadir libros**: Se puede registrar un nuevo libro mediante un formulario en el frontend (`POST /api/libros`).
- **Eliminar libros**: Cada libro en la lista tiene un botón para eliminarlo (`DELETE /api/libros/:id`).

Todas las operaciones están conectadas a una API RESTful desarrollada con Express y Sequelize, y gestionadas desde una interfaz React desarrollada con Vite y TypeScript.


---

## 👨‍💻 Autor

Desarrollado por **Jorge Juan Moscoso Chacón**

> "Hecho con pasión, buenas prácticas y con el objetivo de convertirlo en una solución real." 💪
