/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { HiPhotograph } from "react-icons/hi";
import { AiOutlinePlusSquare } from "react-icons/ai";

import Box from "_common/components/Box";
import Input from "_common/components/Input";
import Button from "_common/components/Button";
import Flex from "_common/components/Flex";
import { media } from "utils/media";

/**
 * 사이드 옵션 박스 (memo)
 */

const inputStyle = css`
  border: 0;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%);
`;
const WriteResumeOptionBox = React.forwardRef(function WriteResumeOptionBox(
  {
    toggle,
    handleSubmit,
    handleSelect,
    handleCickImageUpload,
    handleChangeImg,
    handleAdd,
  }: {
    toggle: boolean;
    handleSubmit: (e: React.SyntheticEvent) => Promise<void>;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCickImageUpload: (e: React.SyntheticEvent) => void;
    handleChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAdd: () => void;
  },
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <Box
      as="aside"
      width="300px"
      height="100%"
      display="flex"
      direction="column"
      top={0}
      right={0}
      marginLeft={10}
      marginTop={50}
      backgroundColor="gray_100"
      css={boxStyle}
    >
      <Button
        areaLabel="save"
        onClick={handleSubmit}
        // 스타일
        variant="tdred_400"
        width="100%"
        height="70px"
        marginTop={10}
        marginBottom={10}
      >
        임시 저장 하기
      </Button>
      <Button
        areaLabel="publish"
        onClick={handleSubmit}
        // 스타일
        variant="tdred_400_fill"
        width="100%"
        height="70px"
        fontSize="lg"
        marginTop={10}
        marginBottom={10}
      >
        확인
      </Button>
      <Flex
        css={css`
          margin: auto;
        `}
      >
        <select
          name="count"
          id="count-documents"
          onChange={handleSelect}
          css={css`
            width: 100%;
            height: 100%;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            margin-inline: 1rem;
            padding-left: 0.3rem;
            padding-right: 0.3rem;
            font-size: 1.5rem;
          `}
        >
          {[1, 2, 3, 4].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <Button
          onClick={handleCickImageUpload}
          variant="default"
          height="100%"
          css={css`
            display: inline-block;
            line-height: "normal";
            vertical-align: middle;
          `}
        >
          <HiPhotograph size={35} />
        </Button>
        <Input
          type="file"
          id="image-upload"
          accept="image/*"
          name="image"
          ref={forwardedRef}
          placeholder="사진 첨부"
          onChange={handleChangeImg}
          // 스타일
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          css={inputStyle}
        />
        <Button
          onClick={handleAdd}
          width="100%"
          height="100%"
          variant="default" // 스타일
        >
          <AiOutlinePlusSquare size={35} />
        </Button>
      </Flex>
    </Box>
  );
});
export default WriteResumeOptionBox;
const boxStyle = css`
  position: absolute;
  box-shadow: rgb(0 0 0 / 10%) 10px 10px 30px;
  position: sticky;
  top: 200px;
  z-index: 9;

  ${media[0]} {
    display: none;
  }
  ${media[1]} {
    display: none;
  }
  ${media[2]} {
    display: block;
  }
`;
