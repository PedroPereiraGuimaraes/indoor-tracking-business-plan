import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  // Base layout: clean, decent padding, rounded corners
  const baseStyles = "px-6 py-3 font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm hover:shadow-md active:scale-95";
  
  const variants = {
    // Primary: Deep Charcoal, elegant
    primary: "bg-charcoal text-white hover:bg-[#2a3055]",
    
    // Secondary: Imperial Yellow, energetic
    secondary: "bg-imperial text-charcoal font-bold hover:bg-[#d9a400]",
    
    // Outline: Clean border, subtle
    outline: "bg-transparent border border-gray-300 text-gray-600 hover:border-charcoal hover:text-charcoal shadow-none",
    
    // Ghost: Text only, very clean, "Simples e Bonito"
    ghost: "bg-transparent text-gray-600 hover:text-charcoal hover:bg-gray-50 shadow-none"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;