import React, { useState, useRef } from 'react';
import { Image, X, Upload } from 'lucide-react';

interface ImageAttachmentProps {
  onImagesSelected: (images: File[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
}

const ImageAttachment: React.FC<ImageAttachmentProps> = ({ 
  onImagesSelected, 
  maxImages = 5, 
  maxFileSize = 10 
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please select only image files';
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `Image size must be less than ${maxFileSize}MB`;
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setError('');

    // Validate total number of images
    if (selectedImages.length + files.length > maxImages) {
      setError(`You can only attach up to ${maxImages} images`);
      return;
    }

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    for (const file of files) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      validFiles.push(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      newPreviews.push(previewUrl);
    }

    const updatedImages = [...selectedImages, ...validFiles];
    const updatedPreviews = [...previews, ...newPreviews];

    setSelectedImages(updatedImages);
    setPreviews(updatedPreviews);
    onImagesSelected(updatedImages);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);

    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setSelectedImages(updatedImages);
    setPreviews(updatedPreviews);
    onImagesSelected(updatedImages);
    setError('');
  };

  const clearAllImages = () => {
    // Revoke all object URLs
    previews.forEach(url => URL.revokeObjectURL(url));
    
    setSelectedImages([]);
    setPreviews([]);
    onImagesSelected([]);
    setError('');
  };

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="relative">
      {/* Attachment Button */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        title="Attach images"
      >
        <Image size={20} />
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Previews */}
      {selectedImages.length > 0 && (
        <div className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-80 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {selectedImages.length} image{selectedImages.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearAllImages}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-20 object-cover rounded border"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          {selectedImages.length < maxImages && (
            <button
              onClick={handleButtonClick}
              className="w-full mt-2 py-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors duration-200 flex items-center justify-center gap-1 text-sm"
            >
              <Upload size={16} />
              Add more images
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

export default ImageAttachment;