export default function FormField({
  label,
  name,
  type = 'text',
  required = false,
  defaultValue = '',
  placeholder = '',
  children,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children || (
        type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            required={required}
            defaultValue={defaultValue}
            placeholder={placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            defaultValue={defaultValue}
            placeholder={placeholder}
            step={type === 'number' ? 'any' : undefined}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        )
      )}
    </div>
  );
}
