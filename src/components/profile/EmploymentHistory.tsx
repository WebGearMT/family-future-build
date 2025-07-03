
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Employment {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

const EmploymentHistory = () => {
  const { toast } = useToast();
  const [employmentHistory, setEmploymentHistory] = useState<Employment[]>([]);
  const [newEmployment, setNewEmployment] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: ''
  });

  const addEmployment = () => {
    if (newEmployment.company && newEmployment.position && newEmployment.startDate) {
      const employment: Employment = {
        id: Date.now().toString(),
        ...newEmployment
      };
      setEmploymentHistory([...employmentHistory, employment]);
      setNewEmployment({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        location: ''
      });
      toast({
        title: "Employment added",
        description: `${newEmployment.position} at ${newEmployment.company} has been added.`,
      });
    }
  };

  const removeEmployment = (id: string) => {
    setEmploymentHistory(employmentHistory.filter(emp => emp.id !== id));
    toast({
      title: "Employment removed",
      description: "The employment record has been removed from your profile.",
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setNewEmployment({
      ...newEmployment,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600 flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span>Employment History</span>
          </CardTitle>
          <CardDescription>
            Add your work experience and employment history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newEmployment.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Company name"
                  className="transition-colors focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newEmployment.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  placeholder="Job title"
                  className="transition-colors focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEmployment.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City, State"
                className="transition-colors focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={newEmployment.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="transition-colors focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={newEmployment.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  disabled={newEmployment.current}
                  className="transition-colors focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={newEmployment.current}
                onCheckedChange={(checked) => handleChange('current', checked as boolean)}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={newEmployment.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your role and responsibilities..."
                rows={4}
                className="transition-colors focus:border-blue-500"
              />
            </div>

            <Button 
              onClick={addEmployment}
              className="bg-blue-600 hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Employment</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {employmentHistory.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Your Employment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {employmentHistory.map((employment) => (
                <div key={employment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{employment.position}</h3>
                      <p className="text-blue-600 font-medium">{employment.company}</p>
                      <p className="text-gray-600 text-sm">{employment.location}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {employment.startDate} - {employment.current ? 'Present' : employment.endDate}
                      </p>
                      {employment.description && (
                        <p className="text-gray-700 mt-2">{employment.description}</p>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEmployment(employment.id)}
                      className="hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmploymentHistory;
