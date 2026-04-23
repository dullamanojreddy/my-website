import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { submitContact } from "../services/api";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  message: ""
};

function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [showSuccessPulse, setShowSuccessPulse] = useState(false);

  useEffect(() => {
    if (!showSuccessPulse) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setShowSuccessPulse(false);
    }, 2200);

    return () => window.clearTimeout(timerId);
  }, [showSuccessPulse]);

  const validateForm = () => {
    const currentErrors = {};

    if (!formData.name.trim()) {
      currentErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      currentErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      currentErrors.email = "Please enter a valid email address.";
    }

    if (!formData.mobile.trim()) {
      currentErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      currentErrors.mobile = "Mobile number must be exactly 10 digits.";
    }

    if (!formData.message.trim()) {
      currentErrors.message = "Message is required.";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerMessage("");
    setSubmitState("idle");
    setShowSuccessPulse(false);

    if (!validateForm()) {
      setSubmitState("error");
      return;
    }

    try {
      setSubmitting(true);
      const response = await submitContact(formData);
      setServerMessage(response.data.message || "Submitted successfully.");
      setFormData(initialForm);
      setSubmitState("success");
      setShowSuccessPulse(true);
    } catch (requestError) {
      const apiErrors = requestError.response?.data?.errors;

      if (apiErrors?.length) {
        setServerMessage(apiErrors[0].msg);
      } else {
        setServerMessage("Unable to submit details right now. Please try later.");
      }
      setSubmitState("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-wrap">
      <div className="contact-layout card-surface">
        <div className="contact-panel">
          <h2>Let&apos;s build something valuable.</h2>
          <p className="muted-text">
            Share your requirements and I&apos;ll respond with a clear execution roadmap.
          </p>
          <div className="contact-orb" />
        </div>
        <form
          className={`contact-form ${submitState === "error" ? "form-error" : ""}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="field">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Name</label>
            {errors.name && <small className="field-error">{errors.name}</small>}
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Email</label>
            {errors.email && <small className="field-error">{errors.email}</small>}
          </div>

          <div className="field">
            <input
              type="text"
              name="mobile"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Mobile</label>
            {errors.mobile && <small className="field-error">{errors.mobile}</small>}
          </div>

          <div className="field">
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
            />
            <label>Message</label>
            {errors.message && <small className="field-error">{errors.message}</small>}
          </div>

          <button className="btn primary submit-btn" type="submit" disabled={submitting}>
            {submitting ? "Sending..." : submitState === "success" ? "Sent" : "Send Message"}
          </button>

          {showSuccessPulse && (
            <div className="success-pulse" role="status" aria-live="polite">
              <span className="success-check" aria-hidden="true">
                <FiCheck />
              </span>
              <strong>Message sent</strong>
            </div>
          )}

          {serverMessage && (
            <p className={`form-message ${submitState === "success" ? "success" : "error"}`}>
              {serverMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;