const Patient = require('../models/Patient');

/**
 * Create a new patient
 * @param {Object} patientData - Patient data
 * @returns {Promise<Object>} Created patient
 */
const createPatient = async (patientData) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

/**
 * Get all patients with pagination, sorting, and search filtering
 * @param {Object} queryParams - Query parameters from request
 * @returns {Promise<Object>} List of patients with pagination metadata
 */
const getAllPatients = async (queryParams) => {
  const {
    search,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = queryParams;

  const filter = {};

  // If search query is provided
  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i');
    filter.$or = [
      { patientId: searchRegex },
      { firstName: searchRegex },
      { lastName: searchRegex },
      { phone: searchRegex },
      { email: searchRegex },
    ];

    // Check if search contains a space, potentially split into firstName and lastName search
    const searchTerms = search.trim().split(/\s+/);
    if (searchTerms.length > 1) {
      filter.$or.push({
        $and: [
          { firstName: new RegExp(searchTerms[0], 'i') },
          { lastName: new RegExp(searchTerms[1], 'i') },
        ],
      });
    }
  }

  // Set up pagination variables
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skipNum = (pageNum - 1) * limitNum;

  // Sorting
  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sortOption = { [sortBy]: sortDirection };

  // Fetch count and data in parallel
  const [total, patients] = await Promise.all([
    Patient.countDocuments(filter),
    Patient.find(filter)
      .sort(sortOption)
      .skip(skipNum)
      .limit(limitNum),
  ]);

  return {
    patients,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

/**
 * Get a single patient by ID
 * @param {string} id - Database ObjectId of patient
 * @returns {Promise<Object>} Patient document
 */
const getPatientById = async (id) => {
  const patient = await Patient.findById(id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

/**
 * Update patient details
 * @param {string} id - Database ObjectId of patient
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated patient document
 */
const updatePatient = async (id, updateData) => {
  // Find the patient first to trigger mongoose hooks on save, or use findByIdAndUpdate.
  // Using find and save is better because it triggers pre('save') hooks (updating age if dob is updated).
  const patient = await Patient.findById(id);
  if (!patient) {
    throw new Error('Patient not found');
  }

  // Update fields
  Object.keys(updateData).forEach((key) => {
    // If field is an object (like emergencyContact), merge it or overwrite it
    if (key === 'emergencyContact' && typeof updateData[key] === 'object') {
      patient.emergencyContact = { ...patient.emergencyContact, ...updateData[key] };
    } else {
      patient[key] = updateData[key];
    }
  });

  return await patient.save();
};

/**
 * Delete a patient by ID
 * @param {string} id - Database ObjectId of patient
 * @returns {Promise<Object>} Deleted patient document
 */
const deletePatient = async (id) => {
  const patient = await Patient.findByIdAndDelete(id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
