import React, { useState } from 'react';
import { X as CloseIcon, FileTextIcon, UserIcon, CalendarIcon, ClockIcon, PlusIcon, Trash2Icon, AlertTriangleIcon, GripVertical as GripVerticalIcon } from 'lucide-react';
export const CreateSurveyModal = ({
  onClose
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [committee, setCommittee] = useState('Security Working Group');
  const [dueDate, setDueDate] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [questions, setQuestions] = useState([{
    id: 1,
    type: 'multiple_choice',
    text: '',
    options: ['', '']
  }, {
    id: 2,
    type: 'text',
    text: ''
  }]);
  const [errors, setErrors] = useState({});
  // Committees list
  const committees = ['Security Working Group', 'Technical Steering Committee', 'Documentation Team', 'Governing Board', 'Kubernetes Community'];
  // Question types
  const questionTypes = [{
    value: 'multiple_choice',
    label: 'Multiple Choice'
  }, {
    value: 'text',
    label: 'Text Response'
  }, {
    value: 'rating',
    label: 'Rating Scale'
  }, {
    value: 'checkbox',
    label: 'Checkboxes'
  }];
  // Add a new question
  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, {
      id: newId,
      type: 'text',
      text: ''
    }]);
  };
  // Remove a question
  const removeQuestion = id => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  // Update question text
  const updateQuestionText = (id, text) => {
    setQuestions(questions.map(q => q.id === id ? {
      ...q,
      text
    } : q));
  };
  // Update question type
  const updateQuestionType = (id, type) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        // Initialize appropriate options based on type
        let newQuestion = {
          ...q,
          type
        };
        if (type === 'multiple_choice' || type === 'checkbox') {
          newQuestion.options = q.options || ['', ''];
        } else if (type === 'rating') {
          newQuestion.scale = q.scale || {
            min: 1,
            max: 5
          };
        } else {
          // Remove options/scale if not needed
          delete newQuestion.options;
          delete newQuestion.scale;
        }
        return newQuestion;
      }
      return q;
    }));
  };
  // Add option to multiple choice or checkbox question
  const addOption = questionId => {
    setQuestions(questions.map(q => q.id === questionId ? {
      ...q,
      options: [...q.options, '']
    } : q));
  };
  // Update option text
  const updateOptionText = (questionId, optionIndex, text) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = text;
        return {
          ...q,
          options: newOptions
        };
      }
      return q;
    }));
  };
  // Remove option
  const removeOption = (questionId, optionIndex) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options.length > 2) {
        const newOptions = [...q.options];
        newOptions.splice(optionIndex, 1);
        return {
          ...q,
          options: newOptions
        };
      }
      return q;
    }));
  };
  // Update rating scale
  const updateRatingScale = (questionId, min, max) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          scale: {
            min: parseInt(min),
            max: parseInt(max)
          }
        };
      }
      return q;
    }));
  };
  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    // Validate form
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!committee) newErrors.committee = 'Committee is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    // Validate questions
    const questionErrors = {};
    questions.forEach(q => {
      if (!q.text.trim()) {
        questionErrors[q.id] = 'Question text is required';
      }
      if ((q.type === 'multiple_choice' || q.type === 'checkbox') && q.options) {
        const emptyOptions = q.options.filter(opt => !opt.trim()).length;
        if (emptyOptions > 0) {
          questionErrors[`${q.id}-options`] = 'All options must have text';
        }
      }
    });
    if (Object.keys(questionErrors).length > 0) {
      newErrors.questions = questionErrors;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Form is valid, proceed with submission
    console.log({
      title,
      description,
      committee,
      dueDate,
      isUrgent,
      questions
    });
    onClose('create');
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center">
            <FileTextIcon className="h-5 w-5 text-azure-600 mr-2" />
            <h2 className="text-lg font-semibold text-slate-900">
              Create Survey
            </h2>
          </div>
          <button onClick={() => onClose('cancel')} className="text-slate-500 hover:text-slate-700">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Survey Title*
              </label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g., Community Satisfaction Survey" className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`} />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>
            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide additional context for respondents..." rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500" />
            </div>
            {/* Committee and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Committee*
                </label>
                <select value={committee} onChange={e => setCommittee(e.target.value)} className={`w-full px-3 py-2 border ${errors.committee ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`}>
                  {committees.map(c => <option key={c} value={c}>
                      {c}
                    </option>)}
                </select>
                {errors.committee && <p className="mt-1 text-xs text-red-500">
                    {errors.committee}
                  </p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Due Date*
                </label>
                <div className="relative">
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={`w-full px-3 py-2 border ${errors.dueDate ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`} />
                  <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
              </div>
            </div>
            {/* Urgent Toggle */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} />
                  <div className={`block w-10 h-6 rounded-full ${isUrgent ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${isUrgent ? 'translate-x-4' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm font-medium text-slate-700 flex items-center">
                  <AlertTriangleIcon className={`h-4 w-4 mr-1.5 ${isUrgent ? 'text-red-500' : 'text-slate-400'}`} />
                  Mark as urgent
                </div>
              </label>
            </div>
            {/* Questions */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Questions*
                </label>
                <span className="text-xs text-slate-500">
                  {questions.length} questions
                </span>
              </div>
              <div className="space-y-4">
                {questions.map((question, index) => <div key={question.id} className="border border-slate-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <GripVerticalIcon className="h-5 w-5 text-slate-400 mr-2 cursor-move" />
                        <span className="text-sm font-medium text-slate-700">
                          Question {index + 1}
                        </span>
                      </div>
                      <button type="button" onClick={() => removeQuestion(question.id)} className="text-slate-400 hover:text-red-500" disabled={questions.length <= 1}>
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                      <div className="md:col-span-3">
                        <input type="text" value={question.text} onChange={e => updateQuestionText(question.id, e.target.value)} placeholder="Enter your question..." className={`w-full px-3 py-2 border ${errors.questions && errors.questions[question.id] ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`} />
                        {errors.questions && errors.questions[question.id] && <p className="mt-1 text-xs text-red-500">
                            {errors.questions[question.id]}
                          </p>}
                      </div>
                      <div>
                        <select value={question.type} onChange={e => updateQuestionType(question.id, e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500">
                          {questionTypes.map(type => <option key={type.value} value={type.value}>
                              {type.label}
                            </option>)}
                        </select>
                      </div>
                    </div>
                    {/* Question-specific options */}
                    {(question.type === 'multiple_choice' || question.type === 'checkbox') && <div className="pl-7 space-y-2">
                        {question.options.map((option, optIndex) => <div key={optIndex} className="flex items-center">
                            <div className="w-4 h-4 mr-2">
                              {question.type === 'multiple_choice' ? <div className="w-4 h-4 border border-slate-400 rounded-full"></div> : <div className="w-4 h-4 border border-slate-400 rounded"></div>}
                            </div>
                            <input type="text" value={option} onChange={e => updateOptionText(question.id, optIndex, e.target.value)} placeholder={`Option ${optIndex + 1}`} className={`flex-1 px-3 py-1 text-sm border ${errors.questions && errors.questions[`${question.id}-options`] ? 'border-red-500' : 'border-slate-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-azure-500`} />
                            <button type="button" onClick={() => removeOption(question.id, optIndex)} className="ml-2 text-slate-400 hover:text-red-500" disabled={question.options.length <= 2}>
                              <Trash2Icon className="h-3 w-3" />
                            </button>
                          </div>)}
                        {errors.questions && errors.questions[`${question.id}-options`] && <p className="mt-1 text-xs text-red-500">
                              {errors.questions[`${question.id}-options`]}
                            </p>}
                        <button type="button" onClick={() => addOption(question.id)} className="mt-2 text-xs flex items-center text-azure-600 hover:text-azure-700">
                          <PlusIcon className="h-3 w-3 mr-1" />
                          Add Option
                        </button>
                      </div>}
                    {question.type === 'rating' && <div className="pl-7 flex items-center space-x-3">
                        <span className="text-sm text-slate-600">Scale:</span>
                        <input type="number" min="1" max="10" value={question.scale?.min || 1} onChange={e => updateRatingScale(question.id, e.target.value, question.scale?.max || 5)} className="w-16 px-2 py-1 text-sm border border-slate-300 rounded-md" />
                        <span className="text-sm text-slate-600">to</span>
                        <input type="number" min="1" max="10" value={question.scale?.max || 5} onChange={e => updateRatingScale(question.id, question.scale?.min || 1, e.target.value)} className="w-16 px-2 py-1 text-sm border border-slate-300 rounded-md" />
                      </div>}
                    {question.type === 'text' && <div className="pl-7">
                        <div className="w-full h-8 border border-dashed border-slate-300 rounded-md bg-slate-50 flex items-center justify-center">
                          <span className="text-xs text-slate-500">
                            Text response field
                          </span>
                        </div>
                      </div>}
                  </div>)}
              </div>
              <button type="button" onClick={addQuestion} className="mt-4 w-full py-2 border border-dashed border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 flex items-center justify-center">
                <PlusIcon className="h-4 w-4 mr-1.5" />
                Add Question
              </button>
            </div>
          </form>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end space-x-3">
          <button type="button" onClick={() => onClose('cancel')} className="px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm">
            Create Survey
          </button>
        </div>
      </div>
    </div>;
};