import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Car,
  Wrench,
  User,
  Phone,
  CheckCircle2,
} from "lucide-react";
import "./Appointment.css";
import axios from "axios";
const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    make: "",
    model: "",
    issue: "",
    date: "",
    time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Business Hours: Mon-Sat 9-7, Sun 10-4
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Generate slots based on selected date
    if (formData.date) {
      const d = new Date(formData.date);
      const day = d.getDay();
      let startHour = 9,
        endHour = 19; // 9am - 7pm
      if (day === 0) {
        // Sunday
        startHour = 10;
        endHour = 16; // 10am - 4pm
      }

      const slots = [];
      for (let i = startHour; i < endHour; i++) {
        const period = i >= 12 ? "PM" : "AM";
        const displayHour = i > 12 ? i - 12 : i === 0 ? 12 : i;
        slots.push(`${displayHour}:00 ${period}`);
        slots.push(`${displayHour}:30 ${period}`);
      }
      setAvailableSlots(slots);
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  }, [formData.date]);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments`,
        {
          name: formData.name,
          phone: formData.phone,
          make: formData.make,
          model: formData.model,
          issue: formData.issue,
          preferredDate: formData.date,
          preferredTime: formData.time,
        },
      );

      console.log(response.data);

      setIsSubmitting(false);
      setIsSuccess(true);

      // Optional WhatsApp redirect
      const summary = `
*Booking ID:* ${response.data.data.bookingId}

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Vehicle:* ${formData.make} ${formData.model}
*Issue:* ${formData.issue}
*Date:* ${formData.date}
*Time:* ${formData.time}
`;

      // Reset form
      setFormData({
        name: "",
        phone: "",
        make: "",
        model: "",
        issue: "",
        date: "",
        time: "",
      });
    } catch (error) {
      setIsSubmitting(false);

      alert(error.response?.data?.message || "Unable to book appointment.");

      console.error(error);
    }
  };

  return (
    <section className="appointment-page section-padding">
      <div className="container">
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <h1 className="section-title text-gradient">Schedule Service</h1>
          <p className="services-subtitle">
            Book your vehicle diagnostics or maintenance slot instantly
          </p>
        </div>

        {isSuccess ? (
          <motion.div
            className="success-message glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 size={64} color="#00FFEA" />
            <h2>Booking Confirmed</h2>
            <p>Thanks for booking appointment with us.</p>
            <button className="btn-primary" onClick={() => setIsSuccess(false)}>
              Book Another
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="appointment-form-wrapper glass-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-grid">
                {/* Personal Info */}
                <div className="form-group">
                  <label>
                    <User size={16} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Phone size={16} /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Vehicle Info */}
                <div className="form-group">
                  <label>
                    <Car size={16} /> Vehicle Make
                  </label>
                  <select
                    name="make"
                    required
                    value={formData.make}
                    onChange={handleChange}
                  >
                    <option value="">Select Brand</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Tata">Tata</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Kia">Kia</option>
                    <option value="Honda">Honda</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <Car size={16} /> Vehicle Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    required
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g. Creta"
                  />
                </div>

                <div className="form-group full-width">
                  <label>
                    <Wrench size={16} /> Primary Issue / Service Required
                  </label>
                  <input
                    type="text"
                    name="issue"
                    required
                    value={formData.issue}
                    onChange={handleChange}
                    placeholder="e.g. Periodic Maintenance, AC Not Cooling"
                  />
                </div>

                {/* Date & Time */}
                <div className="form-group">
                  <label>
                    <CalendarIcon size={16} /> Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Clock size={16} /> Preferred Time Slot
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    disabled={!formData.date}
                  >
                    <option value="">
                      {formData.date
                        ? "Select a time slot"
                        : "Select date first"}
                    </option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "PROCESSING..." : "CONFIRM APPOINTMENT"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Appointment;
