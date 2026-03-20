# Backend - Sistema de Reserva de Canchas de Fútbol con E-commerce

API REST desarrollada con Node.js y Express para gestionar reservas de canchas de fútbol, usuarios y un catálogo de productos deportivos.

## 📋 Descripción

Este proyecto es el backend de una plataforma completa que permite:
- ⚽ **Gestión de Canchas**: Crear, actualizar y consultar información de canchas disponibles
- 📅 **Sistema de Reservas**: Permite a los usuarios reservar canchas para jugar fútbol
- 🛒 **E-commerce**: Catálogo de productos deportivos con carrito de compras
- 🔐 **Autenticación**: Sistema seguro de registro y login con JWT
- 👥 **Gestión de Usuarios**: Perfiles de usuario con información personal
- 🖼️ **Almacenamiento de Imágenes**: Integración con Cloudinary para subir fotos de canchas y productos

## 🚀 Características Principales

- 🔐 ✅ Autenticación y autorización con JWT
- ✔️ ✅ Validación de datos con express-validator
- 🔒 ✅ Encriptación de contraseñas con bcrypt
- ☁️ ✅ Integración con Cloudinary para gestión de imágenes
- 🛡️ ✅ Manejo de errores robusto
- 🌐 ✅ CORS habilitado
- 🗄️ ✅ Base de datos MongoDB con Mongoose
- 📊 ✅ Logging con Morgan
- 📤 ✅ Subida de archivos con Multer

## 📦 Requisitos Previos

- 🟩 Node.js (versión 16 o superior)
- 📦 npm o yarn
- 🍃 MongoDB (local o Atlas)
- ☁️ Cuenta en Cloudinary

## 🔧 Instalación

1. 📥 **Clonar el repositorio**
   ```bash
   git clone https://github.com/valestakelun/backend_alquiercancha.git
   cd backend_alquiercancha
   ```

2. 📚 **Instalar dependencias**
   ```bash
   npm install
   ```

3. ⚙️ **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_base_datos
   JWT_SECRET=tu_clave_secreta_jwt
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   NODE_ENV=development
   ```

4. ▶️ **Ejecutar el servidor**
   ```bash
   # 🔄 Modo desarrollo (con recargas automáticas)
   npm run dev

   # 🏭 Modo producción
   npm start
   ```

   El servidor estará disponible en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── controllers/          # Lógica de negocio
│   ├── canchas.controllers.js
│   ├── productos.controllers.js
│   └── usuarios.controllers.js
├── helpers/             # Funciones auxiliares
│   ├── cloudinary.js
│   ├── cloudinaryUploader.js
│   ├── generarJWT.js
│   └── upload.js
├── middlewares/         # Middlewares personalizados
│   ├── errorMulter.js
│   ├── validacionesLogin.js
│   └── validarCampos.js
├── models/              # Esquemas de Mongoose
│   ├── cancha.js
│   ├── producto.js
│   └── Usuario.js
├── routes/              # Definición de rutas
│   ├── canchas.routes.js
│   ├── index.routes.js
│   ├── productos.routes.js
│   └── usuarios.routes.js
└── server/              # Configuración del servidor
    ├── bdConfig.js      # Conexión a MongoDB
    └── config.js        # Configuración de Express
```

## 🔌 Rutas principales de la API

### 👤 Usuarios - CRUD

| Operación | Método | Ruta | Respuesta | Error |
|-----------|--------|------|-----------|-------|
| ✨ **CREATE** | POST | `/api/usuarios/registro` | ✅ `201` Usuario creado | ❌ `400` Email duplicado, `500` Error |
| 🔑 **LOGIN** | POST | `/api/usuarios/login` | ✅ `200` Token y datos | ❌ `401` Credenciales, `404` No existe |
| 👁️ **READ** | GET | `/api/usuarios/:id` | ✅ `200` Datos usuario | ❌ `401` No autenticado, `404` No encontrado |
| 🔄 **UPDATE** | PUT | `/api/usuarios/:id` | ✅ `200` Actualizado | ❌ `401` No autenticado, `400` Inválido |

✅ **Ejemplo Respuesta Exitosa (201):**
```json
{
  "msg": "Usuario registrado exitosamente",
  "token": "eyJhbGc...",
  "usuario": { "_id": "123", "nombre": "Juan", "email": "juan@mail.com" }
}
```

❌ **Ejemplo Error (400):**
```json
{ "msg": "El email ya está registrado" }
```

---

### ⚽ Canchas - CRUD

| Operación | Método | Ruta | Respuesta | Error |
|-----------|--------|------|-----------|-------|
| ✨ **CREATE** | POST | `/api/canchas` | ✅ `201` Creada | ❌ `400` Inválido, `401` No auth |
| 📋 **LISTAR** | GET | `/api/canchas` | ✅ `200` Array | ❌ `500` Error servidor |
| 👁️ **READ** | GET | `/api/canchas/:id` | ✅ `200` Datos | ❌ `404` No encontrada |
| 🔄 **UPDATE** | PUT | `/api/canchas/:id` | ✅ `200` Actualizada | ❌ `401` No auth, `404` No existe |
| 🗑️ **DELETE** | DELETE | `/api/canchas/:id` | ✅ `200` Eliminada | ❌ `401` No auth, `404` No existe |

✅ **Ejemplo CREATE (201):**
```json
{
  "msg": "Cancha creada exitosamente",
  "cancha": {
    "_id": "123", "nombre": "Cancha El Coloso", "precio": 150,
    "capacidad": 12, "ubicacion": "Calle 123", "imagen": "url"
  }
}
```

