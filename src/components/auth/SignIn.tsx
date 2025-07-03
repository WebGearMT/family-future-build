
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';

interface SignInProps {
  onSignIn: (userData: any) => void;
  onSwitchToSignUp: () => void;
  onBack: () => void;
}

const SignIn = ({ onSignIn, onSwitchToSignUp, onBack }: SignInProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate against a backend
    if (formData.email && formData.password) {
      onSignIn({
        email: formData.email,
        name: formData.email.split('@')[0] // Simple name extraction
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-1 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        </div>
        <CardDescription>
          Welcome back! Please sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="transition-colors focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="transition-colors focus:border-blue-500"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignIn;
