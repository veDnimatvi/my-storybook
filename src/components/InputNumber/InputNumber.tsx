import React, { useState, useEffect, useCallback } from 'react';
import './InputNumber.css';

export interface InputNumberProps {
  /** The variant of the input */
  variant?: 'number' | 'currency' | 'decimal';
  /** Initial value */
  value?: number | string;
  /** Label for the input */
  label?: string;
  /** Callback for value changes */
  onChange?: (value: number | string) => void;
  /** Error message */
  error?: string;
  /** Placeholder */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Suffix (e.g., VND) */
  suffix?: string;
  /** Helper text */
  helperText?: string;
}

/** 
 * Enhanced InputNumber component
 * - number: only digits
 * - currency: formatted with commas
 * - decimal: max 3 decimal places
 */
export const InputNumber = ({
  variant = 'number',
  value: initialValue = '',
  label,
  onChange,
  error,
  placeholder,
  disabled,
  suffix,
  helperText,
}: InputNumberProps) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [rawValue, setRawValue] = useState<string>('');

  // Format currency: 1000000 -> 1,000,000
  const formatCurrency = (val: string) => {
    if (!val) return '';
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Sync state with prop
  useEffect(() => {
    const valStr = initialValue !== undefined ? initialValue.toString() : '';
    setRawValue(valStr);
    if (variant === 'currency') {
      setDisplayValue(formatCurrency(valStr));
    } else {
      setDisplayValue(valStr);
    }
  }, [initialValue, variant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (variant === 'number') {
      // Only digits
      val = val.replace(/\D/g, '');
    } else if (variant === 'decimal') {
      // Numbers and one dot, max 3 decimals
      val = val.replace(/[^0-9.]/g, '');
      const parts = val.split('.');
      if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
      if (parts[1] && parts[1].length > 3) {
        val = parts[0] + '.' + parts[1].substring(0, 3);
      }
    } else if (variant === 'currency') {
      // Allow only numbers for internal value
      val = val.replace(/,/g, '').replace(/\D/g, '');
    }

    if (variant === 'currency') {
      setRawValue(val);
      setDisplayValue(formatCurrency(val));
      if (onChange) onChange(val ? parseInt(val, 10) : '');
    } else {
      setRawValue(val);
      setDisplayValue(val);
      if (onChange) {
        const outValue = variant === 'decimal' ? parseFloat(val) : (val ? parseInt(val, 10) : '');
        onChange(isNaN(outValue as number) ? '' : outValue);
      }
    }
  };

  return (
    <div className="storybook-input-number-container">
      {label && <label className="storybook-input-number-label">{label}</label>}
      <div className="storybook-input-number-wrapper">
        <input
          type="text"
          className={[
            'storybook-input-number',
            error ? 'storybook-input-number--error' : '',
            suffix ? 'storybook-input-number--suffix' : '',
          ].join(' ')}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {suffix && <span className="storybook-input-number-suffix">{suffix}</span>}
      </div>
      {error && <span className="storybook-input-number-error-msg">{error}</span>}
      {!error && helperText && <span style={{fontSize: '12px', opacity: 0.7}}>{helperText}</span>}
    </div>
  );
};
