import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppHeader from '@/components/ui/app-header';
import { Mail, Phone, AtSign } from 'lucide-react';

// TypeScript interface for user profile data
interface UserProfile {
  firstName: string;
  lastName: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [profile, setProfile] = useState<UserProfile>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: '',
    email: user?.email || '',
    phoneNumber: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission 
  const submitProfileData = async (profile: UserProfile) => {
    try {
      console.log('User Profile: ', profile);
      const response = await fetch('../../server/api.php/profiles', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profile
        })
      });
		console.log('response preprocessed: ', response);
      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
	  console.log('response parsed as json: ', data);
      // Log success and return the data
      console.log('Profile data submitted successfully:', data);

      return {
        success: true,
        status: response.status,
        data: data
      };

    } catch (error) {
      if (error instanceof TypeError) {
        // Network error (no internet, server down, etc.)
        console.error('Network error:', error.message);
        return {
          success: false,
          error: 'Network error - please check your connection',
          details: error.message
        };
      } else if (error instanceof Error && error.message.includes('HTTP error')) {
        // HTTP status error (4xx, 5xx)
        console.error('Server error:', error.message);
        return {
          success: false,
          error: 'Server error - please try again later',
          details: error.message
        };
      } else {
        // Other errors (JSON parsing, etc.)
        console.error('Unexpected error:', (error as Error).message);
        return {
          success: false,
          error: 'An unexpected error occurred',
          details: (error as Error).message
        };
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const result = await submitProfileData(profile);
		console.log('handleSubmit result: ', result);
      if (result.success) {
        switch (result.status) {
          case 200:
            setSuccessMessage('Profile updated successfully!');
            console.log('Profile updated successfully');
            break;
          case 201:
            setSuccessMessage('New profile created successfully!');
            console.log('New profile created successfully');
            break;
          default:
            setSuccessMessage('Profile operation completed!');
            console.log('Profile operation completed');
        }
      } else {
        // Show user-friendly error messages
        setErrorMessage((result instanceof UserProfile).error);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred while saving your profile.');
      console.error('Error in handleSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full bg-gray-50 min-h-screen">
      <AppHeader
        mode="dashboard"
        user={user}
        onSignOut={signOut}
        showMenu={false}
      />

      <div className="max-w-2xl mx-auto p-6 pt-24 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
        <p className="text-gray-600">Complete your profile information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error and Success Messages */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        )}

        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AtSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Choose a username"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Current Profile Data:</h3>
        <pre className="text-xs text-gray-600 overflow-x-auto">
          {JSON.stringify(
            {
              ...profile
            },
            null,
            2
          )}
        </pre>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
