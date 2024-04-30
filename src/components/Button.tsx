import { FC } from "react";

const Button: FC<{
  label: string;
  action?: any | undefined;
  tipo?: "button" | "submit";
}> = ({ label, action = undefined, tipo = "button" }) => {
  return (
    <button
      className=" bg-blue-700 rounded-lg h-fit w-fit p-3 text-white mt-3"
      onClick={action}
      type={tipo}
    >
      {label}
    </button>
  );
};
export default Button;
