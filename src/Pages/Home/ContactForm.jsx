import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { submitContactForm } from "../../Redux/Contact";

function ContactForm() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    options: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.options ||
      !formData.message
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Submit the form
    const result = await dispatch(submitContactForm(formData));

    if (result.payload && !result.error) {
      setSubmitted(true);
      // Reset form after successful submission
      setFormData({
        full_name: "",
        email: "",
        options: "",
        message: "",
      });
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf5ef]">
      <Header />

      <main className="flex-1 flex justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-md border border-[#f0e3d4] p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#273338] mb-6">
            Contact us
          </h1>

          {/* Success Message */}
          {submitted && success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#273338]">Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e3ddd4] bg-[#fbf8f4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c7a5c] focus:border-transparent"
                placeholder=""
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#273338]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e3ddd4] bg-[#fbf8f4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c7a5c] focus:border-transparent"
                placeholder=""
                disabled={loading}
              />
            </div>

            {/* Topic dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#273338]">
                How can we help you?
              </label>
              <select
                name="options"
                value={formData.options}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e3ddd4] bg-[#fbf8f4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c7a5c] focus:border-transparent"
                disabled={loading}
              >
                <option value="" disabled>
                  Please choose an option
                </option>
                <option>I can not register</option>
                <option>I can not log in</option>
                <option>I have a technical issue</option>
                <option>I was charged twice</option>
                <option>Cancellation request</option>
                <option>Refund request</option>
                <option>Partnerships and business inquiries</option>
                <option>Feedback and suggestions</option>
                <option>General inquiry</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#273338]">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full rounded-lg border border-[#e3ddd4] bg-[#fbf8f4] px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0c7a5c] focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`mt-2 w-full rounded-full text-white text-sm font-semibold py-2.5 transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#634910] hover:bg-[#533d0d]"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContactForm;
