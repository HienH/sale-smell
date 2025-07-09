/**
 * @fileoverview Card component for the Sale-Smell application
 * 
 * This file defines a reusable Card component for displaying
 * content in a structured, visually appealing way.
 * 
 * Key Features:
 * - Flexible content areas (header, body, footer)
 * - Different variants and styles
 * - Responsive design
 * - Accessibility features
 * 
 * @author Sale-Smell Team
 * @version 1.0.0
 * @since 2024-01-01
 */

import React from 'react';

/**
 * @description Card component props
 */
interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * @description Card header component props
 */
interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * @description Card body component props
 */
interface CardBodyProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * @description Card footer component props
 */
interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * @description Card component
 * 
 * This component provides a structured container for displaying
 * content with consistent styling and spacing.
 * 
 * @param {CardProps} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='default'] - Card variant
 * @param {string} [props.padding='md'] - Card padding
 * 
 * @returns {React.JSX.Element} Card component
 */
const Card = ({
    children,
    className = '',
    variant = 'default',
    padding = 'md',
}: CardProps): React.JSX.Element => {
    // Base classes
    const baseClasses = 'rounded-lg border bg-white';

    // Variant classes
    const variantClasses = {
        default: 'border-gray-200 shadow-sm',
        elevated: 'border-gray-200 shadow-lg',
        outlined: 'border-gray-300 shadow-none',
    };

    // Padding classes
    const paddingClasses = {
        none: '',
        sm: 'p-3',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

/**
 * @description Card header component
 * 
 * @param {CardHeaderProps} props - Component props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.JSX.Element} Card header component
 */
const CardHeader = ({ children, className = '' }: CardHeaderProps): React.JSX.Element => {
    return (
        <div className={`flex flex-col space-y-1.5 ${className}`}>
            {children}
        </div>
    );
};

/**
 * @description Card title component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Title content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.JSX.Element} Card title component
 */
const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }): React.JSX.Element => {
    return (
        <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
            {children}
        </h3>
    );
};

/**
 * @description Card description component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Description content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.JSX.Element} Card description component
 */
const CardDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }): React.JSX.Element => {
    return (
        <p className={`text-sm text-gray-500 ${className}`}>
            {children}
        </p>
    );
};

/**
 * @description Card body component
 * 
 * @param {CardBodyProps} props - Component props
 * @param {React.ReactNode} props.children - Body content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.JSX.Element} Card body component
 */
const CardBody = ({ children, className = '' }: CardBodyProps): React.JSX.Element => {
    return (
        <div className={`pt-0 ${className}`}>
            {children}
        </div>
    );
};

/**
 * @description Card footer component
 * 
 * @param {CardFooterProps} props - Component props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.JSX.Element} Card footer component
 */
const CardFooter = ({ children, className = '' }: CardFooterProps): React.JSX.Element => {
    return (
        <div className={`flex items-center pt-0 ${className}`}>
            {children}
        </div>
    );
};

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter };
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps }; 