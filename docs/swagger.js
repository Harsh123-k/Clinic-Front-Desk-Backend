const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Clinic Front Desk Management System API',
    version: '1.0.0',
    description: 'API Documentation for Phase 1 of the Clinic Front Desk Management System. Includes authentication and patient CRUD management.',
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
          email: {
            type: 'string',
            format: 'email',
            example: 'admin@clinic.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'Admin@123',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Login successful',
          },
          data: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    example: '60d0fe4f5311236168a109ca',
                  },
                  fullName: {
                    type: 'string',
                    example: 'System Admin',
                  },
                  email: {
                    type: 'string',
                    example: 'admin@clinic.com',
                  },
                  role: {
                    type: 'string',
                    example: 'Admin',
                  },
                  phone: {
                    type: 'string',
                    example: '1234567890',
                  },
                  status: {
                    type: 'string',
                    example: 'Active',
                  },
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
          name: {
            type: 'string',
            example: 'Jane Doe',
          },
          relationship: {
            type: 'string',
            example: 'Spouse',
          },
          phone: {
            type: 'string',
            example: '9876543210',
          },
        },
      },
      PatientInput: {
        type: 'object',
        required: ['firstName', 'lastName', 'gender', 'dob', 'phone', 'emergencyContact'],
        properties: {
          firstName: {
            type: 'string',
            example: 'John',
          },
          lastName: {
            type: 'string',
            example: 'Doe',
          },
          gender: {
            type: 'string',
            enum: ['Male', 'Female', 'Other'],
            example: 'Male',
          },
          dob: {
            type: 'string',
            format: 'date',
            example: '1990-05-15',
          },
          bloodGroup: {
            type: 'string',
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            example: 'O+',
          },
          phone: {
            type: 'string',
            example: '9998887776',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com',
          },
          address: {
            type: 'string',
            example: '123 Health Ave, Medical District',
          },
          emergencyContact: {
            $ref: '#/components/schemas/EmergencyContact',
          },
          allergies: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['Penicillin', 'Peanuts'],
          },
          medicalHistory: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['Hypertension'],
          },
          currentMedication: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['Lisinopril 10mg'],
          },
        },
      },
      PatientResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Patient registered successfully',
          },
          data: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '60d0fe4f5311236168a109cb',
              },
              patientId: {
                type: 'string',
                example: 'PAT-20260708-4829',
              },
              firstName: {
                type: 'string',
                example: 'John',
              },
              lastName: {
                type: 'string',
                example: 'Doe',
              },
              gender: {
                type: 'string',
                example: 'Male',
              },
              dob: {
                type: 'string',
                format: 'date-time',
                example: '1990-05-15T00:00:00.000Z',
              },
              age: {
                type: 'integer',
                example: 36,
              },
              bloodGroup: {
                type: 'string',
                example: 'O+',
              },
              phone: {
                type: 'string',
                example: '9998887776',
              },
              email: {
                type: 'string',
                example: 'john.doe@example.com',
              },
              address: {
                type: 'string',
                example: '123 Health Ave, Medical District',
              },
              emergencyContact: {
                $ref: '#/components/schemas/EmergencyContact',
              },
              allergies: {
                type: 'array',
                items: {
                  type: 'string',
                },
                example: ['Penicillin', 'Peanuts'],
              },
              medicalHistory: {
                type: 'array',
                items: {
                  type: 'string',
                },
                example: ['Hypertension'],
              },
              currentMedication: {
                type: 'array',
                items: {
                  type: 'string',
                },
                example: ['Lisinopril 10mg'],
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-07-08T20:14:42.000Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-07-08T20:14:42.000Z',
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error message description',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  example: 'email',
                },
                message: {
                  type: 'string',
                  example: 'Please provide a valid email address',
                },
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
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation failed',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/api/patients': {
      post: {
        summary: 'Register New Patient',
        description: 'Registers a new patient in the system. Accessible by Admin and Receptionist.',
        tags: ['Patient Management'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PatientInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Patient created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PatientResponse',
                },
              },
            },
          },
          400: {
            description: 'Validation failure or duplicate key entry',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized (Missing or invalid token)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          403: {
            description: 'Forbidden (Insufficient privileges or deactivated account)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        summary: 'Get All Patients / Search',
        description: 'Retrieves a list of all patients. Supports search filters (by patientId, name, phone, email), pagination, and sorting. Accessible by Admin, Receptionist, and Doctor.',
        tags: ['Patient Management'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Search string to match patientId, firstName, lastName, phone, or email',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'page',
            in: 'query',
            description: 'Page number for pagination',
            required: false,
            schema: {
              type: 'integer',
              default: 1,
            },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of items per page',
            required: false,
            schema: {
              type: 'integer',
              default: 10,
            },
          },
          {
            name: 'sortBy',
            in: 'query',
            description: 'Field to sort patients by',
            required: false,
            schema: {
              type: 'string',
              default: 'createdAt',
            },
          },
          {
            name: 'sortOrder',
            in: 'query',
            description: 'Order of sorting (asc or desc)',
            required: false,
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
              default: 'desc',
            },
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
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Patients retrieved successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/PatientResponse/properties/data',
                      },
                    },
                    pagination: {
                      type: 'object',
                      properties: {
                        total: {
                          type: 'integer',
                          example: 25,
                        },
                        page: {
                          type: 'integer',
                          example: 1,
                        },
                        limit: {
                          type: 'integer',
                          example: 10,
                        },
                        pages: {
                          type: 'integer',
                          example: 3,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'Forbidden',
          },
        },
      },
    },
    '/api/patients/{id}': {
      '/api/appointments': {
  post: {
    summary: 'Create Appointment',
    tags: ['Appointment Management'],
    security: [{ BearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'patient',
              'doctor',
              'appointmentDate'
            ],
            properties: {
              patient: {
                type: 'string',
                example: '64ae76e89f592df04b212d3e'
              },
              doctor: {
                type: 'string',
                example: '64ae76e89f592df04b212d55'
              },
              appointmentDate: {
                type: 'string',
                format: 'date-time',
                example: '2026-07-12T10:00:00.000Z'
              },
              reason: {
                type: 'string',
                example: 'Fever'
              },
              notes: {
                type: 'string',
                example: 'High fever'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Appointment created successfully'
      },
      400: {
        description: 'Validation Error'
      },
      401: {
        description: 'Unauthorized'
      }
    }
  },

  get: {
    summary: 'Get All Appointments',
    tags: ['Appointment Management'],
    security: [{ BearerAuth: [] }],
    responses: {
      200: {
        description: 'Appointments fetched successfully'
      }
    }
  }
},

'/api/appointments/{id}': {

  get: {
    summary: 'Get Appointment By ID',
    tags: ['Appointment Management'],
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Appointment found'
      }
    }
  },

  put: {
    summary: 'Update Appointment',
    tags: ['Appointment Management'],
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Appointment updated'
      }
    }
  },

  delete: {
    summary: 'Delete Appointment',
    tags: ['Appointment Management'],
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Appointment deleted'
      }
    }
  }
},

