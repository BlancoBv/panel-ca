import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ListaBanners from "../pages/banners/Lista";
import ListaNav from "../pages/nav-control/Lista";
import ListaOtroNav from "../pages/otros-enlaces/Lista";
import ListaMiembros from "../pages/miembros/Lista";

const Routes: FC = () => {
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,

        children: [
          { index: true, element: <p>XD</p> },
          { path: "banners", element: <ListaBanners /> },
          { path: "nav-control", element: <ListaNav /> },
          { path: "otros-enlaces", element: <ListaOtroNav /> },
          { path: "miembros", element: <ListaMiembros /> },
        ],
      },
    ],
    { basename: "/panel" }
  );
  return <RouterProvider router={routes} />;
};

export default Routes;
