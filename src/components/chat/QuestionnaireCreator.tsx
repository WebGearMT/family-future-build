import React, { useState } from 'react';
import { FileText, X, Plus, Trash2 } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no';
  options?: string[];
  required: boolean;
}

interface Questionnaire {
  title: string;
  description: string;
  questions: Question[];
  anonymous: boolean;
  duration: number; // in minutes
}

interface QuestionnaireCreatorProps {
  onSendQuestionnaire: (questionnaire: Questionnaire) => void;
  className?: string;
}

const QuestionnaireCreator: React.FC<QuestionnaireCreatorProps> = ({ 
  onSendQuestionnaire, 
  className = '' 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: '',
      type: 'text',
      required: true
    }
  ]);
  const [anonymous, setAnonymous] = useState(false);
  const [duration, setDuration] = useState(1440); // 24 hours default

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form
    setTitle('');
    setDescription('');
    setQuestions([{
      id: '1',
      question: '',
      type: 'text',
      required: true
    }]);
    setAnonymous(false);
    setDuration(1440);
  };

  const addQuestion = () => {
    if (questions.length < 10) { // Limit to 10 questions
      const newId = (Math.max(...questions.map(q => parseInt(q.id))) + 1).toString();
      setQuestions([...questions, {
        id: newId,
        question: '',
        type: 'text',
        required: false
      }]);
    }
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) { // Minimum 1 question
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const options = q.options || [];
        if (options.length < 6) { // Max 6 options
          return { ...q, options: [...options, ''] };
        }
      }
      return q;
    }));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const options = q.options.filter((_, index) => index !== optionIndex);
        return { ...q, options: options.length > 0 ? options : undefined };
      }
      return q;
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const options = [...q.options];
        options[optionIndex] = value;
        return { ...q, options };
      }
      return q;
    }));
  };

  const handleSendQuestionnaire = () => {
    // Validate form
    if (!title.trim()) {
      alert('Please enter a questionnaire title');
      return;
    }

    const validQuestions = questions.filter(q => q.question.trim());
    if (validQuestions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    // Validate multiple choice questions have options
    const invalidMCQuestions = validQuestions.filter(q => 
      q.type === 'multiple-choice' && (!q.options || q.options.filter(opt => opt.trim()).length < 2)
    );
    
    if (invalidMCQuestions.length > 0) {
      alert('Multiple choice questions must have at least 2 options');
      return;
    }

    const questionnaire: Questionnaire = {
      title: title.trim(),
      description: description.trim(),
      questions: validQuestions.map(q => ({
        ...q,
        question: q.question.trim(),
        options: q.options?.filter(opt => opt.trim()).map(opt => opt.trim())
      })),
      anonymous,
      duration
    };

    if (onSendQuestionnaire && typeof onSendQuestionnaire === 'function') {
      onSendQuestionnaire(questionnaire);
    } else {
      console.warn('onSendQuestionnaire prop is not provided or is not a function');
    }
    
    handleCloseModal();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const renderQuestionOptions = (question: Question) => {
    if (question.type !== 'multiple-choice') return null;

    const options = question.options || [];

    return (
      <div className="mt-2 space-y-2">
        <label className="block text-xs font-medium text-gray-600">Options:</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-4">{index + 1}.</span>
            <input
              type="text"
              value={option}
              onChange={(e) => updateOption(question.id, index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="flex-1 p-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              maxLength={50}
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(question.id, index)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
                aria-label="Remove option"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ))}
        {options.length < 6 && (
          <button
            onClick={() => addOption(question.id)}
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 text-xs"
          >
            <Plus size={12} />
            <span>Add Option</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Questionnaire Button */}
      <button
        onClick={handleOpenModal}
        variant="ghost" 
        size="sm"
        className={`text-muted-foreground ${className}`}
        title="Create Questionnaire"
        aria-label="Create Questionnaire"
      >
        <FileText size={20} />
      </button>

      {/* Questionnaire Creation Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create Questionnaire</h2>
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
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Questionnaire Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter questionnaire title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={100}
                />
              </div>

              {/* Description Input */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the questionnaire (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={2}
                  maxLength={300}
                />
              </div>

              {/* Questions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions *
                </label>
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Question {index + 1}
                        </span>
                        {questions.length > 1 && (
                          <button
                            onClick={() => removeQuestion(question.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            aria-label="Remove question"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          placeholder="Enter your question"
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          maxLength={200}
                        />
                        
                        <div className="flex items-center space-x-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Question Type:
                            </label>
                            <select
                              value={question.type}
                              onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                              className="p-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500"
                            >
                              <option value="text">Text Answer</option>
                              <option value="multiple-choice">Multiple Choice</option>
                              <option value="rating">Rating (1-5)</option>
                              <option value="yes-no">Yes/No</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <input
                              type="checkbox"
                              id={`required-${question.id}`}
                              checked={question.required}
                              onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor={`required-${question.id}`} className="text-xs text-gray-600">
                              Required
                            </label>
                          </div>
                        </div>
                        
                        {renderQuestionOptions(question)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Question Button */}
                {questions.length < 10 && (
                  <button
                    onClick={addQuestion}
                    className="mt-3 flex items-center space-x-1 text-green-500 hover:text-green-600 text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Question</span>
                  </button>
                )}
              </div>

              {/* Settings */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                {/* Anonymous */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    Allow anonymous responses
                  </label>
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Response Deadline
                  </label>
                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value={60}>1 hour</option>
                    <option value={240}>4 hours</option>
                    <option value={480}>8 hours</option>
                    <option value={1440}>24 hours</option>
                    <option value={2880}>2 days</option>
                    <option value={10080}>1 week</option>
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
                onClick={handleSendQuestionnaire}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Send Questionnaire
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionnaireCreator;
