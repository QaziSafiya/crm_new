import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.js";

const OTPPage = ({ onLogin }) => {
  const [gstin, setGstin] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOTP] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [gstinError, setGstinError] = useState("");

  const isValidGSTIN = (gstin) => {
    // Basic GSTIN format validation (adjust this based on actual rules)
    const gstinPattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
    return gstinPattern.test(gstin);
  };

  const handleGenerateOTP = async () => {
    // Validation for GSTIN format
    if (!isValidGSTIN(gstin)) {
      setGstinError("Invalid GSTIN format");
      return;
    } else {
      setGstinError(""); // Clear the error message if GSTIN is valid
    }

    try {
      const response = await axios.post(`${BASE_URL}/gst/tax-payer/generate-otp`, {
        gstin,
        username,
      });

      if (response.data.success) {
        setOtpGenerated(true);
      }
    } catch (error) {
      setOtpGenerated(true);
      console.error("Error generating OTP:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/gst/tax-payer/verify-otp`, {
        gstin,
        username,
        otp,
      });

      if (response.data.success) {
        setVerificationStatus("OTP verified successfully!");
        onLogin(true);
      } else {
        setVerificationStatus("OTP verification failed. Please check the OTP and try again.");
        onLogin(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      onLogin(false);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-2/4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {!otpGenerated ? (
          <div className="space-y-4">
            <label htmlFor="gstin">GSTIN</label>
            <input
              type="text"
              id="gstin"
              placeholder="Enter GSTIN"
              className={`w-full p-2 rounded border ${gstinError ? 'border-red-500' : ''}`}
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
            {gstinError && <p className="text-red-500">{gstinError}</p>}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              className="w-full p-2 rounded border"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleGenerateOTP}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Generate OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              className="w-full p-2 rounded border"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Verify OTP
            </button>
          </div>
        )}
        {verificationStatus && (
          <p className="text-center mt-4 text-green-500">{verificationStatus}</p>
        )}
      </div>
    </div>
  );
};

export default OTPPage;
