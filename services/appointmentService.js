const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

/**
 * Create a new appointment
 */
const createAppointment = async (appointmentData) => {

    // Check if patient exists
    const patient = await Patient.findById(appointmentData.patient);

    if (!patient) {
        throw new Error("Patient not found");
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(appointmentData.doctor);

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    // Check if doctor already has an appointment at the same time
    const existingAppointment = await Appointment.findOne({
        doctor: appointmentData.doctor,
        appointmentDate: appointmentData.appointmentDate,
        status: "Scheduled",
    });

    if (existingAppointment) {
        throw new Error("This time slot is already booked");
    }

    const appointment = new Appointment(appointmentData);

    return await appointment.save();
};

/**
 * Get all appointments
 */
const getAllAppointments = async () => {

    const appointments = await Appointment.find()
        .populate("patient")
        .populate("doctor")
        .sort({ appointmentDate: 1 });

    return appointments;
};

/**
 * Get appointment by ID
 */
const getAppointmentById = async (id) => {

    const appointment = await Appointment.findById(id)
        .populate("patient")
        .populate("doctor");

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    return appointment;
};

/**
 * Update appointment
 */
const updateAppointment = async (id, updateData) => {

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    Object.keys(updateData).forEach((key) => {
        appointment[key] = updateData[key];
    });

    return await appointment.save();
};

/**
 * Delete appointment
 */
const deleteAppointment = async (id) => {

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    return appointment;
};

/**
 * Update appointment status
 */
const updateAppointmentStatus = async (id, status) => {

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    appointment.status = status;

    return await appointment.save();
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    updateAppointmentStatus,
};