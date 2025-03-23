type InputBoxProps = {
  name: string;
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  disabled: boolean;
  className?: string;
  step?: string;
  min?: string;
};

const InputBox = ({
  name,
  id,
  type,
  value,
  placeholder,
  onChange,
  required,
  disabled,
  className = "",
  step,
  min,
}: InputBoxProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      step={step}
      min={min}
      disabled={disabled}
      className={`w-full px-4 py-3 border text-sm border-[#e5e7eb] text-theme-gray rounded focus:outline-none focus:border-theme-blue ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      } ${className}`}
    />
  );
};

export default InputBox;
