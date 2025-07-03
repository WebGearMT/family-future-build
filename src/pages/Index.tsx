
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'welcome' | 'signin' | 'signup' | 'dashboard'>('welcome');
  const [user, setUser] = useState<any>(null);

  const handleSignIn = (userData: any) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleSignUp = (userData: any) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentView('welcome');
  };

  if (currentView === 'dashboard' && user) {
    return <Dashboard user={user} onSignOut={handleSignOut} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ProfileHub</h1>
            </div>
            {currentView === 'welcome' && (
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentView('signin')}
                  className="hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setCurrentView('signup')}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'welcome' && (
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Manage Your Professional Profile
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Create your comprehensive profile with family details, employment history, and resume upload all in one place.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Family Details</CardTitle>
                    <CardDescription>
                      Keep track of your family information and relationships
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Employment History</CardTitle>
                    <CardDescription>
                      Document your professional experience and career journey
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Resume Upload</CardTitle>
                    <CardDescription>
                      Upload and manage your resume documents securely
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-12">
                <Button 
                  size="lg" 
                  onClick={() => setCurrentView('signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-colors"
                >
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'signin' && (
          <div className="max-w-md mx-auto">
            <SignIn 
              onSignIn={handleSignIn} 
              onSwitchToSignUp={() => setCurrentView('signup')}
              onBack={() => setCurrentView('welcome')}
            />
          </div>
        )}

        {currentView === 'signup' && (
          <div className="max-w-md mx-auto">
            <SignUp 
              onSignUp={handleSignUp} 
              onSwitchToSignIn={() => setCurrentView('signin')}
              onBack={() => setCurrentView('welcome')}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
