/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import * as Styled from "./index.styles";
import { ModalProps, PortalProps } from "./index.types";

import { createPortal } from "react-dom";
import { MdCancel } from "react-icons/md";

import Button from "_common/components/button";
import { media } from "utils/media";

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
  const style = modalType === "update" && modalStyle;
  return show ? (
    <ModalPortal elementId={elementId}>
      <Styled.Wrapper show={show}>
        <Styled.Inner width={width} height={height} css={style}>
          <Styled.Content>
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
const modalStyle = css`
  ${media[0]} {
    width: 90%;
    height: 90%;
  }
  ${media[1]} {
    width: 80%;
    height: 90%;
  }
  ${media[2]} {
    width: 50%;
    height: 90%;
  }
`;
