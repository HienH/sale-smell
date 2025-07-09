/**
 * @fileoverview Button component for the Sale-Smell application
 * 
 * This file defines a reusable Button component with different variants,
 * sizes, and states for consistent UI throughout the application.
 * 
 * Key Features:
 * - Multiple variants (primary, secondary, outline, ghost)
 * - Different sizes (sm, md, lg)
 * - Loading state
 * - Disabled state
 * - Accessibility features
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import React from 'react';

/**
 * @description Button variant types
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * @description Button size types
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * @description Button component props
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

/**
 * @description Button component
 * 
 * This component provides a consistent button interface with
 * different variants, sizes, and states.
 * 
 * @param {ButtonProps} props - Component props
 * @param {ButtonVariant} [props.variant='primary'] - Button variant
 * @param {ButtonSize} [props.size='md'] - Button size
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {string} [props.loadingText] - Text to show during loading
 * @param {React.ReactNode} [props.leftIcon] - Icon to show on the left
 * @param {React.ReactNode} [props.rightIcon] - Icon to show on the right
 * @param {React.ReactNode} props.children - Button content
 * @param {Object} props - Additional button props
 * 
 * @returns {React.JSX.Element} Button component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            loadingText,
            leftIcon,
            rightIcon,
            children,
            className = '',
            disabled,
            ...props
        },
        ref
    ): React.JSX.Element => {
        // Base classes
        const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        // Variant classes
        const variantClasses = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',
            secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 focus-visible:ring-secondary-500',
            outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500',
            ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500',
        };

        // Size classes
        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
        };

        // Loading spinner component
        const LoadingSpinner = () => (
            <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );

        return (
            <button
                ref={ref}
                className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
                disabled={disabled || isLoading}
                {...props}
            >
                {/* Left Icon */}
                {leftIcon && !isLoading && (
                    <span className="mr-2">{leftIcon}</span>
                )}

                {/* Loading Spinner */}
                {isLoading && <LoadingSpinner />}

                {/* Button Text */}
                {isLoading && loadingText ? loadingText : children}

                {/* Right Icon */}
                {rightIcon && !isLoading && (
                    <span className="ml-2">{rightIcon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize }; 