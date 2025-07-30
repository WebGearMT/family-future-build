import React, { useState, useRef } from 'react';
import { Paperclip, X, Upload, File, FileText, Archive, Music, Video } from 'lucide-react';

interface FileAttachmentProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  allowedTypes?: string[]; // file extensions like ['.pdf', '.docx', '.txt']
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ 
  onFilesSelected, 
  maxFiles = 5, 
  maxFileSize = 50,
  allowedTypes = [] // Empty array means all file types allowed
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
      case 'rtf':
        return <FileText size={16} className="text-blue-500" />;
      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
        return <Archive size={16} className="text-yellow-500" />;
      case 'mp3':
      case 'wav':
      case 'flac':
      case 'aac':
        return <Music size={16} className="text-purple-500" />;
      case 'mp4':
      case 'avi':
      case 'mkv':
      case 'mov':
        return <Video size={16} className="text-red-500" />;
      default:
        return <File size={16} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `File size must be less than ${maxFileSize}MB`;
    }

    // Check allowed file types if specified
    if (allowedTypes.length > 0) {
      const fileName = file.name.toLowerCase();
      const isAllowed = allowedTypes.some(type => 
        fileName.endsWith(type.toLowerCase())
      );
      if (!isAllowed) {
        return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`;
      }
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setError('');

    // Validate total number of files
    if (selectedFiles.length + files.length > maxFiles) {
      setError(`You can only attach up to ${maxFiles} files`);
      return;
    }

    const validFiles: File[] = [];

    for (const file of files) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      validFiles.push(file);
    }

    const updatedFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
    setError('');
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    onFilesSelected([]);
    setError('');
  };

  return (
    <div className="relative">
      {/* Attachment Button */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="flex items-center justify-center w-10 h-10 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        title="Attach files"
      >
        <Paperclip size={20} />
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        accept={allowedTypes.length > 0 ? allowedTypes.join(',') : undefined}
      />

      {/* File List */}
      {selectedFiles.length > 0 && (
        <div className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-80 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearAllFiles}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border group">
                {getFileIcon(file.name)}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {selectedFiles.length < maxFiles && (
            <button
              onClick={handleButtonClick}
              className="w-full mt-2 py-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center justify-center gap-1 text-sm"
            >
              <Upload size={16} />
              Add more files
            </button>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute bottom-12 left-0 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm min-w-60">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileAttachment;