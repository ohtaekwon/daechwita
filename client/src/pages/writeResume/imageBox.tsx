/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ImCancelCircle } from "react-icons/im";

import Box from "_common/components/Box";
import Button from "_common/components/Button";
import Text from "_common/components/Text";
import { media } from "utils/media";

const ImageBox = ({
  imageFile,
  onClear,
  onImageUpload,
}: {
  imageFile: any;
  onClear: () => void;
  onImageUpload: () => void;
}) => {
  return (
    <>
      <Box
        width="250px"
        height="100%"
        display="flex"
        direction="column"
        justifyContent="left"
        alignItems="center"
        position="relative"
        margin={0}
        radius={8}
        css={imageBoxStyle}
      >
        {imageFile && (
          <>
            <Button
              variant="tdred_400"
              areaLabel="publish"
              position="absolute"
              top={0}
              right={0}
              onClick={onClear}
              css={css`
                border-radius: 0;
              `}
            >
              <ImCancelCircle size={20} />
            </Button>
            <img
              src={imageFile}
              css={css`
                width: 100%;
                height: 100%;
                background-image: ${imageFile};
              `}
            />
          </>
        )}
        {!!!imageFile && (
          <Box
            onClick={onImageUpload}
            width="100%"
            height="100%"
            backgroundColor="transparent"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingLeft={5}
            paddingRight={5}
            paddingTop={5}
            paddingBottom={5}
            css={css`
              box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
                rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
              cursor: pointer;
            `}
          >
            <Text color="white" textAlign="center">
              지원할 회사의 로고 이미지를 첨부해주세요
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};
export default ImageBox;

const imageBoxStyle = css`
  ${media[0]} {
    height: 250px;
  }
  ${media[1]} {
    height: 250px;
  }
  ${media[2]} {
    height: 250px;
  }
`;
