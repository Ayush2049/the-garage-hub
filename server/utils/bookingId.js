import Counter from "../models/Counter.js";

const getNextBookingId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    "appointmentCounter",
    {
      $inc: {
        sequenceValue: 1,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  return `CAR-${String(counter.sequenceValue).padStart(6, "0")}`;
};

export default getNextBookingId;