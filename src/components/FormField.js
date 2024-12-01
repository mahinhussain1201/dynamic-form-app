import React from 'react';

const FormField = ({ field, register, error }) => {
  const { name, type, label, required, options } = field;

  const renderField = () => {
    switch (type) {
      case 'dropdown':
        return (
          <select
            {...register(name, { required: required ? `${label} is required` : false })}
            className={`form-input ${error ? 'border-red-500' : ''}`}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <input
            type="date"
            {...register(name, { required: required ? `${label} is required` : false })}
            className={`form-input ${error ? 'border-red-500' : ''}`}
          />
        );
      
      default:
        return (
          <input
            type={type}
            {...register(name, { required: required ? `${label} is required` : false })}
            className={`form-input ${error ? 'border-red-500' : ''}`}
          />
        );
    }
  };

  return (
    <div>
      <label className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && (
        <p className="error-message">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;
