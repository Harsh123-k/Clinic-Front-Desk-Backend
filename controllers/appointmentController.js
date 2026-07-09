const appointmentService = require("../services/appointmentService");

/**
 * Create Appointment
 */
const createAppointment = async (req, res, next) => {
    try {
        const appointment = await appointmentService.createAppointment(req.body);

        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: appointment,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get All Appointments
 */
const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await appointmentService.getAllAppointments();

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get Appointment By ID
 */
const getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await appointmentService.getAppointmentById(req.params.id);

        res.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update Appointment
 */
const updateAppointment = async (req, res, next) => {
    try {
        const appointment = await appointmentService.updateAppointment(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: appointment,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Appointment
 */
const deleteAppointment = async (req, res, next) => {
    try {
        await appointmentService.deleteAppointment(req.params.id);

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update Appointment Status
 */
const updateAppointmentStatus = async (req, res, next) => {
    try {
        const appointment = await appointmentService.updateAppointmentStatus(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            data: appointment,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    updateAppointmentStatus,
};