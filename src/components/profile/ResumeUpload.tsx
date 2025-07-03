
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload, Download, Trash2, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ResumeFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

const ResumeUpload = () => {
  const { toast } = useToast();
  const [uploadedResumes, setUploadedResumes] = useState<ResumeFile[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.includes('pdf') && !file.type.includes('doc')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive"
        });
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      const newResume: ResumeFile = {
        id: Date.now().toString(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        uploadDate: new Date().toLocaleDateString(),
        type: file.type
      };

      setUploadedResumes([...uploadedResumes, newResume]);
      toast({
        title: "Resume uploaded",
        description: `${file.name} has been successfully uploaded.`,
      });

      // Reset the input
      event.target.value = '';
    }
  };

  const removeResume = (id: string) => {
    setUploadedResumes(uploadedResumes.filter(resume => resume.id !== id));
    toast({
      title: "Resume removed",
      description: "The resume has been removed from your profile.",
    });
  };

  const downloadResume = (resume: ResumeFile) => {
    toast({
      title: "Download started",
      description: `Downloading ${resume.name}...`,
    });
  };

  const previewResume = (resume: ResumeFile) => {
    toast({
      title: "Opening preview",
      description: `Opening preview for ${resume.name}...`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600 flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Resume Upload</span>
          </CardTitle>
          <CardDescription>
            Upload and manage your resume documents. Supported formats: PDF, DOC, DOCX (Max 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <Label htmlFor="resume-upload" className="cursor-pointer">
                  <span className="text-lg font-medium text-gray-700">
                    Click to upload your resume
                  </span>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-sm text-gray-500">
                  Drag and drop your resume here, or click to browse
                </p>
              </div>
            </div>

            <Button 
              onClick={() => document.getElementById('resume-upload')?.click()}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Choose File</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploadedResumes.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Your Uploaded Resumes</CardTitle>
            <CardDescription>
              Manage your uploaded resume documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{resume.name}</h3>
                      <p className="text-sm text-gray-500">
                        {resume.size} • Uploaded on {resume.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => previewResume(resume)}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadResume(resume)}
                      className="hover:bg-green-50 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeResume(resume.id)}
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

export default ResumeUpload;
