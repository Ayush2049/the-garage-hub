import Appointment from "../models/Appointment.js";
import getNextBookingId from "../utils/bookingId.js";
import { sendAppointmentEmail } from "./email.service.js";

export const createAppointmentService = async (appointmentData) => {
  // Generate Booking ID
  const bookingId = await getNextBookingId();

  // Save Appointment
  const appointment = await Appointment.create({
    bookingId,
    ...appointmentData,
  });

  console.log("✅ Appointment Saved:", appointment.bookingId);

  // Send Email (Don't fail booking if email fails)
  try {
    await sendAppointmentEmail(appointment);
    console.log("✅ Email Sent");
  } catch (error) {
    console.error("❌ Email Error:", error.message);
  }

  return appointment;
};