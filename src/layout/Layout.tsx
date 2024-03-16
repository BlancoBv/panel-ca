import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout: FC = () => {
  return (
    <div className="size-full">
      <header className="h-1/6 shadow">
        <h1> Panel de administración CA: Computo distribuido</h1>
      </header>
      <div className="h-5/6 flex flex-row px-2">
        <NavBar />
        <section className="w-5/6">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
export default Layout;
