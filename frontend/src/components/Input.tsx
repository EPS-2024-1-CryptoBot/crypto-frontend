interface InputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  onBlur,
  error
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="border border-gray-300 rounded p-2 w-full md:w-80"
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
