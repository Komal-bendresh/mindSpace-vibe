import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { verifyOtp } from '../api/auth';

const VerifyOtp = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Get email from location state or sessionStorage
  useEffect(() => {
    const fromSignup = location.state?.email;
    if (fromSignup) {
      setEmail(fromSignup);
      sessionStorage.setItem("pendingSignupEmail", fromSignup);
    } else {
      const saved = sessionStorage.getItem("pendingSignupEmail");
      if (saved) setEmail(saved);
    }
  }, [location]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp });
      toast.success(res.data.message);
      sessionStorage.removeItem("pendingSignupEmail");
      window.location.href = '/';
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!email) {
      toast.warn("Email missing. Please signup again.");
      return;
    }

    try {
      const res = await axios.post('/api/auth/resend-otp', { email });
      toast.success(res.data.message || "OTP resent");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resending OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          className="w-full mt-2 text-sm text-blue-600 underline"
          onClick={handleResend}
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
