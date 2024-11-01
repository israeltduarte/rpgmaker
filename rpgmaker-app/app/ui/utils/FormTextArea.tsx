import { FormTextareaProps } from "@/app/lib/definitions";

const FormTextarea: React.FC<FormTextareaProps> = ({ label, name, value, onChange, placeholder = "", required = false }) => {
  return (
    <>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}:
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </>
  );
}

export default FormTextarea;