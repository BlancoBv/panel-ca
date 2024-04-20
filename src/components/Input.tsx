import { FC } from "react";

const Input: FC<{
  label: string;
  tipo?: "text" | "number" | "password";
  name?: string;
  handle?: any;
  id?: string;
  required?: boolean;
  variable?: any;
}> = ({
  label,
  tipo = "text",
  name = "",
  handle = undefined,
  id,
  required,
  variable,
}) => {
  return (
    <label>
      {label}
      <input
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
        type={tipo}
        id={id}
        required={required}
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
export default Input;
