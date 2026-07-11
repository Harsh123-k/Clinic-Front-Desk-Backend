const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Clinic Front Desk Management System API',
    version: '2.0.0',
    description:
      'API Documentation for the Clinic Front Desk Management System. Phase 1 covers authentication and patient CRUD management. Phase 2 adds Doctor profiles, doctor availability management, and appointment scheduling workflows.',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token in the format: Bearer <token>',
      },
    },
    schemas: {
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'admin@clinic.com' },
          password: { type: 'string', format: 'password', example: 'Admin@123' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Login successful' },
          data: {
            type: 'object',
            properties: {
              token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
                  fullName: { type: 'string', example: 'System Admin' },
                  email: { type: 'string', example: 'admin@clinic.com' },
                  role: { type: 'string', example: 'Admin' },
                  phone: { type: 'string', example: '1234567890' },
                  status: { type: 'string', example: 'Active' },
                },
              },
            },
          },
        },
      },
      EmergencyContact: {
        type: 'object',
        required: ['name', 'relationship', 'phone'],
        properties: {
          name: { type: 'string', example: 'Jane Doe' },
          relationship: { type: 'string', example: 'Spouse' },
          phone: { type: 'string', example: '9876543210' },
        },
      },
      PatientInput: {
        type: 'object',
        required: ['firstName', 'lastName', 'gender', 'dob', 'phone', 'emergencyContact'],
        properties: {
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          gender: { type: 'string', enum: ['Male', 'Female', 'Other'], example: 'Male' },
          dob: { type: 'string', format: 'date', example: '1990-05-15' },
          bloodGroup: {
            type: 'string',
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            example: 'O+',
          },
          phone: { type: 'string', example: '9998887776' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          address: { type: 'string', example: '123 Health Ave, Medical District' },
          emergencyContact: { $ref: '#/components/schemas/EmergencyContact' },
          allergies: { type: 'array', items: { type: 'string' }, example: ['Penicillin', 'Peanuts'] },
          medicalHistory: { type: 'array', items: { type: 'string' }, example: ['Hypertension'] },
          currentMedication: { type: 'array', items: { type: 'string' }, example: ['Lisinopril 10mg'] },
        },
      },
      Patient: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '60d0fe4f5311236168a109cb' },
          patientId: { type: 'string', example: 'PAT-20260708-4829' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          gender: { type: 'string', example: 'Male' },
          dob: { type: 'string', format: 'date-time', example: '1990-05-15T00:00:00.000Z' },
          age: { type: 'integer', example: 36 },
          bloodGroup: { type: 'string', example: 'O+' },
          phone: { type: 'string', example: '9998887776' },
          email: { type: 'string', example: 'john.doe@example.com' },
          address: { type: 'string', example: '123 Health Ave, Medical District' },
          emergencyContact: { $ref: '#/components/schemas/EmergencyContact' },
          allergies: { type: 'array', items: { type: 'string' }, example: ['Penicillin', 'Peanuts'] },
          medicalHistory: { type: 'array', items: { type: 'string' }, example: ['Hypertension'] },
          currentMedication: { type: 'array', items: { type: 'string' }, example: ['Lisinopril 10mg'] },
          createdAt: { type: 'string', format: 'date-time', example: '2026-07-08T20:14:42.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2026-07-08T20:14:42.000Z' },
        },
      },
      PatientResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Patient registered successfully' },
          data: { $ref: '#/components/schemas/Patient' },
        },
      },
      DoctorInput: {
        type: 'object',
        required: [
          'fullName',
          'email',
          'password',
          'specialization',
          'licenseNumber',
          'consultationFee',
        ],
        properties: {
          fullName: { type: 'string', example: 'Dr. Priya Sharma' },
          email: { type: 'string', format: 'email', example: 'priya.sharma@clinic.com' },
          password: { type: 'string', format: 'password', example: 'Doctor@123' },
          phone: { type: 'string', example: '9812345678' },
          specialization: { type: 'string', example: 'Cardiology' },
          licenseNumber: { type: 'string', example: 'MCI-2019-004521' },
          experienceYears: { type: 'integer', example: 8 },
          consultationFee: { type: 'number', example: 500 },
          bio: { type: 'string', example: 'Specialist in interventional cardiology.' },
        },
      },
      DoctorUpdateInput: {
        type: 'object',
        properties: {
          fullName: { type: 'string', example: 'Dr. Priya Sharma' },
          phone: { type: 'string', example: '9812345678' },
          specialization: { type: 'string', example: 'Cardiology' },
          licenseNumber: { type: 'string', example: 'MCI-2019-004521' },
          experienceYears: { type: 'integer', example: 8 },
          consultationFee: { type: 'number', example: 500 },
          bio: { type: 'string', example: 'Specialist in interventional cardiology.' },
        },
      },
      Doctor: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64ae76e89f592df04b212d5a' },
          user: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '64ae76e89f592df04b212d3e' },
              fullName: { type: 'string', example: 'Dr. Priya Sharma' },
              email: { type: 'string', example: 'priya.sharma@clinic.com' },
              phone: { type: 'string', example: '9812345678' },
              status: { type: 'string', example: 'Active' },
              role: { type: 'string', example: 'Doctor' },
            },
          },
          specialization: { type: 'string', example: 'Cardiology' },
          licenseNumber: { type: 'string', example: 'MCI-2019-004521' },
          experienceYears: { type: 'integer', example: 8 },
          consultationFee: { type: 'number', example: 500 },
          bio: { type: 'string', example: 'Specialist in interventional cardiology.' },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      DoctorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Doctor created successfully' },
          data: { $ref: '#/components/schemas/Doctor' },
        },
      },
      WeeklyScheduleSlot: {
        type: 'object',
        required: ['dayOfWeek', 'startTime', 'endTime'],
        properties: {
          dayOfWeek: {
            type: 'integer',
            minimum: 0,
            maximum: 6,
            description: '0 = Sunday ... 6 = Saturday',
            example: 1,
          },
          startTime: { type: 'string', example: '09:00', description: '24-hour HH:mm format' },
          endTime: { type: 'string', example: '17:00', description: '24-hour HH:mm format' },
          isAvailable: { type: 'boolean', example: true },
        },
      },
      DoctorLeave: {
        type: 'object',
        required: ['date'],
        properties: {
          date: { type: 'string', format: 'date', example: '2026-08-15' },
          reason: { type: 'string', example: 'Public holiday' },
        },
      },
      AvailabilityInput: {
        type: 'object',
        properties: {
          slotDurationMinutes: { type: 'integer', example: 30 },
          weeklySchedule: {
            type: 'array',
            items: { $ref: '#/components/schemas/WeeklyScheduleSlot' },
          },
          leaves: {
            type: 'array',
            items: { $ref: '#/components/schemas/DoctorLeave' },
          },
        },
      },
      AvailabilityResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Doctor availability updated successfully' },
          data: {
            type: 'object',
            properties: {
              doctor: { type: 'string', example: '64ae76e89f592df04b212d5a' },
              slotDurationMinutes: { type: 'integer', example: 30 },
              weeklySchedule: {
                type: 'array',
                items: { $ref: '#/components/schemas/WeeklyScheduleSlot' },
              },
              leaves: {
                type: 'array',
                items: { $ref: '#/components/schemas/DoctorLeave' },
              },
            },
          },
        },
      },
      AvailableSlotsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Available slots retrieved successfully' },
          data: {
            type: 'object',
            properties: {
              doctor: { type: 'string', example: '64ae76e89f592df04b212d5a' },
              date: { type: 'string', example: '2026-08-01' },
              slotDurationMinutes: { type: 'integer', example: 30 },
              slots: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    start: { type: 'string', format: 'date-time' },
                    end: { type: 'string', format: 'date-time' },
                    available: { type: 'boolean', example: true },
                  },
                },
              },
            },
          },
        },
      },
      AppointmentInput: {
        type: 'object',
        required: ['patient', 'doctor', 'appointmentDate', 'reasonForVisit'],
        properties: {
          patient: { type: 'string', example: '64ae76e89f592df04b212d3e' },
          doctor: { type: 'string', example: '64ae76e89f592df04b212d5a' },
          appointmentDate: { type: 'string', format: 'date-time', example: '2026-08-01T10:00:00.000Z' },
          durationMinutes: { type: 'integer', example: 30 },
          reasonForVisit: { type: 'string', example: 'Routine checkup' },
          notes: { type: 'string', example: 'Patient reports mild chest discomfort' },
        },
      },
      AppointmentUpdateInput: {
        type: 'object',
        properties: {
          reasonForVisit: { type: 'string', example: 'Routine checkup' },
          notes: { type: 'string', example: 'Follow-up required in 2 weeks' },
        },
      },
      AppointmentRescheduleInput: {
        type: 'object',
        properties: {
          appointmentDate: { type: 'string', format: 'date-time', example: '2026-08-02T11:00:00.000Z' },
          doctor: { type: 'string', example: '64ae76e89f592df04b212d5a' },
          durationMinutes: { type: 'integer', example: 30 },
        },
      },
      AppointmentStatusInput: {
        type: 'object',
        required: ['status'],
        properties: {
          status: {
            type: 'string',
            enum: ['Scheduled', 'Completed', 'Cancelled', 'No Show'],
            example: 'Completed',
          },
        },
      },
      Appointment: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64ae76e89f592df04b212d99' },
          appointmentId: { type: 'string', example: 'APT-20260801-483920' },
          patient: { $ref: '#/components/schemas/Patient' },
          doctor: { $ref: '#/components/schemas/Doctor' },
          appointmentDate: { type: 'string', format: 'date-time', example: '2026-08-01T10:00:00.000Z' },
          durationMinutes: { type: 'integer', example: 30 },
          status: {
            type: 'string',
            enum: ['Scheduled', 'Completed', 'Cancelled', 'No Show'],
            example: 'Scheduled',
          },
          reasonForVisit: { type: 'string', example: 'Routine checkup' },
          notes: { type: 'string', example: 'Patient reports mild chest discomfort' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      AppointmentResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Appointment created successfully' },
          data: { $ref: '#/components/schemas/Appointment' },
        },
      },
      InvoiceInput: {
        type: 'object',
        properties: {
          additionalCharges: { type: 'number', example: 150 },
          paymentStatus: { type: 'string', enum: ['Pending', 'Paid'], example: 'Pending' },
          paymentMethod: { type: 'string', enum: ['Cash', 'UPI', 'Card'], example: 'UPI' },
        },
      },
      PayInvoiceInput: {
        type: 'object',
        required: ['paymentMethod'],
        properties: {
          paymentMethod: { type: 'string', enum: ['Cash', 'UPI', 'Card'], example: 'UPI' },
        },
      },
      Invoice: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '64ae76e89f592df04b212e11' },
          invoiceNumber: { type: 'string', example: 'INV-20260711-48293' },
          appointment: { $ref: '#/components/schemas/Appointment' },
          patient: { $ref: '#/components/schemas/Patient' },
          doctor: { $ref: '#/components/schemas/Doctor' },
          consultationCharge: { type: 'number', example: 500 },
          additionalCharges: { type: 'number', example: 150 },
          totalAmount: { type: 'number', example: 650 },
          paymentStatus: { type: 'string', enum: ['Pending', 'Paid'], example: 'Pending' },
          paymentMethod: { type: 'string', enum: ['Cash', 'UPI', 'Card'], example: 'UPI' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      InvoiceResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Invoice generated successfully' },
          data: { $ref: '#/components/schemas/Invoice' },
        },
      },
      InvoiceListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Invoices retrieved successfully' },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/Invoice' },
          },
          pagination: {
            type: 'object',
            properties: {
              total: { type: 'integer', example: 25 },
              page: { type: 'integer', example: 1 },
              limit: { type: 'integer', example: 10 },
              pages: { type: 'integer', example: 3 },
            },
          },
        },
      },
      AnalyticsAppointmentsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Appointment analytics retrieved successfully' },
          data: {
            type: 'object',
            properties: {
              total: { type: 'integer', example: 45 },
              completed: { type: 'integer', example: 30 },
              cancelled: { type: 'integer', example: 5 },
              pending: { type: 'integer', example: 8 },
              noShow: { type: 'integer', example: 2 },
            },
          },
        },
      },
      AnalyticsPatientsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Patient analytics retrieved successfully' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                patientId: { type: 'string', example: 'PAT-20260708-4829' },
                visitCount: { type: 'integer', example: 5 },
                patient: { $ref: '#/components/schemas/Patient' },
              },
            },
          },
        },
      },
      AnalyticsDoctorsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Doctor analytics retrieved successfully' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                doctorId: { type: 'string', example: '64ae76e89f592df04b212d5a' },
                appointmentCount: { type: 'integer', example: 15 },
                completedCount: { type: 'integer', example: 10 },
                pendingCount: { type: 'integer', example: 3 },
                cancelledCount: { type: 'integer', example: 2 },
                doctor: { $ref: '#/components/schemas/Doctor' },
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error message description' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Please provide a valid email address' },
              },
            },
          },
        },
      },
    },
  },
  paths: {
    '/api/auth/login': {
      post: {
        summary: 'User Login',
        description: 'Authenticates a user and returns a JWT token.',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } },
          },
          400: {
            description: 'Validation failed',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: {
            description: 'Invalid credentials',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },

    '/api/patients': {
      post: {
        summary: 'Register New Patient',
        description: 'Registers a new patient in the system. Accessible by Admin and Receptionist.',
        tags: ['Patient Management'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientInput' } } },
        },
        responses: {
          201: {
            description: 'Patient created successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientResponse' } } },
          },
          400: {
            description: 'Validation failure or duplicate key entry',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: {
            description: 'Unauthorized (Missing or invalid token)',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          403: {
            description: 'Forbidden (Insufficient privileges or deactivated account)',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
      get: {
        summary: 'Get All Patients / Search',
        description:
          'Retrieves a list of all patients. Supports search filters (by patientId, name, phone, email), pagination, and sorting. Accessible by Admin, Receptionist, and Doctor.',
        tags: ['Patient Management'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'search', in: 'query', required: false, schema: { type: 'string' } },
          { name: 'page', in: 'query', required: false, schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', required: false, schema: { type: 'integer', default: 10 } },
          { name: 'sortBy', in: 'query', required: false, schema: { type: 'string', default: 'createdAt' } },
          {
            name: 'sortOrder',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
          },
        ],
        responses: {
          200: {
            description: 'List of patients retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Patients retrieved successfully' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Patient' } },
                    pagination: {
                      type: 'object',
                      properties: {
                        total: { type: 'integer', example: 25 },
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 10 },
                        pages: { type: 'integer', example: 3 },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          403: {
            description: 'Forbidden',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },

    '/api/patients/{id}': {
      get: {
        summary: 'Get Patient By ID',
        description: 'Retrieves patient details by database object ID. Accessible by Admin, Receptionist, and Doctor.',
        tags: ['Patient Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'Patient retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientResponse' } } },
          },
          400: { description: 'Invalid ID format' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Patient not found' },
        },
      },
      put: {
        summary: 'Update Patient Details',
        description: 'Updates details of an existing patient. Accessible by Admin and Receptionist.',
        tags: ['Patient Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientInput' } } },
        },
        responses: {
          200: {
            description: 'Patient updated successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientResponse' } } },
          },
          400: { description: 'Invalid request payload or ID format' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Patient not found' },
        },
      },
      delete: {
        summary: 'Delete Patient',
        description: 'Deletes a patient from the system. Accessible by Admin only.',
        tags: ['Patient Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'Patient deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Patient deleted successfully' },
                  },
                },
              },
            },
          },
          400: { description: 'Invalid ID format' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Only Admin is allowed)' },
          404: { description: 'Patient not found' },
        },
      },
    },

    '/api/doctors': {
      post: {
        summary: 'Create Doctor',
        description:
          'Creates a new Doctor login (User with role Doctor) and their Doctor profile in one step. Accessible by Admin only.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorInput' } } },
        },
        responses: {
          201: {
            description: 'Doctor created successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorResponse' } } },
          },
          400: {
            description: 'Validation failure or duplicate email',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin only)' },
        },
      },
      get: {
        summary: 'Get All Doctors / Search',
        description:
          'Retrieves a list of active doctors. Supports search by name/email/license, filter by specialization, pagination, and sorting. Accessible by Admin, Receptionist, and Doctor.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'search', in: 'query', required: false, schema: { type: 'string' } },
          { name: 'specialization', in: 'query', required: false, schema: { type: 'string' } },
          { name: 'page', in: 'query', required: false, schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', required: false, schema: { type: 'integer', default: 10 } },
          { name: 'sortBy', in: 'query', required: false, schema: { type: 'string', default: 'createdAt' } },
          {
            name: 'sortOrder',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
          },
        ],
        responses: {
          200: {
            description: 'List of doctors retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Doctors retrieved successfully' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Doctor' } },
                    pagination: {
                      type: 'object',
                      properties: {
                        total: { type: 'integer', example: 12 },
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 10 },
                        pages: { type: 'integer', example: 2 },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },

    '/api/doctors/{id}': {
      get: {
        summary: 'Get Doctor By ID',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'Doctor retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorResponse' } } },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Doctor not found' },
        },
      },
      put: {
        summary: 'Update Doctor',
        description: 'Updates doctor profile fields and a subset of the linked user contact fields. Accessible by Admin only.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorUpdateInput' } } },
        },
        responses: {
          200: {
            description: 'Doctor updated successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorResponse' } } },
          },
          400: { description: 'Invalid request payload or ID format' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin only)' },
          404: { description: 'Doctor not found' },
        },
      },
      delete: {
        summary: 'Deactivate Doctor',
        description:
          'Soft-deletes a doctor: deactivates their login and profile rather than hard-deleting, preserving appointment history. Accessible by Admin only.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Doctor deactivated successfully' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin only)' },
          404: { description: 'Doctor not found' },
        },
      },
    },

    '/api/doctors/{id}/availability': {
      get: {
        summary: "Get Doctor's Weekly Availability & Leaves",
        tags: ['Doctor Availability'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'Doctor availability retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AvailabilityResponse' } } },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Doctor not found' },
        },
      },
      put: {
        summary: "Set/Replace Doctor's Weekly Availability & Leaves",
        description:
          'Accessible by Admin (for any doctor) or by the Doctor themselves (for their own profile only).',
        tags: ['Doctor Availability'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AvailabilityInput' } } },
        },
        responses: {
          200: {
            description: 'Doctor availability updated successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AvailabilityResponse' } } },
          },
          400: { description: 'Validation error' },
          401: { description: 'Unauthorized' },
          403: { description: "Forbidden (not this doctor's own profile, and not Admin)" },
          404: { description: 'Doctor not found' },
        },
      },
    },

    '/api/doctors/{id}/slots': {
      get: {
        summary: "Get Doctor's Open/Booked Slots for a Date",
        description:
          'Computes bookable time slots for the given date from the doctor\'s weekly availability, minus leave days and existing scheduled appointments.',
        tags: ['Doctor Availability'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          {
            name: 'date',
            in: 'query',
            required: true,
            description: 'Date to compute slots for (YYYY-MM-DD)',
            schema: { type: 'string', format: 'date' },
          },
        ],
        responses: {
          200: {
            description: 'Available slots retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AvailableSlotsResponse' } } },
          },
          400: { description: 'Missing or invalid date parameter' },
          401: { description: 'Unauthorized' },
          404: { description: 'Doctor not found' },
        },
      },
    },

    '/api/appointments': {
      post: {
        summary: 'Create Appointment',
        description:
          'Books an appointment after validating the slot against the doctor\'s working hours, leave days, and existing bookings. Accessible by Admin and Receptionist.',
        tags: ['Appointment Management'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentInput' } } },
        },
        responses: {
          201: {
            description: 'Appointment created successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentResponse' } } },
          },
          400: {
            description: 'Validation error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Patient or Doctor not found' },
          409: { description: 'Requested time slot is unavailable (outside hours, on leave, or already booked)' },
        },
      },
      get: {
        summary: 'Get All Appointments / Search',
        description:
          'Retrieves appointments with filters (doctor, patient, status, date range), pagination, and sorting. Doctors are automatically scoped to only their own appointments.',
        tags: ['Appointment Management'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'doctor', in: 'query', required: false, schema: { type: 'string' }, description: 'Filter by doctor ID (ignored for Doctor-role callers, who are auto-scoped)' },
          { name: 'patient', in: 'query', required: false, schema: { type: 'string' } },
          {
            name: 'status',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['Scheduled', 'Completed', 'Cancelled', 'No Show'] },
          },
          { name: 'dateFrom', in: 'query', required: false, schema: { type: 'string', format: 'date' } },
          { name: 'dateTo', in: 'query', required: false, schema: { type: 'string', format: 'date' } },
          { name: 'page', in: 'query', required: false, schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', required: false, schema: { type: 'integer', default: 10 } },
          { name: 'sortBy', in: 'query', required: false, schema: { type: 'string', default: 'appointmentDate' } },
          {
            name: 'sortOrder',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
          },
        ],
        responses: {
          200: {
            description: 'Appointments retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Appointments retrieved successfully' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Appointment' } },
                    pagination: {
                      type: 'object',
                      properties: {
                        total: { type: 'integer', example: 8 },
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 10 },
                        pages: { type: 'integer', example: 1 },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },

    '/api/appointments/{id}': {
      get: {
        summary: 'Get Appointment By ID',
        description: "Doctors may only view their own appointments.",
        tags: ['Appointment Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'Appointment found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentResponse' } } },
          },
          401: { description: 'Unauthorized' },
          403: { description: "Forbidden (not this doctor's own appointment)" },
          404: { description: 'Appointment not found' },
        },
      },
      put: {
        summary: 'Update Appointment (reason / notes)',
        description:
          'Updates non-scheduling fields only. Use PATCH /api/appointments/{id}/reschedule to change the date/time or doctor. Accessible by Admin and Receptionist.',
        tags: ['Appointment Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentUpdateInput' } } },
        },
        responses: {
          200: {
            description: 'Appointment updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentResponse' } } },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Appointment not found' },
        },
      },
      delete: {
        summary: 'Delete Appointment',
        tags: ['Appointment Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Appointment deleted' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin only)' },
          404: { description: 'Appointment not found' },
        },
      },
    },

    '/api/appointments/{id}/reschedule': {
      patch: {
        summary: 'Reschedule Appointment',
        description:
          'Moves an appointment to a new date/time and/or doctor, re-validating the slot against availability and existing bookings. Accessible by Admin and Receptionist.',
        tags: ['Appointment Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentRescheduleInput' } } },
        },
        responses: {
          200: {
            description: 'Appointment rescheduled successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentResponse' } } },
          },
          400: { description: 'Appointment is not in a reschedulable state' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Appointment or Doctor not found' },
          409: { description: 'Requested time slot is unavailable' },
        },
      },
    },

    '/api/appointments/{id}/status': {
      patch: {
        summary: 'Update Appointment Status',
        description:
          "Doctor workflow endpoint: move an appointment from Scheduled to Completed, Cancelled, or No Show. Doctors may only update their own appointments.",
        tags: ['Appointment Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentStatusInput' } } },
        },
        responses: {
          200: {
            description: 'Status updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentResponse' } } },
          },
          400: { description: 'Invalid status transition' },
          401: { description: 'Unauthorized' },
          403: { description: "Forbidden (not this doctor's own appointment)" },
          404: { description: 'Appointment not found' },
        },
      },
    },

    '/api/doctors': {
      post: {
        summary: 'Register Doctor User & Profile',
        description: 'Creates a Doctor user account and their Doctor Profile. Accessible by Admin only.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorInput' } } },
        },
        responses: {
          201: {
            description: 'Doctor registered successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorResponse' } } },
          },
          400: { description: 'Validation failure or duplicate key error' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin only)' },
        },
      },
      get: {
        summary: 'Get All Doctor Profiles',
        description: 'Retrieves all doctor profiles with optional search and pagination. Accessible by Admin, Receptionist, and Doctor.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'search', in: 'query', description: 'Search by doctor name or specialization', required: false, schema: { type: 'string' } },
          { name: 'specialization', in: 'query', description: 'Filter by specialization', required: false, schema: { type: 'string' } },
          { name: 'page', in: 'query', description: 'Page number', required: false, schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', description: 'Items per page', required: false, schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          200: {
            description: 'Doctors retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Doctors retrieved successfully' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Doctor' } },
                    pagination: {
                      type: 'object',
                      properties: {
                        total: { type: 'integer', example: 10 },
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 10 },
                        pages: { type: 'integer', example: 1 },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },

    '/api/doctors/{id}': {
      get: {
        summary: 'Get Doctor Profile By ID',
        description: 'Retrieves single doctor profile. Accessible by Admin, Receptionist, and Doctor.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'Doctor found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorResponse' } } },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Doctor not found' },
        },
      },
      put: {
        summary: 'Update Doctor Profile',
        description: 'Updates doctor profile details. Accessible by Admin, or the Doctor themselves modifying their own profile.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorUpdateInput' } } },
        },
        responses: {
          200: {
            description: 'Doctor profile updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorResponse' } } },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Not authorized to modify this profile)' },
          404: { description: 'Doctor not found' },
        },
      },
      delete: {
        summary: 'Delete Doctor Profile',
        description: 'Deletes doctor profile and their user account. Accessible by Admin only.',
        tags: ['Doctor Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Doctor profile and account deleted successfully' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin only)' },
          404: { description: 'Doctor not found' },
        },
      },
    },

    '/api/billing': {
      get: {
        summary: 'Get All Invoices',
        description: 'Retrieves all invoices with optional filtering and pagination. Accessible by Admin and Receptionist only.',
        tags: ['Billing Management'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'paymentStatus', in: 'query', description: 'Filter by payment status', required: false, schema: { type: 'string', enum: ['Pending', 'Paid'] } },
          { name: 'patient', in: 'query', description: 'Filter by Patient Database ID', required: false, schema: { type: 'string' } },
          { name: 'doctor', in: 'query', description: 'Filter by Doctor Database ID', required: false, schema: { type: 'string' } },
          { name: 'page', in: 'query', description: 'Page number', required: false, schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', description: 'Items per page', required: false, schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          200: {
            description: 'Invoices retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/InvoiceListResponse' } } },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden (Admin/Receptionist only)' },
        },
      },
    },

    '/api/billing/generate/{appointmentId}': {
      post: {
        summary: 'Generate Invoice From Appointment',
        description: 'Automatically creates an invoice using the appointment information and consultation fee. Accessible by Admin and Receptionist.',
        tags: ['Billing Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'appointmentId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: false,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/InvoiceInput' } } },
        },
        responses: {
          201: {
            description: 'Invoice generated successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/InvoiceResponse' } } },
          },
          400: { description: 'Validation failed or invoice already generated' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Appointment or Doctor not found' },
        },
      },
    },

    '/api/billing/{invoiceId}': {
      get: {
        summary: 'Get Invoice Details By ID',
        description: 'Retrieves single invoice details. Accessible by Admin and Receptionist.',
        tags: ['Billing Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'invoiceId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: {
            description: 'Invoice found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/InvoiceResponse' } } },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Invoice not found' },
        },
      },
    },

    '/api/billing/pay/{invoiceId}': {
      put: {
        summary: 'Mark Invoice As Paid',
        description: 'Updates payment status to Paid and logs the payment method. Accessible by Admin and Receptionist.',
        tags: ['Billing Management'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'invoiceId', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PayInvoiceInput' } } },
        },
        responses: {
          200: {
            description: 'Invoice marked as Paid',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/InvoiceResponse' } } },
          },
          400: { description: 'Validation failure or invoice already paid' },
          401: { description: 'Unauthorized' },
          403: { description: 'Forbidden' },
          404: { description: 'Invoice not found' },
        },
      },
    },

    '/api/analytics/appointments': {
      get: {
        summary: 'Get Appointment Analytics Breakdown',
        description: 'Returns total, completed, pending, and cancelled appointment counts. Doctors are limited to their own counts.',
        tags: ['Analytics'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Appointment analytics retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AnalyticsAppointmentsResponse' } } },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Doctor profile not found' },
        },
      },
    },

    '/api/analytics/patients': {
      get: {
        summary: 'Get Top Patients Analytics',
        description: 'Returns top visiting patients and visit counts. Doctors are limited to their own patients.',
        tags: ['Analytics'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Patient analytics retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AnalyticsPatientsResponse' } } },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Doctor profile not found' },
        },
      },
    },

    '/api/analytics/doctors': {
      get: {
        summary: 'Get Doctor Activity Analytics',
        description: 'Returns appointment count and status breakdowns per doctor. Doctors are limited to their own summary.',
        tags: ['Analytics'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Doctor analytics retrieved successfully',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AnalyticsDoctorsResponse' } } },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Doctor profile not found' },
        },
      },
    },
  },
};

module.exports = swaggerDocument;