import React from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label for the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Whether the input is in an error state */
  isError?: boolean;
  /** Helper text to display below the input */
  helperText?: string;
}

/** Modern Input component for text entry */
export const Input = ({
  label,
  error,
  isError = false,
  helperText,
  className = '',
  id,
  disabled,
  ...props
}: InputProps) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = isError || !!error;

  return (
    <div className={`storybook-input-container ${className}`}>
      {label && (
        <label htmlFor={inputId} className="storybook-input-label">
          {label}
        </label>
      )}
      <div className="storybook-input-wrapper">
        <input
          id={inputId}
          className={[
            'storybook-input',
            hasError ? 'storybook-input--error' : '',
          ].join(' ')}
          disabled={disabled}
          {...props}
        />
      </div>
      {hasError && error && (
        <span className="storybook-input-error-msg">{error}</span>
      )}
      {!hasError && helperText && (
        <span className="storybook-input-helper-msg" style={{ fontSize: '12px', opacity: 0.7 }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
