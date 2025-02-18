interface InputProps {
  type: string;
  id: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  privateInput?: boolean;
}

export default function Input({
  type,
  id,
  name,
  className,
  placeholder,
  required,
  min,
  privateInput,
}: InputProps) {
  let inputClasses = "border-4 rounded-xl px-2 mx-1.5 my-0.5";

  if (privateInput) {
    inputClasses = `${inputClasses} border-sine-blue`;
  } else {
    inputClasses = `${inputClasses} border-sine-green`;
  }

  return (
    <input
      type={type}
      min={min}
      id={id}
      name={name}
      className={`${inputClasses} ${className}`}
      placeholder={placeholder}
      required={required}
    />
  );
}
