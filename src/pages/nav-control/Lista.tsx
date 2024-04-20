import { FC } from "react";
import useGetData from "../../hooks/useGetData";
import Tabla, { TablaDropdown } from "../../components/Tabla";

const Lista: FC = () => {
  const { data, isPending, error } = useGetData("/menuAzul");

  const columnas = [
    { name: "Ultima actualización", selector: (row: any) => row.createdAt },
    {
      name: "Nombre",
      selector: (row: any) => row.nombre,
    },
    {
      name: "Url",
      selector: (row: any) => row.url,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="h-1/6">
        <button>Añadir nuevo menu</button>
      </div>
      <div className="h-5/6">
        {!isPending && (
          <TablaDropdown data={data} error={error} columnas={columnas} />
        )}
      </div>
    </div>
  );
};
export default Lista;
