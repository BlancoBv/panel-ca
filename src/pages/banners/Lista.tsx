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
    title: string;
    descripcion: string;
    img: string;
  }>({ title: "", descripcion: "", img: "" });

  const { data, isPending, error } = useGetData("/banners", actualizador);

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const addBanner = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Axios.post("/banners", datos);
      setActualizador(!actualizador);
      setDatos({ title: "", img: "", descripcion: "" });
    } catch (error) {}
  };
  const columnas = [
    { name: "Ultima actualización", selector: (row: any) => row.createdAt },
    {
      name: "Estado",
      selector: (row: any) => (row.mostrar ? "Visible" : "Oculto"),
    },
    {
      name: "Titulo del banner",
      selector: (row: any) => row.title,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Modal
        show={showFormAdd}
        title="Añadir banner"
        onClose={() => setShowFormAdd(false)}
      >
        <form
          className="flex gap-5 flex-col items-center p-10"
          onSubmit={addBanner}
        >
          <label>
            Titulo del banner
            <input
              type="text"
              name="title"
              value={datos.hasOwnProperty("title") ? datos["title"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Descripción del banner
            <input
              type="text"
              name="descripcion"
              value={
                datos.hasOwnProperty("descripcion") ? datos["descripcion"] : ""
              }
              onChange={handle}
              required
            />
          </label>
          <label>
            Nombre de la imagen
            <input
              type="text"
              name="img"
              value={datos.hasOwnProperty("img") ? datos["img"] : ""}
              onChange={handle}
              required
            />
          </label>
          <Button label="Enviar" tipo="submit" />
        </form>
      </Modal>
      <div className="h-1/6">
        <Button label="Añadir etiqueta" action={() => setShowFormAdd(true)} />
      </div>
      <div className="h-5/6">
        {!isPending && <Tabla data={data} error={error} columnas={columnas} />}
      </div>
    </div>
  );
};
export default Lista;
