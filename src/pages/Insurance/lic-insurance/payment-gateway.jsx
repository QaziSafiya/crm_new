// src/PaymentGateway.js
import React, { useState } from 'react';
import { CheckCircle } from 'feather-icons-react';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import Header from './header';

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setShowOtpInput(true); // Display OTP input on payment button click
  };

  const handleOtpSubmit = () => {
    setProcessingPayment(true); // Start processing payment
    // Simulate payment processing with a delay (replace with actual logic)
    setTimeout(() => {
      setProcessingPayment(false); // Stop processing payment
      setPaymentSuccess(true); // Mark payment as successful
    }, 2000);
  };

  return (
    <div className="container">
    <Sidebar />
    <div className="main">
      <Topbar />
      <div className="inner-container">
      <Header />
    <div className="flex justify-center mt-14">
       
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4 bg-blue-500 text-white pl-3 h-16 flex items-center">Payment Details</h2>

        {paymentSuccess ? (
          <div className="text-green-600 text-center">
            <CheckCircle size={48} className="mx-auto mb-4" />
            Payment Successful!
          </div>
        ) : showOtpInput ? (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Enter OTP</h3>
            <input
              type="text"
              className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300 "
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button
              type="button"
              onClick={handleOtpSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              disabled={processingPayment}
            >
              {processingPayment ? 'Processing...' : 'Submit OTP'}
            </button>
          </div>
        ) : (
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 border-blue-500"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              disabled={processingPayment}
            >
              {processingPayment ? 'Processing...' : 'Pay'}
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
    </div>
    </div>

  );
};

export default PaymentGateway;
