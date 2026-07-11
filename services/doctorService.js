const Doctor = require('../models/Doctor');
const User = require('../models/User');

/**
 * Create a new Doctor (Creates User and Doctor Profile)
 */
const createDoctor = async (doctorData) => {
  // Create User with role 'Doctor'
  const user = new User({
    fullName: doctorData.fullName,
    email: doctorData.email,
    password: doctorData.password,
    phone: doctorData.phone,
    role: 'Doctor',
    status: 'Active',
  });

  const savedUser = await user.save();

  // Create Doctor Profile referencing the created User
  const doctorProfile = new Doctor({
    user: savedUser._id,
    specialization: doctorData.specialization,
    licenseNumber: doctorData.licenseNumber,
    experienceYears: doctorData.experienceYears,
    consultationFee: doctorData.consultationFee,
    availableDays: doctorData.availableDays || [],
    startTime: doctorData.startTime || '09:00',
    endTime: doctorData.endTime || '17:00',
    slotDuration: doctorData.slotDuration || 30,
    isAvailable: doctorData.isAvailable !== undefined ? doctorData.isAvailable : true,
    bio: doctorData.bio,
  });

  try {
    return await doctorProfile.save();
  } catch (error) {
    // If doctor profile fails to save, rollback user creation
    await User.findByIdAndDelete(savedUser._id);
    throw error;
  }
};

/**
 * Get all doctors with search, filtering, and pagination
 */
const getAllDoctors = async (queryParams) => {
  const {
    search,
    specialization,
    page = 1,
    limit = 10,
  } = queryParams;

  const filter = {};

  // Search by doctor name or specialization or email
  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i');
    // Query users collection for matching fullName
    const matchingUsers = await User.find({
      role: 'Doctor',
      fullName: searchRegex,
    }).select('_id');
    
    const userIds = matchingUsers.map((u) => u._id);

    filter.$or = [
      { user: { $in: userIds } },
      { specialization: searchRegex },
    ];
  } else if (specialization) {
    filter.specialization = new RegExp(specialization.trim(), 'i');
  }

  // Pagination setup
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skipNum = (pageNum - 1) * limitNum;

  const [total, doctors] = await Promise.all([
    Doctor.countDocuments(filter),
    Doctor.find(filter)
      .populate('user')
      .skip(skipNum)
      .limit(limitNum),
  ]);

  return {
    doctors,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

/**
 * Get doctor by ID
 */
const getDoctorById = async (id) => {
  const doctor = await Doctor.findById(id).populate('user');
  if (!doctor) {
    throw new Error('Doctor profile not found');
  }
  return doctor;
};

/**
 * Update doctor details (profile and user table fields)
 */
const updateDoctor = async (id, updateData) => {
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    throw new Error('Doctor profile not found');
  }

  // Update profile fields
  const doctorFields = [
    'specialization',
    'licenseNumber',
    'experienceYears',
    'consultationFee',
    'availableDays',
    'startTime',
    'endTime',
    'slotDuration',
    'isAvailable',
    'bio',
  ];

  doctorFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      doctor[field] = updateData[field];
    }
  });

  await doctor.save();

  // If user fields need updating
  const userFields = ['fullName', 'phone', 'email'];
  const userUpdate = {};
  userFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      userUpdate[field] = updateData[field];
    }
  });

  if (Object.keys(userUpdate).length > 0) {
    await User.findByIdAndUpdate(doctor.user, userUpdate, {
      new: true,
      runValidators: true,
    });
  }

  return await Doctor.findById(id).populate('user');
};

/**
 * Delete doctor profile and user
 */
const deleteDoctor = async (id) => {
  const doctor = await Doctor.findByIdAndDelete(id);
  if (!doctor) {
    throw new Error('Doctor profile not found');
  }

  // Delete the referenced user document
  await User.findByIdAndDelete(doctor.user);

  return doctor;
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
