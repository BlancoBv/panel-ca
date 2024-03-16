import { FC } from "react";
import useGetData from "../../hooks/useGetData";
import Tabla from "../../components/Tabla";

const Lista: FC = () => {
  const { data, isPending, error } = useGetData("/banners/obtener");
  console.log(data);
  const columnas = [
    { name: "Ultima actualización", selector: (row: any) => row.updatedAt },
    {
      name: "Estado",
      selector: (row: any) => (row.mostrar ? "Visible" : "Oculto"),
    },
    {
      name: "Subido por",
      selector: (row: any) => row.usuario,
    },
  ];

  return (
    <div>
      {!isPending && (
        <Tabla data={data.response} error={error} columnas={columnas} />
      )}
    </div>
  );
};
export default Lista;
