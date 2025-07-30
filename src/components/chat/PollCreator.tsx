import React, { useState } from 'react';
import { BarChart3, X, Plus, Trash2 } from 'lucide-react';

interface PollOption {
  id: string;
  text: string;
}

interface Poll {
  question: string;
  options: PollOption[];
  allowMultiple: boolean;
  duration: number; // in minutes
}

interface PollCreatorProps {
  onSendPoll: (poll: Poll) => void;
  className?: string;
}

const PollCreator: React.FC<PollCreatorProps> = ({ onSendPoll, className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [duration, setDuration] = useState(60); // 1 hour default

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form
    setQuestion('');
    setOptions([
      { id: '1', text: '' },
      { id: '2', text: '' }
    ]);
    setAllowMultiple(false);
    setDuration(60);
  };

  const addOption = () => {
    if (options.length < 8) { // Limit to 8 options
      const newId = (Math.max(...options.map(o => parseInt(o.id))) + 1).toString();
      setOptions([...options, { id: newId, text: '' }]);
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) { // Minimum 2 options
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  const handleSendPoll = () => {
    // Validate form
    if (!question.trim()) {
      alert('Please enter a poll question');
      return;
    }

    const validOptions = options.filter(option => option.text.trim());
    if (validOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }

    const poll: Poll = {
      question: question.trim(),
      options: validOptions,
      allowMultiple,
      duration
    };

    onSendPoll(poll);
    handleCloseModal();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      {/* Poll Button */}
      <button
        onClick={handleOpenModal}
        variant="ghost" 
        size="sm"
        className={`text-muted-foreground ${className}`}
        title="Create Poll"
        aria-label="Create Poll"
      >
        <BarChart3 size={20} />
      </button>

      {/* Poll Creation Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create Poll</h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Question Input */}
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Poll Question *
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to ask?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  maxLength={200}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {question.length}/200 characters
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options *
                </label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 w-8">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => updateOption(option.id, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={100}
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(option.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                          aria-label="Remove option"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Option Button */}
                {options.length < 8 && (
                  <button
                    onClick={addOption}
                    className="mt-2 flex items-center space-x-1 text-blue-500 hover:text-blue-600 text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Option</span>
                  </button>
                )}
              </div>

              {/* Settings */}
              <div className="space-y-3">
                {/* Multiple Choice */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowMultiple"
                    checked={allowMultiple}
                    onChange={(e) => setAllowMultiple(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="allowMultiple" className="text-sm text-gray-700">
                    Allow multiple selections
                  </label>
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Poll Duration
                  </label>
                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                    <option value={240}>4 hours</option>
                    <option value={1440}>24 hours</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPoll}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Send Poll
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PollCreator;
