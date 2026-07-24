import transporter from "../config/mail.js";
import appointmentEmailTemplate from "../utils/emailTemplate.js";

export const sendAppointmentEmail = async (appointment) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: process.env.EMAIL_USER,

    subject: `🚗 New Appointment (${appointment.bookingId})`,

    text: appointmentEmailTemplate(appointment),
  });
};