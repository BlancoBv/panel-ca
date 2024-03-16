import { FC } from "react";
import useGetData from "../../hooks/useGetData";

const Lista: FC = () => {
  const { data, isPending, error } = useGetData("/banners/obtener");
  console.log(data);

  return (
    <div>
      {!isPending && data.response.map((el: any) => <div>{el.url}</div>)}
    </div>
  );
};
export default Lista;
