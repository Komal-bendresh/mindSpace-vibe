import React, { useState, useEffect } from 'react';
import { Heart, Brain, BookOpen, TrendingUp, Mail, Sparkles, CheckCircle, Star, Zap, BarChart3 } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [colorPhase, setColorPhase] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const colorTimer = setInterval(() => {
      setColorPhase(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(colorTimer);
  }, []);

  useEffect(() => {
    const featureTimer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(featureTimer);
  }, []);

  const getColors = () => {
    switch(colorPhase) {
      case 0: return {
        primary: '#87CEEB',
        secondary: '#B0E0E6',
        glow: '#87CEEB',
        gradient: 'from-sky-300 to-blue-300'
      };
      case 1: return {
        primary: '#90EE90',
        secondary: '#98FB98',
        glow: '#90EE90',
        gradient: 'from-green-300 to-emerald-300'
      };
      case 2: return {
        primary: '#FFB6C1',
        secondary: '#FFC0CB',
        glow: '#FFB6C1',
        gradient: 'from-pink-300 to-rose-300'
      };
      case 3: return {
        primary: '#FFFFE0',
        secondary: '#FFFACD',
        glow: '#FFFFE0',
        gradient: 'from-yellow-200 to-yellow-300'
      };
      case 4: return {
        primary: '#FFE4B5',
        secondary: '#FFDAB9',
        glow: '#FFE4B5',
        gradient: 'from-orange-200 to-orange-300'
      };
      case 5: return {
        primary: '#FFB6C1',
        secondary: '#FFA07A',
        glow: '#FFB6C1',
        gradient: 'from-red-200 to-red-300'
      };
      default: return {
        primary: '#87CEEB',
        secondary: '#B0E0E6',
        glow: '#87CEEB',
        gradient: 'from-sky-300 to-blue-300'
      };
    }
  };

  const colors = getColors();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Emotionally Aware AI",
      subtitle: "Not Just ChatGPT", 
      description: "Unlike general AI tools, MindSpace's chatbot understands your mood, patterns, and triggers. It gives mental health-friendly responses, with a calming tone, affirmations, and self-care suggestions.",
      quote: "You've been feeling anxious lately. Would you like a grounding exercise?",
      gradient: "from-purple-400 via-pink-400 to-red-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Your Mood Over Time",
      subtitle: "Powerful Insights",
      description: "Get powerful insights from your own emotions: Mood trends over weeks, emotion frequency pie charts, keyword word clouds from journals.",
      quote: "See what you feel most, and why.",
      gradient: "from-blue-400 via-purple-400 to-pink-400"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Journaling That Understands You",
      subtitle: "AI-Powered Reflection",
      description: "Write daily thoughts, tag emotions, attach photos or voice notes, and get personalized reflections. Your journal becomes your mirror — backed by AI.",
      quote: "Your thoughts matter. Let's explore them together.",
      gradient: "from-green-400 via-blue-400 to-purple-400"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Weekly Wellness Nudges",
      subtitle: "Stay Consistent",
      description: "Stay consistent with weekly email insights and mood streak tracking.",
      quote: "Small nudges. Big emotional growth.",
      gradient: "from-yellow-400 via-orange-400 to-red-400"
    }
  ];

  const freeFeatures = [
    "Mood Tracking",
    "Journaling", 
    "AI Chat",
    "Weekly Mood Report",
    "Self-Affirmation Generator"
  ];

  const premiumFeatures = [
    "Unlimited Chat & Journals",
    "Save Mood-Boost Playlists", 
    "AI Habit Suggestions",
    "Relationship Emotion Tracker"
  ];

  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      {/* Hero Section with Lamp Effect */}
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full">
        {/* Lamp Container */}
        <div className="relative flex w-full flex-1 items-center justify-center scale-y-125">
          
          {/* Left Light Beam */}
          <div 
            className={`absolute right-1/2 h-56 transition-all duration-800 ease-in-out delay-300 ${
              isVisible ? 'w-96 opacity-80' : 'w-60 opacity-50'
            }`}
            style={{
              background: `conic-gradient(from 70deg at center top, ${colors.primary}, transparent, transparent)`,
              transition: 'background 1s ease-in-out'
            }}
          >
            <div className="absolute w-full left-0 bg-slate-950 h-40 bottom-0 opacity-100"
                 style={{ 
                   maskImage: 'linear-gradient(to top, white, transparent)',
                   WebkitMaskImage: 'linear-gradient(to top, white, transparent)'
                 }} />
            <div className="absolute w-40 h-full left-0 bg-slate-950 bottom-0"
                 style={{ 
                   maskImage: 'linear-gradient(to right, white, transparent)',
                   WebkitMaskImage: 'linear-gradient(to right, white, transparent)'
                 }} />
          </div>

          {/* Right Light Beam */}
          <div 
            className={`absolute left-1/2 h-56 transition-all duration-800 ease-in-out delay-300 ${
              isVisible ? 'w-96 opacity-80' : 'w-60 opacity-50'
            }`}
            style={{
              background: `conic-gradient(from 290deg at center top, transparent, transparent, ${colors.primary})`,
              transition: 'background 1s ease-in-out'
            }}
          >
            <div className="absolute w-full right-0 bg-slate-950 h-40 bottom-0"
                 style={{ 
                   maskImage: 'linear-gradient(to top, white, transparent)',
                   WebkitMaskImage: 'linear-gradient(to top, white, transparent)'
                 }} />
            <div className="absolute w-40 h-full right-0 bg-slate-950 bottom-0"
                 style={{ 
                   maskImage: 'linear-gradient(to left, white, transparent)',
                   WebkitMaskImage: 'linear-gradient(to left, white, transparent)'
                 }} />
          </div>

          {/* Background blur effect */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl animate-pulse"></div>
          
          {/* Backdrop blur overlay */}
          <div className="absolute top-1/2 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
          
          {/* Central glow - pulsing animation */}
          <div 
            className={`absolute h-36 rounded-full opacity-50 blur-3xl -translate-y-1/2 transition-all duration-800 ease-in-out delay-300 animate-pulse ${
              isVisible ? 'w-96' : 'w-72'
            }`}
            style={{
              backgroundColor: colors.glow,
              transition: 'background-color 1s ease-in-out, width 0.8s ease-in-out'
            }}
          ></div>
          
          {/* Upper glow */}
          <div 
            className={`absolute h-36 rounded-full blur-2xl -translate-y-24 transition-all duration-800 ease-in-out delay-300 ${
              isVisible ? 'w-64' : 'w-32'
            }`}
            style={{
              backgroundColor: colors.secondary,
              transition: 'background-color 1s ease-in-out, width 0.8s ease-in-out'
            }}
          ></div>
          
          {/* Lamp line */}
          <div 
            className={`absolute h-0.5 -translate-y-28 transition-all duration-800 ease-in-out delay-300 ${
              isVisible ? 'w-96' : 'w-60'
            }`}
            style={{
              backgroundColor: colors.secondary,
              transition: 'background-color 1s ease-in-out, width 0.8s ease-in-out'
            }}
          ></div>

          {/* Top mask */}
          <div className="absolute h-44 w-full -translate-y-52 bg-slate-950"></div>
          
          {/* Floating light particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full opacity-60 animate-bounce" 
              style={{
                backgroundColor: colors.secondary,
                animationDelay: '0s',
                transition: 'background-color 1s ease-in-out'
              }}
            ></div>
            <div 
              className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full opacity-40 animate-bounce" 
              style={{
                backgroundColor: colors.primary,
                animationDelay: '1s',
                transition: 'background-color 1s ease-in-out'
              }}
            ></div>
            <div 
              className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full opacity-50 animate-bounce" 
              style={{
                backgroundColor: colors.glow,
                animationDelay: '2s',
                transition: 'background-color 1s ease-in-out'
              }}
            ></div>
            <div 
              className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full opacity-30 animate-bounce" 
              style={{
                backgroundColor: colors.secondary,
                animationDelay: '1.5s',
                transition: 'background-color 1s ease-in-out'
              }}
            ></div>
          </div>
        </div>

        {/* MindSpace Branding */}
        <div className=" z-50 flex -translate-y-80 flex-col items-center px-5">
          <div className="mt-20 m-8 flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl shadow-2xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-6xl md:text-8xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent transition-all duration-800 ease-in-out delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-24'
            }`}>
              MindSpace
            </h1>
          </div>
          
          <div className="text-center space-y-8 mt-12">
            <p className={`text-xl md:text-2xl text-gray-300 transition-all duration-800 ease-in-out delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              ✨ Not Just a Journal. Not Just an AI Chat.
            </p>
            <div className="space-y-6">
              <h2 
                className={`text-3xl md:text-5xl font-bold text-transparent bg-clip-text transition-all duration-800 ease-in-out delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.glow})`,
                  transition: 'background-image 1s ease-in-out'
                }}
              >
                It's Your Mental Wellness Partner
              </h2>
              <p className={`text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-800 ease-in-out delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                Experience the perfect blend of AI intelligence and emotional understanding. 
                Track your moods, reflect through journaling, and receive personalized insights 
                that help you grow stronger every day.
              </p>
              <div className={`flex flex-wrap justify-center gap-6 text-sm transition-all duration-800 ease-in-out delay-900 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                  <span>Mood Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                  <span>AI Conversations</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.glow }}></div>
                  <span>Smart Journaling</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                  <span>Weekly Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose MindSpace Section */}
      <div className="relative z-10 py-20 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose MindSpace Over Any Other App?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience features designed specifically for your mental wellness journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20 ${
                  activeFeature === index ? 'bg-white/10 shadow-2xl' : 'bg-white/5'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-3xl group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-purple-300 font-medium mb-4">{feature.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">{feature.description}</p>
                  
                  <div className="bg-black/20 rounded-lg p-4 border-l-4 border-purple-400">
                    <p className="text-purple-200 italic">"{feature.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Features Section */}
      <div className="relative z-10 py-20 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              All features are completely free and designed to support your mental health journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* All Features */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2 text-blue-400">Core Features</h3>
                  <p className="text-gray-300">Essential tools for your wellbeing</p>
                </div>
                
                <div className="space-y-4">
                  {freeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-purple-400">Advanced Features</h3>
                  <p className="text-gray-300">Deeper insights and personalization</p>
                </div>
                
                <div className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Message Section */}
      <div className="relative z-10 py-20 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Mental Wellness Journey Starts Here
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover a personalized path to better mental health with AI that truly understands you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;