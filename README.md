# Clinic Front Desk Management System Backend

A complete, production-ready REST API backend for the **Clinic Front Desk Management System**, built using Node.js, Express, and MongoDB.

This project implements Phase 1, Phase 2, and Phase 3 of the system, supporting patient management, doctor profiles, scheduling, billing workflows, and clinic statistics.

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
│   └── db.js (Database Connection & Admin Seeding)
├── controllers/
│   ├── analyticsController.js (NEW - Statistics Pipelines)
│   ├── appointmentController.js (Appointment Logic & Paginated Retrieval)
│   ├── authController.js (Authentication Entrypoint)
│   ├── doctorController.js (NEW - Doctor Management)
│   └── patientController.js (Patient Actions & Paginated Retrieval)
├── docs/
│   └── swagger.js (Full OpenAPI Documentation Specs)
├── middleware/
│   ├── auth.js (JWT Protection & Custom RBAC Rules)
│   ├── errorHandler.js (Global Error and Cast Handlers)
│   └── validator.js (Validation Result Intermediate Middleware)
├── models/
│   ├── Appointment.js (Appointment Schema & Auto ID)
│   ├── Doctor.js (Doctor Profile Schema)
│   ├── Invoice.js (NEW - Billing Schema & Auto invoiceNumber)
│   ├── Patient.js (Patient Profile Schema & Auto ID)
│   └── User.js (User Schema, Role Enum & Password Pre-Save Hash)
├── postman/
│   └── clinic_management_system.postman_collection.json (API Collection)
├── routes/
│   ├── analyticsRoutes.js (NEW - Analytics Routes)
│   ├── appointmentRoutes.js (Appointment Routing)
│   ├── authRoutes.js (Auth Login Router)
│   ├── billingRoutes.js (NEW - Invoice Router)
│   ├── doctorRoutes.js (NEW - Doctor Router)
│   ├── index.js (API Gateway Route Integrator)
│   └── patientRoutes.js (Patient Router)
├── services/
│   ├── analyticsService.js (NEW - MongoDB Aggregation Pipelines)
│   ├── appointmentService.js (Appointment Validation & Data Handler)
│   ├── authService.js (JWT Token Signer and Validator)
│   ├── billingService.js (NEW - Invoice generator, pay logic)
│   ├── doctorService.js (NEW - Doctor User & Profile CRUD helper)
│   └── patientService.js (Patient Database Services)
├── validators/
│   ├── authValidator.js (Login Request Constraints)
│   ├── billingValidator.js (NEW - Invoice creation and payment validators)
│   ├── doctorValidator.js (NEW - Doctor body fields constraints)
│   └── patientValidator.js (Patient body validation constraints)
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── README.md
└── server.js
```

---

## Installation & Setup

### Prerequisites
1. Install **Node.js** (v16.0.0 or higher).
2. Install and run **MongoDB** locally, or have an Atlas MongoDB URI ready.

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
   Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Adjust settings inside `.env`:
   - `PORT`: Port to run the server on (default `5000`)
   - `MONGO_URI`: MongoDB connection string (e.g. `mongodb+srv://...` or `mongodb://localhost:27017/clinic_db`)
   - `JWT_SECRET`: Security passphrase for JWT verification
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

---

## Core Authentication & Default Admin Account

During application boot-up, if there is no user found with the email `admin@clinic.com`, the system automatically seeds a default Admin user:

* **Email:** `admin@clinic.com`
* **Password:** `Admin@123`
* **Role:** `Admin`

To make authorized calls, first POST to `/api/auth/login` to retrieve your token. Put this token into the header:
`Authorization: Bearer <token>`

---

## Role-Based Access Control (RBAC) Matrix

The system enforces strict route authorization checks:

