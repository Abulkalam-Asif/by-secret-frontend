type ImageInputProps = {
  label: string;
  value: {
    file: File | null;
    base64: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  idHtmlFor: string;
  disabled?: boolean;
  className?: string;
  classNameOuter?: string;
};

const ImageInput = ({
  label,
  idHtmlFor,
  value,
  onChange,
  disabled = false,
  className = "",
  classNameOuter = "",
}: ImageInputProps) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          target: {
            name: idHtmlFor,
            value: { file, base64: reader.result as string },
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={`flex ${classNameOuter}`}>
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
          {value.file ? (
            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
              {value.file?.name.length > 20
                ? `${value.file?.name.slice(0, 20)}...`
                : value.file?.name}
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
