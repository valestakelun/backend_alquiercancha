# Backend - Sistema de Reserva de Canchas de Fútbol con E-commerce

API REST desarrollada con Node.js y Express para gestionar reservas de canchas de fútbol, usuarios y un catálogo de productos deportivos.

## 📋 Descripción

Este proyecto es el backend de una plataforma completa que permite:
- **Gestión de Canchas**: Crear, actualizar y consultar información de canchas disponibles
- **Sistema de Reservas**: Permite a los usuarios reservar canchas para jugar fútbol
- **E-commerce**: Catálogo de productos deportivos con carrito de compras
- **Autenticación**: Sistema seguro de registro y login con JWT
- **Gestión de Usuarios**: Perfiles de usuario con información personal
- **Almacenamiento de Imágenes**: Integración con Cloudinary para subir fotos de canchas y productos

## 🚀 Características Principales

- ✅ Autenticación y autorización con JWT
- ✅ Validación de datos con express-validator
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Integración con Cloudinary para gestión de imágenes
- ✅ Manejo de errores robusto
- ✅ CORS habilitado
- ✅ Base de datos MongoDB con Mongoose
- ✅ Logging con Morgan
- ✅ Subida de archivos con Multer

## 📦 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- MongoDB (local o Atlas)
- Cuenta en Cloudinary

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Proyecto\ Fin\ de\ Modulo\ 3
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
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

4. **Ejecutar el servidor**
   ```bash
   # Modo desarrollo (con recargas automáticas)
   npm run dev

   # Modo producción
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

### Usuarios
- `POST /api/usuarios/registro` - Registrar nuevo usuario
- `POST /api/usuarios/login` - Iniciar sesión
- `GET /api/usuarios/:id` - Obtener datos del usuario
- `PUT /api/usuarios/:id` - Actualizar perfil del usuario

### Canchas
- `GET /api/canchas` - Listar todas las canchas
- `GET /api/canchas/:id` - Obtener detalles de una cancha
- `POST /api/canchas` - Crear nueva cancha (admin)
- `PUT /api/canchas/:id` - Actualizar cancha (admin)
- `DELETE /api/canchas/:id` - Eliminar cancha (admin)

### Productos
- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/:id` - Obtener detalles de un producto
- `POST /api/productos` - Crear nuevo producto (admin)
- `PUT /api/productos/:id` - Actualizar producto (admin)
- `DELETE /api/productos/:id` - Eliminar producto (admin)

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. El usuario se registra o inicia sesión
2. El servidor devuelve un token JWT
3. El cliente debe incluir el token en el header `Authorization: Bearer <token>`

Las contraseñas se encriptan con **bcrypt** por seguridad.

## 🛠️ Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| express | ^5.2.1 | Framework web |
| mongoose | ^9.2.0 | ODM para MongoDB |
| jsonwebtoken | ^9.0.3 | Autenticación JWT |
| bcrypt | ^6.0.0 | Encriptación de contraseñas |
| express-validator | ^7.3.1 | Validación de datos |
| multer | ^2.0.2 | Subida de archivos |
| cloudinary | ^2.9.0 | Almacenamiento de imágenes |
| cors | ^2.8.6 | Control de acceso CORS |
| morgan | ^1.10.1 | Logging de solicitudes |

## 📖 Scripts Disponibles

```bash
npm start          # Ejecutar servidor en producción
npm run dev        # Ejecutar en modo desarrollo con auto-reload
```

## 🧪 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | 3000 |
| `MONGODB_URI` | URI de conexión a MongoDB | mongodb+srv://... |
| `JWT_SECRET` | Clave secreta para JWT | tu-clave-super-secreta |
| `CLOUDINARY_CLOUD_NAME` | Nombre de cloud en Cloudinary | my-cloud |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary | 123456789 |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary | abc123xyz |
| `NODE_ENV` | Entorno (development/production) | development |

## 📝 Validaciones

El proyecto implementa validaciones en:
- **Datos de login**: Email y contraseña válidos
- **Campos de formulario**: Validación de entrada en todos los endpoints
- **Multer**: Validación de tipos y tamaños de archivos

## 🚨 Manejo de Errores

El proyecto incluye un middleware personalizado de manejo de errores que:
- Captura errores de Multer (subida de archivos)
- Validaciones fallidas
- Errores de base de datos
- Devuelve respuestas de error consistentes

## 🤝 Contribución

1. Crear una rama (`git checkout -b feature/AmazingFeature`)
2. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
3. Push a la rama (`git push origin feature/AmazingFeature`)
4. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia ISC.

## 👨‍💻 Autor

Proyecto desarrollado como Fin de Módulo 3.

---

**¿Preguntas o sugerencias?** Abre un issue en el repositorio.
