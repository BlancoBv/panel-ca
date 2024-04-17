import { ChangeEvent, FC, FormEvent, useState } from "react";
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
    apepat: string;
    apemat: string;
    puesto: string;
    grado: string;
    resumen: string;
    img: string;
    bio: string;
    contacto?: {
      redes: { plataforma: string; url: string }[];
      contactos: [];
    }[];
  }>({
    nombre: "",
    apepat: "",
    apemat: "",
    puesto: "",
    grado: "",
    resumen: "",
    img: "",
    bio: "",
  });

  const { data, isPending, error } = useGetData("/miembros", actualizador);

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const addBanner = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Axios.post("/miembros", datos);
      setActualizador(!actualizador);
      setDatos({
        nombre: "",
        apepat: "",
        apemat: "",
        puesto: "",
        grado: "",
        resumen: "",
        img: "",
        bio: "",
      });
    } catch (error) {}
  };
  const columnas = [
    { name: "Ultima actualización", selector: (row: any) => row.createdAt },
    {
      name: "Nombre completo del miembro",
      selector: (row: any) => `${row.nombre} ${row.apepat} ${row.apemat}`,
    },
    {
      name: "Puesto del miemro",
      selector: (row: any) => row.puesto,
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
            Nombre
            <input
              type="text"
              name="nombre"
              value={datos.hasOwnProperty("nombre") ? datos["nombre"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Apellido paterno
            <input
              type="text"
              name="apepat"
              value={datos.hasOwnProperty("apepat") ? datos["apepat"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Apellido materno
            <input
              type="text"
              name="apemat"
              value={datos.hasOwnProperty("apemat") ? datos["apemat"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Puesto
            <input
              type="text"
              name="puesto"
              value={datos.hasOwnProperty("puesto") ? datos["puesto"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Grado de estudios
            <input
              type="text"
              name="grado"
              value={datos.hasOwnProperty("grado") ? datos["grado"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Imagen de perfil
            <input
              type="text"
              name="img"
              value={datos.hasOwnProperty("img") ? datos["img"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Resumen
            <input
              type="text"
              name="resumen"
              value={datos.hasOwnProperty("resumen") ? datos["resumen"] : ""}
              onChange={handle}
              required
            />
          </label>
          <label>
            Bio
            <input
              type="text"
              name="bio"
              value={datos.hasOwnProperty("bio") ? datos["bio"] : ""}
              onChange={handle}
            />
          </label>
          {/*    <label>
            Bio
            <input
              type="text"
              name="bio"
              value={datos.hasOwnProperty("bio") ? datos["bio"] : ""}
              onChange={handle}
            />
          </label> */}
          <Button label="Enviar" tipo="submit" />
        </form>
      </Modal>
      <div className="h-1/6">
        <Button label="Añadir miembro" action={() => setShowFormAdd(true)} />
      </div>
      <div className="h-5/6">
        {!isPending && <Tabla data={data} error={error} columnas={columnas} />}
      </div>
    </div>
  );
};
export default Lista;