| Endpoint | Method | Allowed Roles | Restrictions / Context |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | POST | Public | Authenticates credentials, returns JWT |
| `/api/patients` | POST | Admin, Receptionist | Registers patient, calculates age |
| `/api/patients` | GET | Admin, Receptionist, Doctor | **Doctor**: restricted to patients who have appointments with them. Supports page, limit, search. |
| `/api/patients/:id` | GET | Admin, Receptionist, Doctor | **Doctor**: blocked if patient has no appointment with them. |
| `/api/patients/:id` | PUT | Admin, Receptionist | Updates patient details |
| `/api/patients/:id` | DELETE | Admin | Removes patient profile |
| `/api/doctors` | POST | Admin | Creates Doctor user login and profile |
| `/api/doctors` | GET | Admin, Receptionist, Doctor | Lists doctor profiles. Supports pagination/search. |
| `/api/doctors/:id` | GET | Admin, Receptionist, Doctor | Retrieves doctor details |
| `/api/doctors/:id` | PUT | Admin, Doctor | **Doctor**: can only modify their own profile. |
| `/api/doctors/:id` | DELETE | Admin | Deletes doctor profile and login account |
| `/api/appointments` | POST | Admin, Receptionist | Schedules new appointment |
| `/api/appointments` | GET | Admin, Receptionist, Doctor | **Doctor**: returns own appointments only. Supports page, limit, filters. |
| `/api/appointments/:id` | GET | Admin, Receptionist, Doctor | **Doctor**: blocked if not their own appointment. |
| `/api/appointments/:id` | PUT | Admin, Receptionist | Updates appointment details |
| `/api/appointments/:id` | DELETE | Admin | Deletes appointment |
| `/api/appointments/:id/status`| PATCH | Admin, Receptionist, Doctor | **Doctor**: restricted to their own appointments. |
| `/api/billing` | GET | Admin, Receptionist | Lists all invoices. Supports page, limit, status, patient/doctor filter. |
| `/api/billing/generate/:id`| POST | Admin, Receptionist | Generates invoice from appointment. Consultation fee pulled dynamically. |
| `/api/billing/:id` | GET | Admin, Receptionist | Retrieves invoice details. (Doctors blocked) |
| `/api/billing/pay/:id` | PUT | Admin, Receptionist | Marks invoice as Paid with paymentMethod. (Doctors blocked) |
| `/api/analytics/appointments`| GET | Admin, Doctor, Receptionist | **Doctor**: restricted to own appointments count. |
| `/api/analytics/patients` | GET | Admin, Doctor, Receptionist | **Doctor**: restricted to top visiting patients under their care. |
| `/api/analytics/doctors` | GET | Admin, Doctor, Receptionist | **Doctor**: returns own activity breakdown only. |

---

## API Reference Summary

### Pagination, Search & Filtering
All paginated GET endpoints (`/api/patients`, `/api/doctors`, `/api/appointments`, `/api/billing`) support `page` and `limit` query parameters.
- **Patients**: supports `search` matching name, email, or phone.
- **Doctors**: supports `search` matching doctor name or specialization, or `specialization` query directly.
- **Appointments**: supports filtering by `status`, `doctor`, `patient`, and `date` (format `YYYY-MM-DD` range matching).
- **Billing**: supports filtering by `paymentStatus`, `patient`, and `doctor`.

### Swagger/OpenAPI Playground
Once your application is running, open your browser to the interactive sandbox:

👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

---

## Deployment to Render

<<<<<<< HEAD
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
=======
This application is ready for deployment on **Render**:

### Environment Setup on Render Dashboard
1. Create a new **Web Service** pointing to your GitHub repository.
2. Select **Node** as the Environment.
3. Configure the following Build Command:
   ```bash
   cd backend && npm install
   ```
4. Configure the following Start Command:
   ```bash
   cd backend && npm start
   ```
5. In the **Environment Variables** section, add:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render defaults to redirecting incoming traffic to PORT)
   - `MONGO_URI`: *[Your MongoDB Atlas connection URI string]*
   - `JWT_SECRET`: *[A secure hash secret]*
   - `JWT_EXPIRES`: `7d`

### Health Check Endpoint
Use `/health` as Render's health check path. It responds with 200 OK:
```json
{
  "success": true,
  "message": "Clinic Management API is running healthy",
  "timestamp": "..."
}
```

---

(Complete Phase 3: Billing, Analytics & Deployment)

## Postman Testing Sequence

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
=======
The suggested workflow for testing your deployed or local APIs is:
1. **Login as Admin** (`POST /api/auth/login`) using default credentials.
2. **Create Doctor Profile** (`POST /api/doctors`) as Admin. Save the doctor ID and the doctor user email.
3. **Login as Doctor** (`POST /api/auth/login`) using the doctor credentials.
4. **Create Patient Profile** (`POST /api/patients`) as Admin/Receptionist. Save patient ID.
5. **Create Appointment** (`POST /api/appointments`) as Admin/Receptionist scheduling the Patient with the Doctor.
6. **Doctor Views Appointments** (`GET /api/appointments`) as Doctor to verify they only see their own appointments.
7. **Complete Appointment** (`PATCH /api/appointments/:id/status`) to `Completed` as Doctor.
8. **Generate Invoice** (`POST /api/billing/generate/:appointmentId`) as Receptionist.
9. **Pay Invoice** (`PUT /api/billing/pay/:invoiceId`) as Receptionist.
10. **View Analytics** (`GET /api/analytics/appointments`, `GET /api/analytics/patients`, `GET /api/analytics/doctors`) as Doctor and Admin respectively to verify correct aggregation and limits.
>>>>>>> 716aada (Complete Phase 3: Billing, Analytics & Deployment)
