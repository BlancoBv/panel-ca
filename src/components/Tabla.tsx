import { FC } from "react";

const Tabla: FC<{
  data: [];
  error: boolean;
  columnas: { name: string; selector: (name: string) => string | number }[];
  onClickAction?: any;
  onContextAction?: any;
}> = ({ data, error, columnas, onClickAction, onContextAction }) => {
  return (
    <div className="overflow-auto h-100 w-100">
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
            {data.map((row) => {
              return (
                <tr
                  className="text-center"
                  onClick={onClickAction ? () => onClickAction(row) : undefined}
                  onContextMenu={
                    onContextAction ? (e) => onContextAction(e, row) : undefined
                  }
                  role="button"
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
export default Tabla;
