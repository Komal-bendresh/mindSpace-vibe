import { useState, useEffect } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import loginPageimg from '../assets/loginPageimg.jpeg';
import { useAuth } from '../context/AuthContext';



export default function Login() {
  const [email, setEmail] = useState('');
  const { setIsAuthenticated } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Inject the CSS styles into the document head
    const style = document.createElement('style');
    style.textContent = `
      @keyframes move {
        100% {
          transform: translate3d(0, 0, 1px) rotate(360deg);
        }
      }

      @keyframes glow {
        0% { box-shadow: 0 0 20px rgba(228, 90, 132, 0.3), 0 0 40px rgba(88, 60, 135, 0.2); }
        50% { box-shadow: 0 0 40px rgba(228, 90, 132, 0.6), 0 0 80px rgba(88, 60, 135, 0.4); }
        100% { box-shadow: 0 0 20px rgba(228, 90, 132, 0.3), 0 0 40px rgba(88, 60, 135, 0.2); }
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(1deg); }
        66% { transform: translateY(5px) rotate(-1deg); }
      }

      .animated-background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: #170a29;
        overflow: hidden;
        // z-index: -1;
      }

      .animated-background span {
        width: 20vmin;
        height: 20vmin;
        border-radius: 20vmin;
        backface-visibility: hidden;
        position: absolute;
        animation: move linear infinite;
      }

      .login-card {
        backdrop-filter: blur(20px);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        animation: float 6s ease-in-out infinite;
      }

      .login-card:hover {
        animation: glow 2s ease-in-out infinite, float 6s ease-in-out infinite;
        transform: translateY(-5px) scale(1.02);
        border: 1px solid rgba(228, 90, 132, 0.4);
      }

      .shimmer-button {
        background: linear-gradient(45deg, #E45A84, #583C87, #E45A84);
        background-size: 200% 200%;
        animation: shimmer 2s linear infinite;
      }

      .shimmer-button:hover {
        animation: shimmer 1s linear infinite;
      }

      .image-section {
        background: linear-gradient(135deg, rgba(228, 90, 132, 0.2), rgba(88, 60, 135, 0.2));
        backdrop-filter: blur(15px);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
      }

      .animated-background span:nth-child(1) {
        color: #E45A84;
        top: 31%;
        left: 72%;
        animation-duration: 8s;
        animation-delay: -49s;
        transform-origin: 10vw -11vh;
        box-shadow: 40vmin 0 5.443022193748443vmin currentColor;
      }
      .animated-background span:nth-child(2) {
        color: #583C87;
        top: 51%;
        left: 20%;
        animation-duration: 7s;
        animation-delay: -4s;
        transform-origin: 15vw -16vh;
        box-shadow: 40vmin 0 5.340852225462916vmin currentColor;
      }
      .animated-background span:nth-child(3) {
        color: #FFACAC;
        top: 29%;
        left: 64%;
        animation-duration: 13s;
        animation-delay: -9s;
        transform-origin: -24vw -22vh;
        box-shadow: -40vmin 0 5.936160788152254vmin currentColor;
      }
      .animated-background span:nth-child(4) {
        color: #583C87;
        top: 6%;
        left: 63%;
        animation-duration: 47s;
        animation-delay: -14s;
        transform-origin: -8vw -20vh;
        box-shadow: 40vmin 0 5.2814456262562395vmin currentColor;
      }
      .animated-background span:nth-child(5) {
        color: #E45A84;
        top: 84%;
        left: 57%;
        animation-duration: 12s;
        animation-delay: -50s;
        transform-origin: 15vw 2vh;
        box-shadow: -40vmin 0 5.406408210646164vmin currentColor;
      }
      .animated-background span:nth-child(6) {
        color: #583C87;
        top: 17%;
        left: 36%;
        animation-duration: 18s;
        animation-delay: -35s;
        transform-origin: -12vw 3vh;
        box-shadow: -40vmin 0 5.059890716988861vmin currentColor;
      }
      .animated-background span:nth-child(7) {
        color: #E45A84;
        top: 95%;
        left: 41%;
        animation-duration: 45s;
        animation-delay: -1s;
        transform-origin: -1vw -4vh;
        box-shadow: 40vmin 0 5.373697794918257vmin currentColor;
      }
      .animated-background span:nth-child(8) {
        color: #583C87;
        top: 63%;
        left: 49%;
        animation-duration: 50s;
        animation-delay: -34s;
        transform-origin: 21vw 8vh;
        box-shadow: -40vmin 0 5.923449114329115vmin currentColor;
      }
      .animated-background span:nth-child(9) {
        color: #583C87;
        top: 85%;
        left: 94%;
        animation-duration: 11s;
        animation-delay: -28s;
        transform-origin: -23vw 21vh;
        box-shadow: -40vmin 0 5.718048375853231vmin currentColor;
      }
      .animated-background span:nth-child(10) {
        color: #E45A84;
        top: 42%;
        left: 91%;
        animation-duration: 55s;
        animation-delay: -21s;
        transform-origin: -9vw 9vh;
        box-shadow: -40vmin 0 5.16664311945487vmin currentColor;
      }
      .animated-background span:nth-child(11) {
        color: #583C87;
        top: 32%;
        left: 70%;
        animation-duration: 28s;
        animation-delay: -21s;
        transform-origin: 21vw 4vh;
        box-shadow: 40vmin 0 5.794145077298174vmin currentColor;
      }
      .animated-background span:nth-child(12) {
        color: #583C87;
        top: 32%;
        left: 75%;
        animation-duration: 17s;
        animation-delay: -45s;
        transform-origin: -10vw -20vh;
        box-shadow: -40vmin 0 5.016422909282457vmin currentColor;
      }
      .animated-background span:nth-child(13) {
        color: #E45A84;
        top: 42%;
        left: 6%;
        animation-duration: 35s;
        animation-delay: -12s;
        transform-origin: -3vw 12vh;
        box-shadow: 40vmin 0 5.029522875247494vmin currentColor;
      }
      .animated-background span:nth-child(14) {
        color: #583C87;
        top: 30%;
        left: 47%;
        animation-duration: 12s;
        animation-delay: -20s;
        transform-origin: -22vw 3vh;
        box-shadow: 40vmin 0 5.162362772973115vmin currentColor;
      }
      .animated-background span:nth-child(15) {
        color: #FFACAC;
        top: 93%;
        left: 86%;
        animation-duration: 49s;
        animation-delay: -44s;
        transform-origin: 10vw -3vh;
        box-shadow: -40vmin 0 5.789048200117879vmin currentColor;
      }
      .animated-background span:nth-child(16) {
        color: #FFACAC;
        top: 43%;
        left: 28%;
        animation-duration: 18s;
        animation-delay: -37s;
        transform-origin: -10vw -8vh;
        box-shadow: -40vmin 0 5.481083326005692vmin currentColor;
      }
      .animated-background span:nth-child(17) {
        color: #583C87;
        top: 70%;
        left: 90%;
        animation-duration: 40s;
        animation-delay: -46s;
        transform-origin: 8vw -13vh;
        box-shadow: -40vmin 0 5.084954684583914vmin currentColor;
      }
      .animated-background span:nth-child(18) {
        color: #E45A84;
        top: 78%;
        left: 43%;
        animation-duration: 36s;
        animation-delay: -5s;
        transform-origin: -11vw -14vh;
        box-shadow: 40vmin 0 5.926307749481982vmin currentColor;
      }
      .animated-background span:nth-child(19) {
        color: #FFACAC;
        top: 61%;
        left: 97%;
        animation-duration: 51s;
        animation-delay: -4s;
        transform-origin: 15vw 8vh;
        box-shadow: -40vmin 0 5.083111939749025vmin currentColor;
      }
      .animated-background span:nth-child(20) {
        color: #583C87;
        top: 74%;
        left: 42%;
        animation-duration: 40s;
        animation-delay: -3s;
        transform-origin: -21vw -13vh;
        box-shadow: -40vmin 0 5.314145850267377vmin currentColor;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
  setIsAuthenticated(true);
  navigate('/');  
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Animated Background */}
      <div className="animated-background">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* Login Container */}
      <div className="min-h-screen flex items-center justify-center p-4" style={{ position: 'relative', zIndex: 1 }}>
        <div 
          className="login-card"
          style={{
            width: '900px',
            maxWidth: '90vw',
            height: '600px',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            boxShadow: '0 25px 45px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Left Image Section */}
          <div 
            className="image-section"
            style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '600px'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}>
              {/* Placeholder for your image */}
              <div style={{
                width: '300px',
                height: '300px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(228, 90, 132, 0.3), rgba(88, 60, 135, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                
                <img 
                  src={loginPageimg} 
                  alt="Login Illustration"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '18px'
                  }}
                />
              </div>
              <h3 style={{
                color: 'white',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                Welcome Back!
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                fontSize: '16px',
                lineHeight: '1.5'
              }}>
                Login to continue your amazing journey with us
              </p>
            </div>
          </div>

          {/* Right Form Section */}
          <div style={{
            flex: '1',
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '40px',
              textAlign: 'center',
              color: 'white',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}>
              Login
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#E45A84';
                    e.target.style.boxShadow = '0 0 20px rgba(228, 90, 132, 0.3)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  required
                />
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#E45A84';
                    e.target.style.boxShadow = '0 0 20px rgba(228, 90, 132, 0.3)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  required
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                className="shimmer-button"
                style={{
                  width: '100%',
                  padding: '18px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 8px 25px rgba(228, 90, 132, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(228, 90, 132, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'scale(1) translateY(0px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(228, 90, 132, 0.3)';
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
              
              {error && (
                <div style={{
                  color: '#FFB3B3',
                  textAlign: 'center',
                  background: 'rgba(239, 68, 68, 0.15)',
                  padding: '15px',
                  borderRadius: '12px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  {error}
                </div>
              )}
              
              <div style={{
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <a href="#" style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#E45A84';
                  e.target.style.textShadow = '0 0 10px rgba(228, 90, 132, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.textShadow = 'none';
                }}>
                  Forgot your password?
                </a>
                {error && (
  <div style={{ color: 'salmon', textAlign: 'center', marginTop: '10px' }}>
    {error}
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}