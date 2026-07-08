# Clinic Front Desk Management System Backend (Phase 1)

A complete, production-ready REST API backend for the **Clinic Front Desk Management System**, built using Node.js, Express, and MongoDB.

This project implements **Phase 1** of the system, focusing on user authentication (JWT + bcrypt), Role-Based Access Control (RBAC), and robust Patient Management (CRUD, Search, and Medical History).

---

## Tech Stack

- **Runtime Environment:** Node.js (v16+)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** Helmet (HTTP Headers), CORS
- **Authentication:** JSON Web Tokens (JWT), bcryptjs for secure password hashing
- **Validation:** express-validator for robust payload verification
- **Request Logger:** Morgan
- **Documentation:** Swagger UI (OpenAPI 3.0 specification)
- **Testing:** Postman Collection

---

## Folder Structure

```text
backend/
├── config/
│   └── db.js            # MongoDB connection & default admin seeding
├── controllers/
│   ├── authController.js    # Login route controller
│   └── patientController.js # Patient CRUD controllers
├── docs/
│   └── swagger.js       # OpenAPI/Swagger 3.0 specification document
├── middleware/
│   ├── auth.js          # Route protection & RBAC middleware
│   ├── errorHandler.js  # Global error & 404 handler middleware
│   └── validator.js     # Middleware to capture express-validator results
├── models/
│   ├── User.js          # User Schema (Admin, Receptionist, Doctor)
│   ├── Patient.js       # Patient Schema (CRUD, age compute, patientId auto-gen)
│   ├── Doctor.js        # Doctor Schema (Schema only)
│   └── Appointment.js   # Appointment Schema (Schema only)
├── postman/
│   └── clinic_management_system.postman_collection.json # Postman requests
├── routes/
│   ├── index.js         # Main router entry / mounts routes under /api
│   ├── authRoutes.js    # Authentication routes
│   └── patientRoutes.js # Patient management routes
├── services/
│   ├── authService.js   # Authentication business logic & JWT generator
│   └── patientService.js # Patient CRUD & search filters business logic
├── uploads/
│   └── .gitkeep         # Folder for future uploads (e.g. prescription PDFs)
├── utils/
│   └── response.js      # Structured response formatting utilities
├── .env                 # Environment variables config
├── .env.example         # Example environment variables format
├── app.js               # Express application initialization & middleware setup
├── package.json         # Node dependency & project configuration
└── server.js            # Entry point to database connect & start listener
```

---

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

* **`POST /api/patients`**
  - **Access:** Admin, Receptionist
  - **Description:** Registers a new patient. Auto-generates standard unique `patientId` (e.g. `PAT-20260708-4829`) and auto-calculates patient `age` based on `dob`.
  - **Body:** See Swagger schema or Postman payload examples.

* **`GET /api/patients`**
  - **Access:** Admin, Receptionist, Doctor
  - **Description:** Get all patients.
  - **Query Parameters (Optional):**
    - `search`: Search query string matching `patientId`, `firstName`, `lastName`, `phone`, or `email`.
    - `page`: Page index (default: `1`).
    - `limit`: Patient records count per page (default: `10`).
    - `sortBy`: Field to sort results (default: `createdAt`).
    - `sortOrder`: Sort direction `asc` or `desc` (default: `desc`).

* **`GET /api/patients/:id`**
  - **Access:** Admin, Receptionist, Doctor
  - **Description:** Retrieves full patient detail, medical history, allergies, and medications.

* **`PUT /api/patients/:id`**
  - **Access:** Admin, Receptionist
  - **Description:** Updates patient fields. Recalculates age if `dob` is modified.

* **`DELETE /api/patients/:id`**
  - **Access:** Admin Only
  - **Description:** Removes a patient record permanently.

---

## Role-Based Access Control (RBAC) Rules

The system enforces strict route authorization checks at the middleware level:

| Endpoint | HTTP Method | Allowed Roles |
| :--- | :--- | :--- |
| `/api/auth/login` | POST | Public |
| `/api/patients` | POST | Admin, Receptionist |
| `/api/patients` | GET | Admin, Receptionist, Doctor |
| `/api/patients/:id` | GET | Admin, Receptionist, Doctor |
| `/api/patients/:id` | PUT | Admin, Receptionist |
| `/api/patients/:id` | DELETE | Admin Only |

---

## Postman Collection Testing

A complete Postman collection is generated under:
`backend/postman/clinic_management_system.postman_collection.json`

To test:
1. Import the collection file into Postman.
2. Trigger the **Login - Admin** request to verify credentials.
3. Save the returned token value.
4. The collection uses dynamic variables: `{{baseUrl}}` (defaults to `http://localhost:5000`), `{{authToken}}` (paste the token here), and `{{patientId}}` (paste a created patient's `_id` here to run the Get by ID, Update, and Delete endpoints).