❌ **Ejemplo Error (400):**
```json
{ "msg": "El campo nombre es requerido" }
```

✅ **Ejemplo READ (200):**
```json
{
  "msg": "Canchas obtenidas exitosamente",
  "canchas": [
    { "_id": "123", "nombre": "Cancha El Coloso", "precio": 150 },
    { "_id": "456", "nombre": "Cancha Deportiva", "precio": 120 }
  ]
}
```

---

### 🛍️ Productos - CRUD

| Operación | Método | Ruta | Respuesta | Error |
|-----------|--------|------|-----------|-------|
| ✨ **CREATE** | POST | `/api/productos` | ✅ `201` Creado | ❌ `400` Inválido, `401` No auth |
| 📦 **LISTAR** | GET | `/api/productos` | ✅ `200` Array | ❌ `500` Error servidor |
| 👁️ **READ** | GET | `/api/productos/:id` | ✅ `200` Datos | ❌ `404` No encontrado |
| 🔄 **UPDATE** | PUT | `/api/productos/:id` | ✅ `200` Actualizado | ❌ `401` No auth, `404` No existe |
| 🗑️ **DELETE** | DELETE | `/api/productos/:id` | ✅ `200` Eliminado | ❌ `401` No auth, `404` No existe |

✅ **Ejemplo CREATE (201):**
```json
{
  "msg": "Producto creado exitosamente",
  "producto": {
    "_id": "789", "nombre": "Pelota Profesional", "precio": 45.99,
    "stock": 50, "categoria": "Balones", "imagen": "url"
  }
}
```

❌ **Ejemplo Error (404):**
```json
{ "msg": "Producto no encontrado" }
```

✅ **Ejemplo READ (200):**
```json
{
  "msg": "Productos obtenidos exitosamente",
  "productos": [
    { "_id": "789", "nombre": "Pelota Profesional", "precio": 45.99 },
    { "_id": "101", "nombre": "Camiseta", "precio": 29.99 }
  ]
}
```

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. 👤 El usuario se registra o inicia sesión
2. 🎟️ El servidor devuelve un token JWT
3. 📨 El cliente debe incluir el token en el header `Authorization: Bearer <token>`

🔒 Las contraseñas se encriptan con **bcrypt** por seguridad.

## 🛠️ Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| 🚀 express | ^5.2.1 | Framework web |
| 🍃 mongoose | ^9.2.0 | ODM para MongoDB |
| 🎫 jsonwebtoken | ^9.0.3 | Autenticación JWT |
| 🔒 bcrypt | ^6.0.0 | Encriptación de contraseñas |
| ✔️ express-validator | ^7.3.1 | Validación de datos |
| 📤 multer | ^2.0.2 | Subida de archivos |
| ☁️ cloudinary | ^2.9.0 | Almacenamiento de imágenes |
| 🌐 cors | ^2.8.6 | Control de acceso CORS |
| 📊 morgan | ^1.10.1 | Logging de solicitudes |

## 📖 Scripts Disponibles

```bash
🏭 npm start          # Ejecutar servidor en producción
🔄 npm run dev        # Ejecutar en modo desarrollo con auto-reload
```

## 🧪 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| 🔌 `PORT` | Puerto del servidor | 3000 |
| 🍃 `MONGODB_URI` | URI de conexión a MongoDB | mongodb+srv://... |
| 🎫 `JWT_SECRET` | Clave secreta para JWT | tu-clave-super-secreta |
| ☁️ `CLOUDINARY_CLOUD_NAME` | Nombre de cloud en Cloudinary | my-cloud |
| 🔑 `CLOUDINARY_API_KEY` | API Key de Cloudinary | 123456789 |
| 🔐 `CLOUDINARY_API_SECRET` | API Secret de Cloudinary | abc123xyz |
| ⚙️ `NODE_ENV` | Entorno (development/production) | development |

## 📝 Validaciones

El proyecto implementa validaciones en:
- 🔑 **Datos de login**: Email y contraseña válidos
- ✅ **Campos de formulario**: Validación de entrada en todos los endpoints
- 📤 **Multer**: Validación de tipos y tamaños de archivos

## 🚨 Manejo de Errores

El proyecto incluye un middleware personalizado de manejo de errores que:
- 📤 Captura errores de Multer (subida de archivos)
- ⚠️ Validaciones fallidas
- 🗄️ Errores de base de datos
- 📋 Devuelve respuestas de error consistentes

## 🤝 Contribución

1. 🌿 Crear una rama (`git checkout -b feature/AmazingFeature`)
2. 💾 Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
3. 🚀 Push a la rama (`git push origin feature/AmazingFeature`)
4. 📨 Abrir un Pull Request

## 📄 Licencia

📜 Este proyecto está bajo licencia **ISC**.

## 👨‍💻 Autores

👏 Proyecto desarrollado como **Fin de Módulo 3** por:

| Participante | GitHub |
|--------------|--------|
| 💻 Basilio Martinez | [@basiliomartinez](https://github.com/basiliomartinez) |
| 💻 Corina Jimenez | [@corijimenez](https://github.com/corijimenez) |
| 💻 Jonathan Fiorenza | [@jonathanfiorenza](https://github.com/jonathanfiorenza) |
| 💻 Valeria Stakelun | [@valestakelun](https://github.com/valestakelun) |
| 💻 Lucas Basualdo | [@LucasArmando](https://github.com/LucasArmando) |
| 💻 Gaston Gomez | [@Gastongmz04](https://github.com/Gastongmz04) |

---

💬 **¿Preguntas o sugerencias?** Abre un issue en el repositorio 🙌
