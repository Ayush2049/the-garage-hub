const appointmentEmailTemplate = (appointment) => {
  return `
🚗 NEW SERVICE APPOINTMENT

Booking ID : ${appointment.bookingId}

Submitted At : ${appointment.submittedAt.toLocaleString()}

----------------------------------

Customer Name : ${appointment.name}

Phone : ${appointment.phone}

Vehicle : ${appointment.make} ${appointment.model}

Issue : ${appointment.issue}

Preferred Date : ${new Date(
    appointment.preferredDate
  ).toDateString()}

Preferred Time : ${appointment.preferredTime}

----------------------------------

Status : ${appointment.status}

`;
};

export default appointmentEmailTemplate;