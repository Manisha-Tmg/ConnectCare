import React, { useState } from "react";
import "../css/BookCaretaker.css";

const BookingFormPreview = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 border-b">
        <button
          onClick={() => setActiveTab("form")}
          className={`py-2 px-4 ${
            activeTab === "form"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-500"
          }`}
        >
          Form View
        </button>
        <button
          onClick={() => setActiveTab("success")}
          className={`py-2 px-4 ${
            activeTab === "success"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-500"
          }`}
        >
          Success View
        </button>
      </div>

      <div className="booking-container">
        <div className="booking-header">
          <h2>Book Your Caretaker</h2>
          <p>Reliable care service at your convenience</p>
        </div>

        {activeTab === "success" || showSuccess ? (
          <div className="booking-success">
            <svg
              className="success-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z" />
            </svg>
            <h3>Booking Confirmed!</h3>
            <p>We'll reach out to finalize details.</p>
          </div>
        ) : (
          <form>
            <div className="form-section">
              <h3>Booking Details</h3>
              <div className="form-group">
                <label className="label" htmlFor="caretaker">
                  Caretaker
                </label>
                <input
                  type="text"
                  id="caretaker"
                  className="input"
                  placeholder="Select Caretaker"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="label" htmlFor="date">
                    Date
                  </label>
                  <input type="date" id="date" className="input" required />
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="time">
                    Preferred Time
                  </label>
                  <input type="time" id="time" className="input" required />
                </div>
              </div>
            </div>
            <div className="form-section">
              <h3>Location & Notes</h3>
              <div className="form-group">
                <label className="label" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="input"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="note">
                  Additional Note
                </label>
                <input
                  type="text"
                  id="note"
                  className="input"
                  placeholder="Any specific instructions"
                />
              </div>
            </div>
            <div className="booking-actions">
              <button
                type="button"
                className="booking-button"
                onClick={toggleSuccess}
              >
                {showSuccess ? "Edit Booking" : "Confirm Booking"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingFormPreview;