'/api/appointments/{id}/status': {
  patch: {
    summary: 'Update Appointment Status',
    tags: ['Appointment Management'],
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: [
                  'Scheduled',
                  'Completed',
                  'Cancelled'
                ],
                example: 'Completed'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Status Updated'
      }
    }
  }
}
      get: {
        summary: 'Get Patient By ID',
        description: 'Retrieves patient details by database object ID. Accessible by Admin, Receptionist, and Doctor.',
        tags: ['Patient Management'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The Patient database ObjectId',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Patient retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PatientResponse',
                },
              },
            },
          },
          400: {
            description: 'Invalid ID format',
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'Forbidden',
          },
          404: {
            description: 'Patient not found',
          },
        },
      },
      put: {
        summary: 'Update Patient Details',
        description: 'Updates details of an existing patient. Accessible by Admin and Receptionist.',
        tags: ['Patient Management'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The Patient database ObjectId',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PatientInput',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Patient updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PatientResponse',
                },
              },
            },
          },
          400: {
            description: 'Invalid request payload or ID format',
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'Forbidden',
          },
          404: {
            description: 'Patient not found',
          },
        },
      },
      delete: {
        summary: 'Delete Patient',
        description: 'Deletes a patient from the system. Accessible by Admin only.',
        tags: ['Patient Management'],
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The Patient database ObjectId',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Patient deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Patient deleted successfully',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid ID format',
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'Forbidden (Only Admin is allowed)',
          },
          404: {
            description: 'Patient not found',
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;
