import Appointment from "../models/Appointment.js";
import getNextBookingId from "../utils/bookingId.js";
import { sendAppointmentEmail } from "./email.service.js";

export const createAppointmentService = async (appointmentData) => {
  const bookingId = await getNextBookingId();

  const appointment = await Appointment.create({
    bookingId,
    ...appointmentData,
  });

  await sendAppointmentEmail(appointment);

  return appointment;
};