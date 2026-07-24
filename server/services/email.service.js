import resend from "../config/mail.js";

export const sendAppointmentEmail = async (appointment) => {
  const { data, error } = await resend.emails.send({
    from: "Garage Hub <onboarding@resend.dev>",

    // This is YOUR Gmail inbox
    to: [process.env.EMAIL_USER],

    subject: `New Appointment ${appointment.bookingId}`,

    html: `
      <h2>New Appointment Received</h2>

      <p><b>Booking ID:</b> ${appointment.bookingId}</p>
      <p><b>Name:</b> ${appointment.name}</p>
      <p><b>Phone:</b> ${appointment.phone}</p>
      <p><b>Vehicle:</b> ${appointment.make} ${appointment.model}</p>
      <p><b>Issue:</b> ${appointment.issue}</p>
      <p><b>Date:</b> ${appointment.preferredDate}</p>
      <p><b>Time:</b> ${appointment.preferredTime}</p>
    `,
  });

  if (error) {
    throw error;
  }

  console.log("Email sent:", data);
};