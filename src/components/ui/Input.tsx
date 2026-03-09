'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={clsx(
            'w-full rounded-lg border bg-white px-4 py-2.5 text-foreground transition-colors duration-200',
            'placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            error ? 'border-accent' : 'border-border',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-accent">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
