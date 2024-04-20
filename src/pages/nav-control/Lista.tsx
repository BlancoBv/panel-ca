import { ChangeEvent, FC, FormEvent, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { TablaDropdown } from "../../components/Tabla";
import ContextualMenu from "../../components/ContextualMenu";
import { useContextMenu } from "react-contexify";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Axios from "../../axios/Axios";
import Input, { Switch } from "../../components/Input";
import { useAllPrismicDocumentsByType } from "@prismicio/react";

const Lista: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [useRemotePost, setUseRemotePost] = useState<boolean>(false);
  const [datos, setDatos] = useState<{ nombre?: string; url?: string }>({});
  const ID_CONTEXT = "main_context";
  const { data, isPending, error } = useGetData("/menuAzul");
  const { show } = useContextMenu({ id: ID_CONTEXT });
  const [documents, { state }] = useAllPrismicDocumentsByType("post");

  console.log(documents);

  const addMenu = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Axios.post("/menuAzul", datos);
    } catch (error) {}
  };

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

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

  const contexItems = [
    {
      content: "Editar",
      show: true,
      disabled: false,
      action: () => {
        console.log("ola");
      },
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Modal
        title="Añadir nuevo elemento"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <form className="flex flex-col justify-center" onSubmit={addMenu}>
          <Input
            label="Nombre del elemento"
            handle={handle}
            name="nombre"
            variable={datos}
          />
          <Input label="URL" handle={handle} name="url" variable={datos} />
          <i>CLicl aqui si quieres seleccionar un post personalizador</i>
          <Switch label="Usar post remoto" />
          <Button label="Enviar" tipo="submit" />
        </form>
      </Modal>
      <ContextualMenu elements={contexItems} id={ID_CONTEXT} />
      <div className="h-1/6">
        <Button
          tipo="button"
          label="Añadir elemento"
          action={() => setShowModal(true)}
        />
      </div>
      <div className="h-5/6">
        {!isPending && (
          <TablaDropdown
            data={data}
            error={error}
            columnas={columnas}
            onContextAction={(event: any) => {
              show({ event });
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Lista;
