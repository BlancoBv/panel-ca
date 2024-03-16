import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout: FC = () => {
  return (
    <div className="size-full bg-white dark:bg-slate-950 dark:text-white">
      <header className="h-1/6 shadow dark:shadow-gray-800 dark:bg-gray-900">
        <h1> Panel de administración CA: Computo distribuido</h1>
      </header>
      <div className="h-5/6 flex flex-col sm:flex-row p-2 gap-2">
        <NavBar />
        <section className="flex-grow sm:w-5/6 dark:bg-gray-900 rounded p-2 shadow dark:shadow-none">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
export default Layout;
