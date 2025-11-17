import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// Style: Soft gray box, rounded corners, subtle transition
const baseInputStyles = "w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-imperial/30 focus:ring-4 focus:ring-imperial/10 outline-none transition-all duration-200 text-charcoal placeholder-gray-400 text-sm font-medium";
const labelStyles = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1";

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full mb-4 group">
      <label className={`${labelStyles} group-focus-within:text-imperial transition-colors`}>{label}</label>
      <input 
        className={`${baseInputStyles} ${error ? 'bg-red-50 border-red-200' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full mb-4 group">
      <label className={`${labelStyles} group-focus-within:text-imperial transition-colors`}>{label}</label>
      <textarea 
        rows={3} // Reduced rows to fit "one screen" better
        className={`${baseInputStyles} resize-none ${error ? 'bg-red-50 border-red-200' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
};

// Select with "Other" option logic
interface SelectWithOtherProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
}

export const SelectWithOther: React.FC<SelectWithOtherProps> = ({ 
  label, 
  name, 
  options, 
  value, 
  onChange,
  placeholder = "Selecione..."
}) => {
  const [isCustom, setIsCustom] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync state with incoming value
  useEffect(() => {
    const isKnownOption = options.includes(value);
    if (value && !isKnownOption) {
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
  }, [value, options]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "OTHER_OPTION") {
      setIsCustom(true);
      // Clear value temporarily so input starts empty or allows typing
      onChange({ target: { name, value: "" } });
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setIsCustom(false);
      onChange({ target: { name, value: val } });
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ target: { name, value: e.target.value } });
  };

  const resetToSelect = () => {
    setIsCustom(false);
    onChange({ target: { name, value: "" } });
  };

  return (
    <div className="w-full mb-4 group">
      <label className={`${labelStyles} group-focus-within:text-imperial transition-colors`}>{label}</label>
      
      {!isCustom ? (
        <div className="relative">
          <select 
            className={`${baseInputStyles} appearance-none cursor-pointer`}
            value={options.includes(value) ? value : ""}
            onChange={handleSelectChange}
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
            <option value="OTHER_OPTION" className="text-charcoal font-medium">+ Outro (Especificar)</option>
          </select>
          {/* Chevron Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      ) : (
        <div className="relative animate-fade-in-up">
          <input 
            ref={inputRef}
            type="text"
            className={`${baseInputStyles} pr-10`} // Extra padding for X button
            value={value}
            onChange={handleCustomChange}
            placeholder="Digite a opção..."
          />
          <button 
            type="button"
            onClick={resetToSelect}
            className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center"
            title="Voltar para lista"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};