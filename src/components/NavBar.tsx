import { FC } from "react";
import { NavLink } from "react-router-dom";

const NavBar: FC = () => {
  const options = [
    { name: "Banners", route: "/banners", icon: "" },
    { name: "Banners", route: "/banner", icon: "" },
  ];
  return (
    <nav className="h-full w-1/6 flex flex-col justify-evenly content-center">
      {options.map((el) => (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-l-2 duration-100 border-blue-700 p-2"
              : "transition-all ease-in hover:border-l-2 duration-100 border-blue-700 p-2"
          }
          to={el.route}
          key={el.name}
        >
          {el.name}
        </NavLink>
      ))}
    </nav>
  );
};
export default NavBar;
