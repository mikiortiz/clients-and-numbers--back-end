# clients-and-Numbers - Backend

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas de la API](#rutas-de-la-api)
  - [Autenticación](#autenticación)
  - [Usuarios](#usuarios)
  - [Números](#números)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Descripción del Proyecto

clients-and-Numbers es una aplicación diseñada para gestionar clientes y asignarles números de manera eficiente. Esta API proporciona las funcionalidades necesarias para registrar, actualizar y eliminar clientes, así como asignar y gestionar números de referencia para diversos propósitos, como rifas, eventos y programas de lealtad.

## Instalación

Sigue estos pasos para instalar y configurar el proyecto localmente:

1. **Clona el repositorio:**

    ```sh
    git clone https://github.com/mikiortiz/clients-and-numbers--back-end.git
    cd clients-and-Numbers
    ```

2. **Instala las dependencias:**

    ```sh
    npm install
    ```

## Configuración 
(si es requerida)
Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```sh
PORT=3000
MONGODB_URI=mongodb+srv://ortizmichel390:Larissa2015@cluster0.viztkjm.mongodb.net/Clients-Numbers?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

## Estructura del Proyecto

El proyecto sigue la siguiente estructura de archivos y carpetas:
```sh
clients-and-Numbers/
├── controllers/
│   ├── auth.controller.js
│   ├── numbersController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── validator.middleware.js
├── models/
│   ├── numberRangeModel.js
│   ├── user.model.js
│   └── userRegister.model.js
├── routes/
│   ├── authRegister.routes.js
│   ├── numberRoutes.js
│   └── userRoutes.js
├── schemas/
│   ├── schemas.validator.js
│   └── userSchema.js
├── app.js
├── connectDB.js
├── config.js
├── server.js
└── package.json
```
# Rutas de la API

  ## Autenticación:
  
- Registra un nuevo usuario.
```sh
POST /api/register
```
Ejemplo de solicitud:
```sh
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "examplePassword"
}
```
---
- Inicia sesión y obtiene un token JWT.
```sh
POST /api/login
```
Ejemplo de solicitud:
```sh
{
  "email": "user@example.com",
  "password": "examplePassword"
}
```
---
- Cierra la sesión del usuario actual.
```sh
POST /api/logout
```
---
- Obtiene el perfil del usuario autenticado. Requiere un token JWT.
```sh
GET /api/profile
```
---
  ## Usuarios:
  
- Crea un nuevo usuario, Requiere autenticación.
```sh
POST /api/scheduleUser
```
Ejemplo de solicitud:
```sh
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "numbers": ["123", "456"]
}
```
---
- Obtiene la lista de todos los usuarios. Requiere autenticación.
```sh
GET /api/users
```
---
- Obtiene la información de un usuario específico por ID. Requiere autenticación.
```sh
GET /api/users/
```
---
- Asigna un número a un usuario. Requiere autenticación.
```sh
POST /api/add-number
```
---
## Números
- Guarda o actualiza el rango de números para el usuario autenticado y elimina usuarios referidos.
```sh
POST /api/numbers
```
Ejemplo de solicitud:
```sh
{
  "start": 1,
  "end": 100
}
```
---
- Obtiene el rango de números del usuario autenticado. Requiere autenticación.
```sh
GET /api/numbers
```
---
## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens) para autenticación
- Morgan (para logging)
- CORS (para el manejo de solicitudes entre dominios)
- Joi y Yup (para validación de datos)
- Bcrypt (para encriptación de contraseñas)
---
## Esta API ha sido desarrollada con el propósito de profundizar y perfeccionar conocimientos en el desarrollo Back-End utilizando Express en Node.js.
