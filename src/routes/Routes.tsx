import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ListaBanners from "../pages/banners/Lista";

const Routes: FC = () => {
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,

        children: [
          { index: true, element: <p>XD</p> },
          { path: "banners", element: <ListaBanners /> },
        ],
      },
    ],
    { basename: "/panel" }
  );
  return <RouterProvider router={routes} />;
};

export default Routes;
