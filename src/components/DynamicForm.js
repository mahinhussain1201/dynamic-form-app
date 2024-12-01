import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { formConfigs, formTypes } from '../data/formConfigs';
import FormField from './FormField';
import ProgressBar from './ProgressBar';
import DataTable from './DataTable';

const DynamicForm = () => {
  const [formType, setFormType] = useState('userInformation');
  const [submissions, setSubmissions] = useState([]);
  const [progress, setProgress] = useState(0);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const currentConfig = formConfigs[formType];
  const allFields = watch();

  useEffect(() => {
    // Calculate form progress
    if (currentConfig) {
      const requiredFields = currentConfig.fields.filter(field => field.required);
      const completedFields = requiredFields.filter(field => allFields[field.name]?.length > 0);
      setProgress((completedFields.length / requiredFields.length) * 100);
    }
  }, [allFields, currentConfig]);

  const onSubmit = (data) => {
    const newSubmission = {
      id: Date.now(),
      type: formType,
      data
    };
    
    setSubmissions(prev => [...prev, newSubmission]);
    toast.success('Form submitted successfully!');
    reset();
  };

  const handleDelete = (id) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
    toast.success('Entry deleted successfully!');
  };

  const handleEdit = (submission) => {
    setFormType(submission.type);
    reset(submission.data);
    setSubmissions(prev => prev.filter(sub => sub.id !== submission.id));
    toast.info('Edit mode activated. Make your changes and submit.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dynamic Form</h2>
        
        {/* Form Type Selector */}
        <div className="mb-6">
          <label className="form-label">Form Type</label>
          <select
            className="form-input"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
          >
            {formTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={progress} />

        {/* Dynamic Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {currentConfig.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              register={register}
              error={errors[field.name]}
            />
          ))}
          
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>

      {/* Data Table */}
      {submissions.length > 0 && (
        <DataTable
          submissions={submissions}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default DynamicForm;
