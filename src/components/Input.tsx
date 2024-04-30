import { FC, ReactNode } from "react";

const Input: FC<{
  label: string;
  tipo?: "text" | "number" | "password";
  name?: string;
  handle?: any;
  id?: string;
  required?: boolean;
  variable?: any;
  disabled?: boolean;
}> = ({
  label,
  tipo = "text",
  name = "",
  handle = undefined,
  id,
  required,
  variable,
  disabled = false,
}) => {
  return (
    <label>
      {label}
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
        name={name}
        value={
          variable
            ? variable.hasOwnProperty(name)
              ? variable[name]
              : ""
            : undefined
        }
        onChange={handle}
        type={tipo}
        id={id}
        required={required}
        disabled={disabled}
      />
    </label>
  );
};

export const TextArea: FC<{
  label: string;
  name?: string;
  handle?: any;
  id?: string;
  required?: boolean;
  variable?: any;
}> = ({ label, name = "", handle = undefined, id, required, variable }) => {
  return (
    <label>
      {label}
      <textarea
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        name={name}
        value={
          variable
            ? variable.hasOwnProperty(name)
              ? variable[name]
              : ""
            : undefined
        }
        onChange={handle}
        id={id}
        required={required}
      />
    </label>
  );
};

export const Switch: FC<{
  label: string;
  name?: string;
  handle?: any;
  id?: string;
  required?: boolean;
  variable?: any;
}> = ({ label, name = "", handle = undefined, id, required, variable }) => {
  return (
    <label>
      {label}
      <input
        type="checkbox"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        name={name}
        value={
          variable
            ? variable.hasOwnProperty(name)
              ? variable[name]
              : false
            : undefined
        }
        onChange={handle}
        id={id}
        required={required}
      />
    </label>
  );
};
export default Input;

export const Select: FC<{
  label: string;
  name?: string;
  handle?: any;
  id?: string;
  required?: boolean;
  variable?: any;
  children: ReactNode;
}> = ({
  label,
  name = "",
  handle = undefined,
  id,
  required,
  variable,
  children,
}) => {
  return (
    <label>
      {label}
      <select
        name={name}
        value={
          variable
            ? variable.hasOwnProperty(name)
              ? variable[name]
              : ""
            : undefined
        }
        onChange={handle}
        id={id}
        required={required}
      >
        {children}
      </select>
    </label>
  );
};
