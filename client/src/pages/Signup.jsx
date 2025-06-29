import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api/auth';
import signupImage from '../assets/signupPageImg.jpg';


export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signupUser(formData);
         navigate('/verify-otp', { state: formData  });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-background flex items-center justify-center p-4">
      <style >{`
        .gradient-background {
          background: linear-gradient(301deg, #51557e, #816797, #d6d5a8);
          background-size: 300% 300%;
          animation: gradient-animation 5s ease infinite;
        }

        @keyframes gradient-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .glass-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), 
                      0 0 40px rgba(255, 255, 255, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.4);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .glass-effect:hover::before {
          left: 100%;
        }

        .glass-input {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .glass-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.18);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .glass-input:hover:not(:focus) {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
        }

        .glass-button {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
background: linear-gradient(90deg,rgba(169, 139, 201, 1) 0%, rgba(162, 198, 235, undefined) 17%, rgba(95, 123, 163, 1) 34%);          // background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .glass-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          transition: all 0.6s ease;
          transform: translate(-50%, -50%);
        }

        .glass-button:hover:not(:disabled) {
        background: 
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2),
                      0 0 30px rgba(255, 255, 255, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        .glass-button:hover:not(:disabled)::before {
          width: 300px;
          height: 300px;
        }

        .glass-button:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .glass-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .image-container {
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
          pointer-events: none;
        }
      `}</style>
      
      <div className="max-w-4xl w-full glass-effect rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-white text-center drop-shadow-lg">
          Sign Up
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Static Image */}
      
          <div className="hidden lg:flex items-center justify-center">
            
            <div className="">
              <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center">
                <div className="text-center text-white/70">
                     <img src={signupImage} alt="healing"  className=" rounded-xl w-full h-96"/>
                   </div>
              </div>
            </div>
          </div>

          {/* Right side - Form Fields */}
          <div className="space-y-6 mt-6">
            <input 
              name="name" 
              placeholder="Full Name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-4 glass-input rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 transition-all duration-300" 
              required 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-4 glass-input rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 transition-all duration-300" 
              required 
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-4 glass-input rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 transition-all duration-300" 
              required 
            />
            <button 
              onClick={handleSubmit}
              className="w-full glass-button text-white font-semibold py-4 rounded-lg bg-gradient-to-r from-purple-50 to-violet-300" 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
            {error && (
              <p className="text-red-200 bg-red-500/20 p-3 rounded-lg backdrop-blur-sm border border-red-300/30 text-center">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}