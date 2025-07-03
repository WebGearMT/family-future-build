
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: string;
  occupation: string;
}

const FamilyDetails = () => {
  const { toast } = useToast();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    age: '',
    occupation: ''
  });

  const addFamilyMember = () => {
    if (newMember.name && newMember.relationship) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        ...newMember
      };
      setFamilyMembers([...familyMembers, member]);
      setNewMember({ name: '', relationship: '', age: '', occupation: '' });
      toast({
        title: "Family member added",
        description: `${newMember.name} has been added to your family details.`,
      });
    }
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
    toast({
      title: "Family member removed",
      description: "The family member has been removed from your profile.",
    });
  };

  const handleNewMemberChange = (field: string, value: string) => {
    setNewMember({
      ...newMember,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600 flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span>Family Details</span>
          </CardTitle>
          <CardDescription>
            Add and manage information about your family members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Name</Label>
                <Input
                  id="memberName"
                  value={newMember.name}
                  onChange={(e) => handleNewMemberChange('name', e.target.value)}
                  placeholder="Enter family member's name"
                  className="transition-colors focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select onValueChange={(value) => handleNewMemberChange('relationship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="grandparent">Grandparent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={newMember.age}
                  onChange={(e) => handleNewMemberChange('age', e.target.value)}
                  placeholder="Age"
                  className="transition-colors focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={newMember.occupation}
                  onChange={(e) => handleNewMemberChange('occupation', e.target.value)}
                  placeholder="Occupation"
                  className="transition-colors focus:border-blue-500"
                />
              </div>
            </div>

            <Button 
              onClick={addFamilyMember}
              className="bg-blue-600 hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Family Member</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {familyMembers.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Your Family Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">
                      {member.relationship} • Age {member.age} • {member.occupation}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFamilyMember(member.id)}
                    className="hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FamilyDetails;
