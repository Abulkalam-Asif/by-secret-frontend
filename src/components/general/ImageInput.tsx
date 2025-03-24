type ImageInputProps = {
  label: string;
  value: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  idHtmlFor: string;
  disabled?: boolean;
  className?: string;
};

const ImageInput = ({
  label,
  idHtmlFor,
  value,
  onChange,
  disabled = false,
  className = "",
}: ImageInputProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      const event = {
        target: {
          name: idHtmlFor,
          value: e.target.files[0],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <>
      <div className="flex">
        <input
          id={idHtmlFor}
          type="file"
          className="w-0 h-0 peer"
          onChange={inputHandler}
          disabled={disabled}
          accept="image/*"
        />
        <label
          title={label}
          htmlFor={idHtmlFor}
          className={`cursor-pointer w-full px-4 py-3 border text-sm border-[#e5e7eb] text-theme-gray rounded peer-focus:outline-none peer-focus:border-theme-blue flex items-center justify-center ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          } ${className}`}>
          {value ? (
            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
              {value.name}
            </span>
          ) : (
            <span className="text-[#939da7]">{label}</span>
          )}
        </label>
      </div>
    </>
  );
};

export default ImageInput;
