import React from 'react';
import { Gift, RefreshCw, Bell, MessageCircle, ExternalLink, Calendar, Mail, Users } from 'lucide-react';

interface NoVouchersAvailableComponentProps {
  onRefresh?: () => void;
  onClearFilters?: () => void;
  isLoading?: boolean;
  showNotificationSignup?: boolean;
  showContactInfo?: boolean;
  customTitle?: string;
  customMessage?: string;
  className?: string;
}

const NoVouchersAvailableComponent: React.FC<NoVouchersAvailableComponentProps> = ({
  onRefresh,
  onClearFilters,
  isLoading = false,
  showNotificationSignup = true,
  showContactInfo = true,
  customTitle = "No Vouchers Available",
  customMessage = "There are currently no active vouchers or coupons available. Check back later for new deals and discounts!",
  className = ''
}) => {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleNotificationSignup = () => {
    if (email.includes('@')) {
      // Handle subscription logic here
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const tips = [
    {
      icon: <Bell className="w-5 h-5 text-blue-600" />,
      title: "Get Notified",
      description: "Subscribe to notifications for new deals and flash sales"
    },
    {
      icon: <Users className="w-5 h-5 text-green-600" />,
      title: "Follow Social Media",
      description: "Check our social channels for exclusive discount codes"
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-purple-600" />,
      title: "Contact Support",
      description: "Reach out for personalized offers and assistance"
    },
    {
      icon: <Calendar className="w-5 h-5 text-orange-600" />,
      title: "Check Back Soon",
      description: "New vouchers are added regularly throughout the week"
    }
  ];

  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 ${className}`}>
      {/* Main Icon with Animation */}
      <div className="relative mb-8">
        {/* Main gift box */}
        <div className="w-40 h-40 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-2xl transform transition-transform duration-500 hover:scale-105">
          <Gift className="w-20 h-20 text-gray-400" />
        </div>
        
        {/* Warning badge */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-red-100 border-4 border-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-red-500 text-2xl font-bold">!</span>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -left-4 top-8 w-8 h-8 bg-yellow-200 rounded-full animate-bounce delay-75 opacity-70"></div>
        <div className="absolute -right-2 top-16 w-6 h-6 bg-blue-200 rounded-full animate-bounce delay-150 opacity-70"></div>
        <div className="absolute left-8 -bottom-2 w-10 h-10 bg-purple-200 rounded-full animate-bounce delay-300 opacity-70"></div>
      </div>

      {/* Main Content */}
      <div className="text-center mb-8 max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{customTitle}</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">{customMessage}</p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none font-semibold"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          )}
          
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
            >
              <RefreshCw className="w-5 h-5" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Email Notification Signup */}
      {showNotificationSignup && (
        <div className="w-full max-w-md mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
            <div className="text-center mb-4">
              <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-blue-900">Never Miss a Deal!</h3>
              <p className="text-blue-700 text-sm">Get notified when new vouchers become available</p>
            </div>
            
            {!isSubscribed ? (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleNotificationSignup}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold text-sm whitespace-nowrap"
                >
                  Notify Me
                </button>
              </div>
            ) : (
              <div className="text-center py-3">
                <div className="inline-flex items-center gap-2 text-green-600 font-semibold">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Thanks! You'll be notified of new deals.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tips and Suggestions */}
      <div className="w-full max-w-4xl mb-8">
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">What you can do while you wait:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 p-3 bg-gray-50 rounded-full group-hover:scale-110 transition-transform duration-200">
                  {tip.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      {showContactInfo && (
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <a
                href="mailto:support@yourstore.com"
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
              >
                <Mail className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-gray-900">Email Support</span>
                <span className="text-sm text-gray-600">Get personalized offers</span>
              </a>
              
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
              >
                <MessageCircle className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-gray-900">Live Chat</span>
                <span className="text-sm text-gray-600">Instant assistance</span>
              </a>
              
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
              >
                <ExternalLink className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-gray-900">Help Center</span>
                <span className="text-sm text-gray-600">Browse FAQs</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer Message */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Vouchers are typically updated every Monday and Friday. 
          <br className="hidden sm:inline" />
          Follow us on social media for flash sales and exclusive codes!
        </p>
      </div>
    </div>
  );
};

// Example usage component
const ExampleUsage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Refreshed!');
    }, 2000);
  };

  const handleClearFilters = () => {
    console.log('Filters cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">NoVouchersAvailableComponent Demo</h1>
        
        {/* Demo Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Demo Controls</h2>
          <div className="flex gap-4">
            <button
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Test Refresh
            </button>
            <button
              onClick={handleClearFilters}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Test Clear Filters
            </button>
          </div>
        </div>

        {/* Component Demo */}
        <div className="bg-white rounded-lg shadow-lg">
          <NoVouchersAvailableComponent
            onRefresh={handleRefresh}
            onClearFilters={handleClearFilters}
            isLoading={isLoading}
            showNotificationSignup={true}
            showContactInfo={true}
          />
        </div>

        {/* Usage Examples */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-900">Basic Usage:</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`<NoVouchersAvailableComponent 
  onRefresh={() => fetchVouchers()}
  isLoading={loading}
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Custom Message:</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`<NoVouchersAvailableComponent 
  customTitle="Store Temporarily Closed"
  customMessage="We're restocking our deals. Check back tomorrow!"
  showNotificationSignup={false}
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Minimal Version:</h3>
              <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
{`<NoVouchersAvailableComponent 
  showNotificationSignup={false}
  showContactInfo={false}
  customMessage="No vouchers available at this time."
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleUsage;