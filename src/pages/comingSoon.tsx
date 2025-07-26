import React, { useState, useEffect } from 'react';
import { Clock, Wrench, Rocket, Bell, CheckCircle, Star } from 'lucide-react';

const ComingSoonPage = ({ 
  title = "Coming Soon", 
  subtitle = "This feature is on its way!",
  description = "We're working hard to bring you something amazing. This section will be available soon.",
  showNotifyButton = true,
  estimatedTime = "Soon",
  features = []
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleNotifySubmit = () => {
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Notify email:', email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const defaultFeatures = [
    "Intuitive user interface",
    "Advanced functionality", 
    "Seamless integration",
    "Mobile-responsive design"
  ];

  const featuresToShow = features.length > 0 ? features : defaultFeatures;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full text-center transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
            <Rocket className="w-10 h-10 text-white animate-pulse" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
          <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 -right-8 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-500"></div>
        </div>

        {/* Main Content */}
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-3 font-light">
          {subtitle}
        </p>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-xl mx-auto">
          {description}
        </p>

        {/* Timeline */}
        <div className="flex items-center justify-center gap-2 mb-8 text-indigo-600">
          <Clock className="w-5 h-5" />
          <span className="font-semibold text-lg">Expected: {estimatedTime}</span>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
          {featuresToShow.map((feature, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Development Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Notify Me Form */}
        {showNotifyButton && !isSubscribed && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for updates"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
              <button
                onClick={handleNotifySubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
              >
                <Bell className="w-4 h-4" />
                Notify Me
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isSubscribed && (
          <div className="flex items-center justify-center gap-2 text-green-600 mb-6 p-4 bg-green-50 rounded-xl border border-green-200 max-w-md mx-auto">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Thanks! We'll notify you when it's ready.</span>
          </div>
        )}

        {/* Development Status */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Wrench className="w-4 h-4 animate-spin" />
          <span>Currently in development</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-blue-500"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoonPage;