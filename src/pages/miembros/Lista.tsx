import { ChangeEvent, FC, FormEvent, useState } from "react";
import useGetData from "../../hooks/useGetData";
import Tabla from "../../components/Tabla";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Axios from "../../axios/Axios";
import Input, { TextArea } from "../../components/Input";

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
    contacto: {
      redes: any;
      contactos: any;
    };
  }>({
    nombre: "",
    apepat: "",
    apemat: "",
    puesto: "",
    grado: "",
    resumen: "",
    img: "",
    bio: "",
    contacto: {
      redes: [],
      contactos: [],
    },
  });

  const { data, isPending, error } = useGetData("/miembros", actualizador);

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCorreos = () => {
    const element = document.getElementById(
      "correoContacto"
    ) as HTMLInputElement;
    if (element.value === "") return; //evita que se ejecute el codigo de abajo si el valor del formulario esta vacio

    const actualValues = datos.contacto.contactos.filter(
      (el: string) => el !== element.value
    );
    const nextValue = [...actualValues, element.value];

    setDatos({
      ...datos,
      contacto: { contactos: [...nextValue], redes: datos.contacto.redes },
    });
    element.value = "";
  };
  const handleDeleteCorreos = (value: string) => {
    const actualValues = datos.contacto?.contactos.filter(
      (el: string) => el !== value
    );
    setDatos({
      ...datos,
      contacto: { contactos: [...actualValues], ...datos.contacto?.redes },
    });
  };

  const handleAddSocial = () => {
    const plataforma = document.getElementById(
      "plataforma"
    ) as HTMLInputElement;
    const enlace = document.getElementById("enlace") as HTMLInputElement;

    if (plataforma.value === "" || enlace.value === "") return;

    const actualValue = datos.contacto.redes.filter(
      (red: { plataforma: string; url: string }) =>
        red.plataforma !== plataforma.value || red.url !== enlace.value
    );

    const nextValue = [
      ...actualValue,
      { plataforma: plataforma.value, url: enlace.value },
    ];

    setDatos({
      ...datos,
      contacto: { redes: [...nextValue], contactos: datos.contacto.contactos },
    });
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
        contacto: {
          redes: [],
          contactos: [],
        },
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

  console.log(datos);

  return (
    <div className="flex flex-col h-full">
      <Modal
        show={showFormAdd}
        title="Añadir banner"
        onClose={() => setShowFormAdd(false)}
      >
        <form className="flex flex-col items-center" onSubmit={addBanner}>
          <div className="flex gap-2 flex-wrap">
            <Input
              label="Nombre"
              tipo="text"
              name="nombre"
              handle={handle}
              variable={datos}
              required
            />
            <Input
              label="Apellido Paterno"
              tipo="text"
              name="apepat"
              handle={handle}
              variable={datos}
              required
            />
            <Input
              label="Apellido materno"
              tipo="text"
              name="apemat"
              handle={handle}
              variable={datos}
              required
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Input
              label="Puesto"
              tipo="text"
              name="puesto"
              handle={handle}
              variable={datos}
              required
            />
            <div className="w-36">
              <Input
                label="Grado de estudios"
                tipo="text"
                name="grado"
                handle={handle}
                variable={datos}
                required
              />
            </div>
            <Input
              label="Imagen del perfil"
              tipo="text"
              name="img"
              handle={handle}
              variable={datos}
              required
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <TextArea
              label="Resumen"
              name="resumen"
              handle={handle}
              variable={datos}
              required
            />
            <TextArea
              label="Bio"
              name="bio"
              handle={handle}
              variable={datos}
              required
            />
          </div>

          <div className="flex gap-2">
            <Input
              label="Correo de contacto"
              tipo="text"
              id="correoContacto"
              required
            />
            <button type="button" onClick={handleAddCorreos}>
              Añadir
            </button>
          </div>
          <div>
            Lista de correos:
            <ol>
              {datos.contacto?.contactos.map((el: string, index: number) => (
                <li key={index}>
                  {el}{" "}
                  <button type="button" onClick={() => handleDeleteCorreos(el)}>
                    Eliminar correo
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex gap-2">
            <Input label="Plataforma" id="plataforma" />
            <Input label="Enlace de la red social" id="enlace" />
            <button type="button" onClick={handleAddSocial}>
              Añadir
            </button>
          </div>
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
