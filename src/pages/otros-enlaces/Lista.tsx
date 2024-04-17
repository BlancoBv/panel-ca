import { ChangeEvent, FC, FormEvent, SyntheticEvent, useState } from "react";
import useGetData from "../../hooks/useGetData";
import Tabla from "../../components/Tabla";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Axios from "../../axios/Axios";

const Lista: FC = () => {
  const [showFormAdd, setShowFormAdd] = useState<boolean>(false);
  const [actualizador, setActualizador] = useState<boolean>(false);

  const [datos, setDatos] = useState<{
    nombre: string;
    enlace: string;
  }>({ enlace: "", nombre: "" });

  const { data, isPending, error } = useGetData("/menuSuperior", actualizador);

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const addBanner = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Axios.post("/menuSuperior", datos);
      setActualizador(!actualizador);
      setDatos({ enlace: "", nombre: "" });
    } catch (error) {}
  };
  const columnas = [
    { name: "Ultima actualización", selector: (row: any) => row.createdAt },

    {
      name: "Nombre del enlace",
      selector: (row: any) => row.nombre,
    },
    {
      name: "Enlace",
      selector: (row: any) => row.enlace,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Modal
        show={showFormAdd}
        title="Añadir banner"
        onClose={() => setShowFormAdd(false)}
      >
        <form className="flex flex-col items-center" onSubmit={addBanner}>
          <label>
            Nombre del enlace
            <input
              type="text"
              name="nombre"
              value={datos.hasOwnProperty("nombre") ? datos["nombre"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Enlace
            <input
              type="text"
              name="enlace"
              value={datos.hasOwnProperty("enlace") ? datos["enlace"] : ""}
              onChange={handle}
              required
            />
          </label>

          <Button label="Enviar" tipo="submit" />
        </form>
      </Modal>
      <div className="h-1/6">
        <Button label="Añadir enlace" action={() => setShowFormAdd(true)} />
      </div>
      <div className="h-5/6">
        {!isPending && <Tabla data={data} error={error} columnas={columnas} />}
      </div>
    </div>
  );
};
export default Lista;
