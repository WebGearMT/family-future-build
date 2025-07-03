
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Briefcase, FileText, LogOut, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FamilyDetails from './profile/FamilyDetails';
import EmploymentHistory from './profile/EmploymentHistory';
import ResumeUpload from './profile/ResumeUpload';
import PersonalInfo from './profile/PersonalInfo';

interface DashboardProps {
  user: any;
  onSignOut: () => void;
}

const Dashboard = ({ user, onSignOut }: DashboardProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ProfileHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/resources')}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>NC Resources</span>
              </Button>
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button 
                variant="outline" 
                onClick={onSignOut}
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Profile Dashboard</h2>
          <p className="text-gray-600">Manage your personal information, family details, and professional profile.</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="personal" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Personal Info</span>
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Family Details</span>
            </TabsTrigger>
            <TabsTrigger value="employment" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Employment</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfo user={user} />
          </TabsContent>

          <TabsContent value="family">
            <FamilyDetails />
          </TabsContent>

          <TabsContent value="employment">
            <EmploymentHistory />
          </TabsContent>

          <TabsContent value="resume">
            <ResumeUpload />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
