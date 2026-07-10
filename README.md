# Clinic Front Desk Management System Backend

A complete, production-ready REST API backend for the **Clinic Front Desk Management System**, built using Node.js, Express, and MongoDB.

This project implements Phase 1 and Phase 2 of the Clinic Front Desk Management System.

Phase 1 includes secure authentication, JWT authorization and Patient Management.

Phase 2 extends the system with Appointment Management and complete Swagger API Documentation for all modules.

---

## Features

### Phase 1
- JWT Authentication
- Role Based Access Control (RBAC)
- Patient CRUD Operations
- Patient Search & Pagination
- Swagger Documentation

### Phase 2
- Appointment Management
- Appointment CRUD Operations
- Appointment Rescheduling
- Appointment Status Update
- Complete Swagger API Documentation

---

## Tech Stack

- **Runtime Environment:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** Helmet (HTTP Headers), CORS
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Validation:** express-validator
- **Request Logger:** Morgan
- **Documentation:** Swagger UI (OpenAPI 3.0)
- **Testing:** Postman Collection

---

## Folder Structure

```text
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── appointmentController.js
│   ├── authController.js
│   └── patientController.js
├── docs/
│   └── swagger.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validator.js
├── models/
│   ├── Appointment.js
│   ├── Doctor.js
│   ├── Patient.js
│   └── User.js
├── postman/
│   └── clinic_management_system.postman_collection.json
├── routes/
│   ├── appointmentRoutes.js
│   ├── authRoutes.js
│   ├── index.js
│   └── patientRoutes.js
├── services/
│   ├── appointmentService.js
│   ├── authService.js
│   └── patientService.js
├── uploads/
│   └── .gitkeep
├── utils/
│   └── response.js
├── validators/
│   ├── authValidator.js
│   └── patientValidator.js
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation & Setup

### Prerequisites
1. Install **Node.js** (v16.0.0 or higher).
2. Install and run **MongoDB** locally (default `mongodb://localhost:27017/clinic_db`), or have an Atlas MongoDB URI ready.

### Steps
1. Navigate into the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   A `.env` file has been automatically created for you. You can adjust the settings inside `.env`:
   - `PORT`: Port to run the server on (default `5000`)
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Security salt/passphrase for JWT verification
   - `JWT_EXPIRES`: Expiration span of token (default `7d`)

---

## Running the Project

- **Development Mode** (with Nodemon file-watcher):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

Once running, the terminal will log confirmation of database connection and output active host paths.

---

## API Documentation (Swagger)

A beautiful Swagger OpenAPI 3.0 documentation playground is integrated directly into the running application. Once your server starts, you can visit it in your browser:

👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

### Interactive Sandbox
You can use the **Authorize** button in the Swagger UI, insert your JWT token (e.g. `Bearer <token>`), and run live endpoint requests against the database directly from the browser window.

---

## Core Authentication & Default Admin Account

During application boot-up, if there is no user found with the email `admin@clinic.com`, the system automatically seeds a default Admin user:

* **Email:** `admin@clinic.com`
* **Password:** `Admin@123`
* **Role:** `Admin`

To start calling protected endpoints:
1. Make a `POST /api/auth/login` request using the above credentials.
2. The response will return a JWT `token`.
3. Put this token into the `Authorization: Bearer <token>` header of your subsequent requests (or add it directly to Postman's variable).

---

## API Reference Summary

### Authentication APIs
* **`POST /api/auth/login`**
  - **Access:** Public
  - **Body:** `{ "email": "admin@clinic.com", "password": "Admin@123" }`
  - **Returns:** User details + JWT Token.

### Patient CRUD APIs
All patient APIs require `Bearer <token>` in the `Authorization` header.

---

## Appointment APIs

All appointment APIs require Bearer Token.

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/appointments | Create Appointment |
| GET | /api/appointments | Get All Appointments |
| GET | /api/appointments/:id | Get Appointment By ID |
| PUT | /api/appointments/:id | Update Appointment |
| DELETE | /api/appointments/:id | Delete Appointment |
| PATCH | /api/appointments/:id/reschedule | Reschedule Appointment |
| PATCH | /api/appointments/:id/status | Update Appointment Status |

## Role-Based Access Control (RBAC) Rules

The system enforces strict route authorization checks at the middleware level:

| Endpoint | Method | Allowed Roles |
|----------|--------|---------------|
| /api/auth/login | POST | Public |
| /api/patients | POST | Admin, Receptionist |
| /api/patients | GET | Admin, Receptionist, Doctor |
| /api/patients/:id | GET | Admin, Receptionist, Doctor |
| /api/patients/:id | PUT | Admin, Receptionist |
| /api/patients/:id | DELETE | Admin |
| /api/appointments | POST | Admin, Receptionist |
| /api/appointments | GET | Admin, Receptionist, Doctor |
| /api/appointments/:id | GET | Admin, Receptionist, Doctor |
| /api/appointments/:id | PUT | Admin, Receptionist |
| /api/appointments/:id | DELETE | Admin |
| /api/appointments/:id/reschedule | PATCH | Admin, Receptionist |
| /api/appointments/:id/status | PATCH | Admin, Doctor |

---

## Postman Collection Testing

A complete Postman collection is generated under:
`backend/postman/clinic_management_system.postman_collection.json`

To test:
1. Import the collection file into Postman.
2. Trigger the **Login - Admin** request to verify credentials.
3. Save the returned token value.
4. The collection uses dynamic variables: `{{baseUrl}}` (defaults to `http://localhost:5000`), `{{authToken}}` (paste the token here), and `{{patientId}}` (paste a created patient's `_id` here to run the Get by ID, Update, and Delete endpoints).

---

# Project Version

**Current Version:** 2.0

## Completed Modules

- ✅ Authentication
- ✅ JWT Authorization
- ✅ Patient Management
- ✅ Appointment Management
- ✅ Swagger Documentation
