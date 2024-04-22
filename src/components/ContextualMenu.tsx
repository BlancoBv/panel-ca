import { FC } from "react";
import { Menu, Item, Submenu, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export interface items {
  id: string;
  elements: {
    content: string;
    show: boolean;
    icon?: string;
    label?: string;
    disabled?: boolean | undefined;
    style?: string;
    action?: () => void;
    subOptions?: {
      content: string;
      icon: string;
      action: () => void;
    }[];
  }[];
}

const ContextualMenu: FC<items> = ({ id, elements }) => {
  const SEPARATOR = "separator";
  const SUBMENU = "submenu";
  const HASVALIDPERMS = elements.some((item) => item.show === true);
  return (
    <>
      {HASVALIDPERMS && (
        <Menu id={id}>
          {elements.map((el, i) => {
            if (el.content === SEPARATOR && el.show) {
              return <Separator key={i} />;
            }
            if (el.content === SUBMENU && el.show) {
              return (
                <Submenu
                  label={
                    <span>
                      <i className={`fa-solid ${el.icon}`} /> {el.label}
                    </span>
                  }
                  key={i}
                >
                  {el.subOptions?.map((option) => (
                    <Item key={option.content} onClick={option.action}>
                      <span>
                        {" "}
                        <i className={`fa-solid ${option.icon}`} />{" "}
                        {option.content}
                      </span>
                    </Item>
                  ))}
                </Submenu>
              );
            }
            if (el.show) {
              return (
                <Item onClick={el.action} key={i} disabled={el.disabled}>
                  <span className={el.style}>
                    <i className={`fa-solid ${el.icon}`} /> {el.content}
                  </span>
                </Item>
              );
            }
            return null;
          })}
        </Menu>
      )}
    </>
  );
};

export default ContextualMenu;
