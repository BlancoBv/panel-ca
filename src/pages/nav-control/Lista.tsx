import { ChangeEvent, FC, FormEvent, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { TablaDropdown } from "../../components/Tabla";
import ContextualMenu from "../../components/ContextualMenu";
import { useContextMenu } from "react-contexify";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Axios from "../../axios/Axios";
import Input, { Select, Switch } from "../../components/Input";
const Lista: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [actualizador, setActualizador] = useState<boolean>(false);

  const [useRemotePost, setUseRemotePost] = useState<boolean>(false);
  const [datos, setDatos] = useState<{ nombre?: string; url?: string }>({});
  const ID_CONTEXT = "main_context";
  const { data, isPending, error } = useGetData("/menuAzul", actualizador);
  const { show } = useContextMenu({ id: ID_CONTEXT });
  const post = useGetData("/post");

  const addMenu = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Axios.post("/menuAzul", datos);
      setActualizador(!actualizador);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseRemote = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setUseRemotePost(true);
    } else {
      setUseRemotePost(false);
    }
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

  console.log(useRemotePost);

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
            required
          />
          <Input
            label="URL"
            handle={handle}
            name="url"
            variable={datos}
            disabled={useRemotePost}
            required
          />
          <Switch
            label="Usar post remoto"
            variable={useRemotePost}
            handle={handleUseRemote}
          />

          {useRemotePost && (
            <Select
              label="Rutas remotas"
              name="url"
              variable={datos}
              handle={handle}
            >
              <option value="">Selecciona una ruta...</option>
              {!post.isPending &&
                post.data.map((el: any) => (
                  <option value={`post${el.url}`}>{el.url}</option>
                ))}
              {/* <option
                onClick={() =>
                  window.open(
                    `${import.meta.env.PUBLIC_PRISMIC_API_URL}`,
                    "__blank"
                  )
                }
              >
                Añadir nuevo elemento
              </option> */}
            </Select>
          )}

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
