import transporter from "../config/mail.js";
import appointmentEmailTemplate from "../utils/emailTemplate.js";

export const sendAppointmentEmail = async (appointment) => {
  const mailOptions = {
    from: `"Garage Hub" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🚗 New Appointment - ${appointment.bookingId}`,
    text: appointmentEmailTemplate(appointment),
  };

  return transporter.sendMail(mailOptions);
};