type InputBoxProps = {
  name: string;
  idHtmlFor: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  disabled: boolean;
  className: string;
};

const InputBox = ({
  name,
  idHtmlFor,
  type,
  value,
  placeholder,
  onChange,
  required,
  disabled,
  className = "",
}: InputBoxProps) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={idHtmlFor}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border text-sm border-[#e5e7eb] text-theme-gray rounded focus:outline-none focus:border-theme-blue ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        } ${className}`}
      />
    </div>
  );
};

export default InputBox;
