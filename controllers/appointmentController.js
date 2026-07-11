const appointmentService = require("../services/appointmentService");
const Doctor = require("../models/Doctor");

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
        const queryParams = { ...req.query };

        // If logged-in user is a Doctor, restrict to their own appointments
        if (req.user.role === 'Doctor') {
            const doctorProfile = await Doctor.findOne({ user: req.user._id });
            if (!doctorProfile) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor profile not found",
                });
            }
            queryParams.doctor = doctorProfile._id.toString();
        }

        const result = await appointmentService.getAllAppointments(queryParams);

        res.status(200).json({
            success: true,
            message: "Appointments retrieved successfully",
            data: result.appointments,
            pagination: result.pagination,
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

        // If logged-in user is a Doctor, verify it is their own appointment
        if (req.user.role === 'Doctor') {
            const doctorProfile = await Doctor.findOne({ user: req.user._id });
            if (!doctorProfile || appointment.doctor._id.toString() !== doctorProfile._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "Not authorized to access this appointment",
                });
            }
        }

        res.status(200).json({
            success: true,
            message: "Appointment found successfully",
            data: appointment,
        });
    } catch (error) {
        if (error.message === 'Appointment not found') {
            res.status(404);
        }
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
        const appointment = await appointmentService.getAppointmentById(req.params.id);

        // If logged-in user is a Doctor, verify it is their own appointment
        if (req.user.role === 'Doctor') {
            const doctorProfile = await Doctor.findOne({ user: req.user._id });
            if (!doctorProfile || appointment.doctor._id.toString() !== doctorProfile._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "Not authorized to update status for this appointment",
                });
            }
        }

        const updatedAppointment = await appointmentService.updateAppointmentStatus(
            req.params.id,
            req.body.status
        );

        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            data: updatedAppointment,
        });
    } catch (error) {
        if (error.message === 'Appointment not found') {
            res.status(404);
        }
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