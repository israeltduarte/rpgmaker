import { FormTextareaProps } from "@/app/lib/definitions";

export default function FormTextarea({ label, name, value, onChange, placeholder = "", required = false }: FormTextareaProps) {
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
        placeholder={placeholder} // Adiciona o placeholder
        required={required} // Adiciona o required
        className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </>
  );
}