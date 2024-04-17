import { FC } from "react";

const Button: FC<{
  label: string;
  action?: any | undefined;
  tipo?: "button" | "submit";
}> = ({ label, action = undefined, tipo = "button" }) => {
  return (
    <button onClick={action} type={tipo}>
      {label}
    </button>
  );
};
export default Button;
