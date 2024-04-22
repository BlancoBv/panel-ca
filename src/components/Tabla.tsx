import { FC } from "react";

const Tabla: FC<{
  data: any;
  error: boolean;
  columnas: { name: string; selector: (name: string) => string | number }[];
  onClickAction?: any;
  onContextAction?: any;
}> = ({ data, error, columnas, onClickAction, onContextAction }) => {
  return (
    <div className="overflow-auto h-full w-full">
      {!error && (
        <table className="table-fixed w-full">
          <thead>
            <tr>
              {columnas.map((encabezado, index) => (
                <th key={index}>{encabezado.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row: any) => {
              return (
                <tr
                  className="text-center"
                  onClick={onClickAction ? () => onClickAction(row) : undefined}
                  onContextMenu={
                    onContextAction ? (e) => onContextAction(e, row) : undefined
                  }
                  role={onClickAction ? "button" : ""}
                >
                  {columnas.map((target) => (
                    <td>{target.selector(row)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* {error && <NoContent />} */}
    </div>
  );
};

export const TablaDropdown: FC<{
  data: any;
  error: boolean;
  columnas: {
    name: string;
    selector: (name: string) => string | number;
  }[];
  onClickAction?: any;
  onContextAction?: any;
  onContextActionSecondary?: any;
}> = ({
  data,
  columnas,
  onClickAction,
  onContextAction,
  onContextActionSecondary,
  error,
}) => {
  const openAccordion = (e: any) => {
    const classList = e.currentTarget.nextSibling.classList;
    console.log(e.currentTarget, classList);
    if (classList.length === 4) {
      e.currentTarget.nextSibling.classList.remove("collapse");
    } else {
      e.currentTarget.nextSibling.classList.add("collapse");
    }
  };

  return (
    <div className="overflow-auto h-full w-full">
      {!error && (
        <table className="table-fixed w-full">
          <thead>
            <tr>
              {columnas.map((encabezado, index) => (
                <th key={index}>{encabezado.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row: any) => {
              return (
                <>
                  <tr
                    className="text-center h-16 border-b"
                    onClick={openAccordion}
                    onContextMenu={
                      onContextAction
                        ? (e) => onContextAction(e, row)
                        : undefined
                    }
                    role={onClickAction ? "button" : ""}
                  >
                    {columnas.map((target) => (
                      <td>{target.selector(row)}</td>
                    ))}
                  </tr>
                  <tr className="collapse text-center bg-gray-700 rounded-b">
                    <td colSpan={columnas.length}>
                      <table className="table-fixed w-full">
                        <thead>
                          <tr>
                            <th>Ultima Actualizacion</th>
                            <th>Nombre</th>
                            <th>Url</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.SubMenus.map((el: any, index: number) => (
                            <tr
                              className=" h-16 border-b"
                              onContextMenu={(e) =>
                                onContextActionSecondary
                                  ? onContextActionSecondary(e, row, index)
                                  : undefined
                              }
                            >
                              <td>{el.createdAt}</td>
                              <td>{el.nombre}</td>
                              <td>{el.url}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
      {/* {error && <NoContent />} */}
    </div>
  );
};
export default Tabla;
