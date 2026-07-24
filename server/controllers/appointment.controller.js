import { createAppointmentService } from "../services/appointment.service.js";

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await createAppointmentService(req.body);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};