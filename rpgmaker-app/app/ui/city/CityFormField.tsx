import { FormFieldProps } from "@/app/lib/definitions";

const CityFormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, placeholder = "", required = false, className }) => {
  return (
    <>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}:
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`border-2 ${className} rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      />
    </>
  );
}

export default CityFormField;