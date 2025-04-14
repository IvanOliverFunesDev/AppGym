# 🏋️ AppGym - Backend API

Backend de una aplicación móvil de seguimiento de rutinas y entrenamientos, desarrollada por y para culturistas. Este proyecto busca facilitar la organización de entrenos y el seguimiento del progreso personal.

---

## 📦 Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Docker (para entorno de desarrollo y base de datos)
- Zod (validaciones)
- JWT (autenticación)
- Postman (test de endpoints)

---

## 🧱 Estructura General

```text
📦src
 ┣ 📂config
 ┣ 📂controllers
 ┃ ┣ 📜auth.controller.js
 ┃ ┣ 📜routine.controller.js
 ┃ ┗ 📜training.controller.js
 ┣ 📂loaders
 ┃ ┣ 📜db.js
 ┃ ┣ 📜express.js
 ┃ ┗ 📜index.js
 ┣ 📂middleware
 ┃ ┣ 📜error-handling.middleware.js
 ┃ ┣ 📜logger.middleware.js
 ┃ ┣ 📜validator-schema.middleware.js
 ┃ ┗ 📜verify-token.middleware.js
 ┣ 📂models
 ┃ ┣ 📜Routine.js
 ┃ ┣ 📜Training.js
 ┃ ┗ 📜User.js
 ┣ 📂routes
 ┃ ┣ 📜auth.routes.js
 ┃ ┣ 📜index.routes.js
 ┃ ┣ 📜routines.routes.js
 ┃ ┗ 📜training.routes.js
 ┣ 📂schemas
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜login-auth.schema.js
 ┃ ┃ ┗ 📜register-auth.schema.js
 ┃ ┣ 📂routine
 ┃ ┃ ┗ 📜create-routine.schema.js
 ┃ ┗ 📂training
 ┃ ┃ ┗ 📜create-training.js
 ┣ 📂services
 ┃ ┗ 📜generateAccessToken.js
 ┣ 📂utils
 ┃ ┣ 📜logger.js
 ┃ ┗ 📜responseHelper.js
 ┣ 📜app.js
 ┣ 📜config.js
 ┗ 📜index.js
```

---

## 🔐 AUTENTICACIÓN

| Método | Ruta                | Descripción                         |
|--------|---------------------|-------------------------------------|
| POST   | /api/auth/login     | Login con email y password          |
| POST   | /api/auth/register  | Registro de nuevo usuario           |
| GET    | /api/auth/verify    | Verifica que el token es válido     |

**Middleware protegido**: `authRequired`  
**Validación**: `Zod` + `validateSchema`

---

## 🧱 RUTINAS

| Método | Ruta                           | Descripción                             |
|--------|--------------------------------|-----------------------------------------|
| POST   | /api/routines                  | Crear nueva rutina                      |
| GET    | /api/routines/user             | Obtener rutina del usuario              |
| DELETE | /api/routines/:id              | Eliminar rutina                         |
| GET    | /api/routines/day/:dayNumber   | Obtener estructura de un día específico |

---

## 🏋️ ENTRENAMIENTOS

| Método | Ruta                                            | Descripción                                           |
|--------|-------------------------------------------------|-------------------------------------------------------|
| POST   | /api/trainings                                  | Registrar un entrenamiento real                       |
| GET    | /api/trainings/user                             | Ver historial completo del usuario                    |
| GET    | /api/trainings/user/day/:routineDayNumber       | Ver historial de un día específico                    |
| GET    | /api/trainings/compare/:routineDayNumber        | Comparar progreso entre primer y último de ese día    |
| GET    | /api/trainings/next                             | Detectar automáticamente qué día le toca hoy          |

---

## 🧠 FUNCIONALIDADES FUTURAS

- [ ] Validación dura: comprobar que ejercicios coinciden con la rutina base
- [ ] Eliminar entrenamiento (`DELETE /trainings/:id`)
- [ ] Resumen del entreno actual (`/trainings/today/summary`)
- [ ] Múltiples rutinas por usuario
- [ ] Edición de rutina ya creada
- [ ] Paginación de históricos (`limit`, `page`)
- [ ] Estadísticas globales y semanales

---

## 📌 Flujo de uso básico

1. Usuario se registra o inicia sesión.
2. Crea su rutina: días y ejercicios por día.
3. Cada vez que entrena:
   - Elige el día (o se detecta automáticamente)
   - Se le muestra la estructura del día
   - Rellena pesos, repeticiones y descansos
   - El entrenamiento se guarda en base de datos
4. El usuario puede consultar sus históricos y comparativas

---

## 🧪 Pruebas

Todos los endpoints han sido verificados usando **Postman**, con autenticación por token JWT en la cabecera:


---

## ✍️ Autor

Proyecto desarrollado por **Iván Oliver Funes**  
Desarrollador Web Fullstack & Culturista

---
