import React from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          id={id}
          className={`
            peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent
            focus:outline-none focus:border-indigo-600 bg-transparent
            ${error ? 'border-red-500' : ''}
          `}
          placeholder={label}
        />
        <label
          htmlFor={id}
          className={`
            absolute left-0 -top-3.5 text-sm transition-all
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
            peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm
            peer-focus:text-indigo-600
            ${error ? 'text-red-500' : 'text-gray-600'}
          `}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';