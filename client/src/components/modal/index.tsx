import React from "react";
import * as Styled from "./index.styles";
import { ModalProps, PortalProps } from "./index.types";

import { createPortal } from "react-dom";
import { MdCancel } from "react-icons/md";

import Button from "_common/components/button";

const ModalPortal = ({
  elementId,
  children,
}: React.PropsWithChildren<PortalProps>) => {
  return createPortal(children, document.getElementById(elementId)!);
};

const Modal = ({
  elementId,
  modalType,
  width = "auto",
  height = "auto",
  show,
  cancel,
  children,
}: React.PropsWithChildren<ModalProps>) => {
  return show ? (
    <ModalPortal elementId={elementId}>
      <Styled.Wrapper show={show}>
        <Styled.Inner className="modal__inner" width={width} height={height}>
          <Styled.Content className="modal__content">
            <Button
              areaLabel={modalType === "update" ? "updateCancel" : "delete"}
              onClick={cancel}
              variant="default"
              position="absolute"
              top={0}
              right={0}
              marginBottom={30}
            >
              <MdCancel size={30} />
            </Button>
            {children}
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
