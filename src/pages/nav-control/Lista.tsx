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
  const [relativeData, setRelativeData] = useState<{ id?: string }>({});
  const [baseUrl, setBaseUrl] = useState<string>("");

  const [useRemotePost, setUseRemotePost] = useState<boolean>(false);
  const [datos, setDatos] = useState<{ nombre?: string; url?: string }>({});
  const [isPUT, setIsPUT] = useState<boolean>(false);
  const ID_CONTEXT = "main_context";
  /*   const ID_CONTEXT_2 = "secondary_context"; */
  const { data, isPending, error } = useGetData("/menuAzul", actualizador);
  const { show } = useContextMenu({ id: ID_CONTEXT });
  //const { show: context2 } = useContextMenu({ id: ID_CONTEXT_2 });
  const post = useGetData("/post");

  const addMenu = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await Axios.post(
        `/menuAzul${baseUrl}`,
        baseUrl === "" ? datos : { ...datos, menu: relativeData.id }
      );
      setActualizador(!actualizador);
      setShowModal(false);
      setDatos({});
    } catch (error) {
      console.log(error);
    }
  };
  const updateMenu = async (e: FormEvent) => {
    e.preventDefault();
    console.log(relativeData);

    try {
      await Axios.put(`/menuAzul/${baseUrl}${relativeData?.id}`, datos);
      setActualizador(!actualizador);
      setShowModal(false);
      setDatos({});
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
  const trigger = (event: any, row: any) => {
    const { nombre, url, id } = row;
    setRelativeData({ id });
    setBaseUrl("");
    setDatos({ nombre, url });
    show({ event });
  };
  const trigger2 = (event: any, row: any, index: number) => {
    const { nombre, url, id } = row.SubMenus[index];
    setBaseUrl("subMenu/");
    setRelativeData({ id });
    setDatos({ nombre, url });
    show({ event });
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
      content: "Añadir submenú",
      show: true,
      disabled: false,
      action: () => {
        setIsPUT(false);
        setDatos({});
        setBaseUrl("/subMenu");
        setShowModal(true);
      },
    },

    {
      content: "Editar",
      show: true,
      disabled: false,
      action: () => {
        setIsPUT(true);
        setShowModal(true);
      },
    },
    { content: "separator", show: true, disabled: false },
    { content: "Eliminar", show: true, disabled: false },
  ];

  return (
    <div className="flex flex-col h-full">
      <Modal
        title="Añadir nuevo elemento"
        show={showModal}
        onClose={() => {
          setDatos({});
          setBaseUrl("");
          setIsPUT(false);
          setShowModal(false);
        }}
      >
        <form
          className="flex flex-col justify-center"
          onSubmit={isPUT ? updateMenu : addMenu}
        >
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
                  <option key={el.id} value={`post${el.url}`}>
                    {el.url}
                  </option>
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
          action={() => {
            setBaseUrl("");
            setIsPUT(false);
            setShowModal(true);
          }}
        />
      </div>
      <div className="h-5/6">
        {!isPending && (
          <TablaDropdown
            data={data}
            error={error}
            columnas={columnas}
            onContextAction={trigger}
            onContextActionSecondary={trigger2}
          />
        )}
      </div>
    </div>
  );
};
export default Lista;
