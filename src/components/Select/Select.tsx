import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps {
  /** Options to display in the dropdown */
  options: SelectOption[];
  /** Selected value */
  value?: string | number;
  /** Label for the select */
  label?: string;
  /** Placeholder when no option is selected */
  placeholder?: string;
  /** Callback when the selected value changes */
  onChange?: (value: string | number) => void;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
}

/** 
 * Custom Select component
 * Provides a premium, customizable dropdown experience.
 */
export const Select = ({
  options = [],
  value: selectedValue,
  label,
  placeholder = 'Select an option...',
  onChange,
  error,
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (option: SelectOption) => {
    if (onChange) onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div 
      className={[
        'storybook-select-container',
        isOpen ? 'storybook-select-container--open' : '',
        error ? 'storybook-select--error' : '',
        disabled ? 'storybook-select--disabled' : ''
      ].join(' ')} 
      ref={dropdownRef}
    >
      {label && <label className="storybook-select-label">{label}</label>}
      
      <div 
        className="storybook-select-trigger" 
        onClick={handleToggle}
      >
        <span className={!selectedOption ? 'storybook-select-placeholder' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="storybook-select-arrow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div className="storybook-select-dropdown">
        {options.length > 0 ? (
          options.map((option) => (
            <div
              key={option.value}
              className={[
                'storybook-select-option',
                selectedValue === option.value ? 'storybook-select-option--selected' : ''
              ].join(' ')}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))
        ) : (
          <div className="storybook-select-option" style={{ opacity: 0.5, pointerEvents: 'none' }}>
            No options available
          </div>
        )}
      </div>

      {error && <span className="storybook-select-error-msg" style={{ fontSize: '12px', color: '#ef4444', marginTop: '2px' }}>{error}</span>}
    </div>
  );
};
