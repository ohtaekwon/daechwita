/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import Box from "_common/components/Box";
import Input from "_common/components/Input";
import { media } from "utils/media";

/**
 * 상단의 회사/부서 선택 Input (memo)
 */
const WriteResumeAdditionalSelect = React.forwardRef(
  function WriteResumeAdditionalSelect(
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
          height="100%"
          display="flex"
          direction="column"
          justifyContent="flex-end"
          alignItems="end"
          backgroundColor="transparent"
          css={selectBoxStyle}
        >
          <label
            css={css`
              color: #fff;
              margin: 8px 0;
            `}
          >
            회사명
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
              css={inputStyle}
            />
          </label>
          <label
            css={css`
              color: #fff;
              margin: 8px 0;
            `}
          >
            직무명
            <Input
              type="text"
              name="department"
              placeholder="직무를 입력해주세요"
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
              css={inputStyle}
            />
          </label>
        </Box>
      </>
    );
  }
);
export default WriteResumeAdditionalSelect;

const AdditionalSelectPropsAreEqual = (
  prevAdditionalProps: { company: string; department: string },
  nextAdditionalProps: { company: string; department: string }
) => {
  return (
    prevAdditionalProps.company === nextAdditionalProps.company &&
    prevAdditionalProps.department === nextAdditionalProps.department
  );
};

export const MemoizedWriteResumeAdditionalSelect = React.memo(
  WriteResumeAdditionalSelect,
  AdditionalSelectPropsAreEqual
);

const inputStyle = css`
  border: 0;
  /* box-shadow: 0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%); */
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

  ${media[0]} {
    width: 100%;
  }
  ${media[1]} {
    width: 700px;
  }
  ${media[2]} {
    width: 500px;
  }
`;

const selectBoxStyle = css`
  border: 0;
`;
