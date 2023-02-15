import React from "react";
import * as Styled from "./index.styles";
import { ModalProps, PortalProps } from "./index.types";

import { createPortal } from "react-dom";
import { MdCancel } from "react-icons/md";

import Button from "_common/components/button";
import { Form } from "react-router-dom";

const ModalPortal = ({
  elementId,
  children,
}: React.PropsWithChildren<PortalProps>) => {
  return createPortal(children, document.getElementById(elementId)!);
};

const Modal = ({
  elementId,
  show,
  cancel,
  children,
}: React.PropsWithChildren<ModalProps>) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

    return () => {
      // 모달이 사라지면 style 코드 지워주고 원래 있던 위치로 돌려주기
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return show ? (
    <ModalPortal elementId={elementId}>
      <Styled.Wrapper show={show}>
        <Styled.Inner className="modal__inner">
          <Styled.Content>
            <Button onClick={cancel} variant={"default"} marginBottom={30}>
              <MdCancel size={30} />
            </Button>
            <form style={{ display: "flex" }}>
              <input
                type="text"
                id="title"
                style={{ border: "1px solid #000" }}
              />
              <input type="text" style={{ border: "1px solid #000" }} />
              <input type="text" style={{ border: "1px solid #000" }} />
              <input type="text" style={{ border: "1px solid #000" }} />
            </form>
          </Styled.Content>
        </Styled.Inner>
      </Styled.Wrapper>
    </ModalPortal>
  ) : null;
};

export default Modal;
{
  /* <Modal show={modalShown} cancel={cancel} /> */
}
