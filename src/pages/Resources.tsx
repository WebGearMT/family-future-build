
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Car, GraduationCap, Building2, FileText, Heart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Resources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Driver's License",
      icon: Car,
      description: "Get your North Carolina driver's license or ID card",
      items: [
        "Visit your local NC DMV office",
        "Bring proof of identity, Social Security number, and residency",
        "Pass vision, road signs, and driving tests if required",
        "Pay the required fees ($5.50 for ID, $5.50 for license)"
      ],
      link: "https://www.ncdot.gov/dmv/",
      linkText: "Visit NC DMV Website"
    },
    {
      title: "School Enrollment",
      icon: GraduationCap,
      description: "Enroll your children in North Carolina public schools",
      items: [
        "Contact your local school district office",
        "Provide proof of residence (utility bill, lease agreement)",
        "Submit child's birth certificate and immunization records",
        "Complete registration forms and emergency contact information"
      ],
      link: "https://www.dpi.nc.gov/",
      linkText: "NC Department of Public Instruction"
    },
    {
      title: "Banking",
      icon: Building2,
      description: "Open a bank account in North Carolina",
      items: [
        "Choose from major banks: Bank of America, Wells Fargo, First Citizens, etc.",
        "Bring government-issued ID and Social Security card",
        "Provide proof of address (utility bill, lease agreement)",
        "Make initial deposit (varies by bank and account type)"
      ],
      link: "https://www.ncsecu.org/",
      linkText: "NC State Employees' Credit Union"
    },
    {
      title: "Healthcare",
      icon: Heart,
      description: "Access healthcare services in North Carolina",
      items: [
        "Find local hospitals: Duke Health, Atrium Health, UNC Health",
        "Locate community health centers for affordable care",
        "Apply for Medicaid if eligible through NC DHHS",
        "Find mental health resources through NC 211"
      ],
      link: "https://www.ncdhhs.gov/",
      linkText: "NC Department of Health"
    },
    {
      title: "Social Services",
      icon: Shield,
      description: "Access North Carolina social services and benefits",
      items: [
        "Apply for SNAP (food stamps) and WIC programs",
        "Access childcare assistance programs",
        "Find housing assistance and rental programs",
        "Get help with utility assistance programs"
      ],
      link: "https://www.ncdhhs.gov/assistance",
      linkText: "NC Social Services"
    },
    {
      title: "Employment",
      icon: FileText,
      description: "Find employment resources in North Carolina",
      items: [
        "Visit NCWorks Career Centers for job search assistance",
        "Access unemployment benefits if eligible",
        "Find vocational training and education programs",
        "Get help with resume writing and interview skills"
      ],
      link: "https://www.ncworks.gov/",
      linkText: "NCWorks Website"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-sky-200">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:bg-blue-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <h1 className="text-2xl font-bold text-blue-900">North Carolina Resources</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Essential Services Guide</h2>
          <p className="text-blue-800">Everything you need to know about getting started in North Carolina.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-sky-600" />
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {resource.items.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-sky-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center space-x-2 hover:bg-blue-50 border-blue-300"
                    onClick={() => window.open(resource.link, '_blank')}
                  >
                    <span>{resource.linkText}</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Important Phone Numbers</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Emergency Services</h4>
              <p>Emergency: 911</p>
              <p>Non-Emergency Police: 311</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">General Resources</h4>
              <p>NC 211 (Information & Referral): 2-1-1</p>
              <p>NC DMV: (919) 715-7000</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resources;
