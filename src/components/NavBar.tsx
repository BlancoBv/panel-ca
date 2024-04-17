import { FC } from "react";
import { NavLink } from "react-router-dom";

const NavBar: FC = () => {
  const options = [
    { name: "Banners", route: "/banners", icon: "" },
    { name: "Rutas de navegación", route: "/nav-control", icon: "" },
    { name: "Otros enlaces", route: "/otros-enlaces", icon: "" },
    { name: "Miembros", route: "/miembros", icon: "" },
  ];
  return (
    <nav className="sm:h-full sm:w-1/6 flex flex-row sm:flex-col justify-evenly content-center dark:bg-gray-900 rounded shadow dark:shadow-none snap-x overflow-x-auto">
      {options.map((el) => (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-2 sm:border-b-0 sm:border-l-2 duration-100 border-blue-700 p-2 snap-center w28 sm:w-full"
              : "transition-all ease-in hover:border-b-2 sm:hover:border-b-0  sm:hover:border-l-2 duration-100 border-blue-700 p-2 snap-center w-28 sm:w-full"
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
