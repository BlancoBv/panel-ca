import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { animated, useTransition } from "@react-spring/web";

const Modal: FC<{
  show: boolean;
  onClose: any;
  title: string;
  size?: "sm" | "md";
  children?: ReactNode;
}> = ({ show, onClose, title, size, children }) => {
  const transitions = useTransition(show, {
    from: { x: 0, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 0 },
    config: { duration: 300 },
  });
  const modalBoxTransition = useTransition(show, {
    from: { x: 0, y: 1000, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 1000, opacity: 0 },
    config: { duration: 200 },
  });

  return createPortal(
    transitions(
      (style, item) =>
        item && (
          <animated.div
            style={style}
            /* className="modal-container d-flex align-items-center justify-content-center" */
            className="fixed w-screen h-screen top-0 bg-slate-600/50 flex justify-center items-center"
          >
            {modalBoxTransition(
              (styleBox, itemBox) =>
                itemBox && (
                  <animated.div
                    className={`bg-white rounded p-3 flex flex-col w-11/12 h-5/6 sm:w-3/4`}
                    style={styleBox}
                  >
                    <div
                      className="flex border-b-2 relative"
                      style={{ height: size === "sm" ? "15%" : "" }}
                    >
                      <h3>{title}</h3>
                      <span
                        className="absolute end-2"
                        title="Cerrar"
                        role="button"
                        onClick={onClose}
                      >
                        <i className="fa-solid fa-x fs-5" />X
                      </span>
                    </div>
                    <div className="flex-grow modal-cuerpo overflow-auto p-8">
                      {children}
                    </div>
                  </animated.div>
                )
            )}
          </animated.div>
        )
    ),
    document.body
  );
};
export default Modal;
