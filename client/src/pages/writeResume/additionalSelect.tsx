/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import Box from "_common/components/box";
import Input from "_common/components/input";

/**
 * 상단의 회사/부서 선택 Input (memo)
 */
const AdditionalSelect = React.forwardRef(function AdditionalSelect(
  {
    company,
    department,
    setAdditionalInfo,
  }: {
    company: string;
    department: string;
    setAdditionalInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <>
      <Box
        width="100%"
        height="300px"
        display="flex"
        direction="column"
        justifyContent="flex-end"
        alignItems="end"
        backgroundColor="transparent"
        css={borderStyle}
      >
        <Input
          type="text"
          name="company"
          placeholder="회사를 입력해주세요"
          className="input__company"
          value={company}
          onChange={setAdditionalInfo}
          // 스타일
          width="500px"
          height="50px"
          variant="resume"
          radius={8}
          marginBottom={10}
          marginTop={10}
          marginLeft={10}
          marginRight={10}
          css={inputStyle}
        />
        <Input
          type="text"
          name="department"
          placeholder="부서를 입력해주세요"
          className="input__department"
          value={department}
          onChange={setAdditionalInfo}
          // 스타일
          width="500px"
          height="50px"
          variant="resume"
          radius={8}
          marginBottom={10}
          marginTop={10}
          marginLeft={10}
          marginRight={10}
          css={inputStyle}
        />
      </Box>
    </>
  );
});
export default AdditionalSelect;

const AdditionalSelectPropsAreEqual = (
  prevAdditionalProps: { company: string; department: string },
  nextAdditionalProps: { company: string; department: string }
) => {
  return (
    prevAdditionalProps.company === nextAdditionalProps.company &&
    prevAdditionalProps.department === nextAdditionalProps.department
  );
};

export const MemoizedAdditionalSelect = React.memo(
  AdditionalSelect,
  AdditionalSelectPropsAreEqual
);

const inputStyle = css`
  border: 0;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%);
`;

const borderStyle = css`
  border: 0;
`;
