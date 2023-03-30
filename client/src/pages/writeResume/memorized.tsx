import React from "react";
import AdditionalSelect from "./additionalSelect";
import FormItem, { TagInput, TextWrite, TitleInput } from "./resumesForm";
import { OptionBox } from "./optionBox";

/**
 * @description memo 파일입니다. 무분별한 리랜더링을 제어하기 위한 기능입니다.
 *
 * 회사 / 부서명 입력폼
 * 태그 / 제목 / 텍스트 입력폼
 */

/**
 * 회사 / 부서 선택 Input
 *
 * @param prevProps 기존의 Props company, department
 * @param nextProps 새로 업데이트된 Props company, department
 * @returns boolean
 */
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

const FormItemPropsAreEqual = (
  prevFormItemProps: {
    item: { title: string; text: string; tag: string; id: string };
  },
  nextFormItemProps: {
    item: { title: string; text: string; tag: string; id: string };
  }
) => {
  return prevFormItemProps.item.id === nextFormItemProps.item.id;
};
export const MemoizedFormItem = React.memo(FormItem, FormItemPropsAreEqual);

/**
 * Tag input
 *
 * @param prevProps
 * @param nextProps
 * @returns boolean
 */
const TagPropsAreEqual = (
  prevProps: { itemId: string; tag: string },
  nextProps: { itemId: string; tag: string }
) => {
  return (
    prevProps.itemId === nextProps.itemId && prevProps.tag === nextProps.tag
  );
};
export const MemoizedTagInput = React.memo(TagInput, TagPropsAreEqual);

/**
 * Title input
 *
 * @param prevProps
 * @param nextProps
 * @returns
 */
const TitlePropsAreEqual = (
  prevProps: { itemId: string; title: string },
  nextProps: { itemId: string; title: string }
) => {
  return (
    prevProps.itemId === nextProps.itemId && prevProps.title === nextProps.title
  );
};
export const MemoizedTitleInput = React.memo(TitleInput, TitlePropsAreEqual);

/**
 * Text textarea
 *
 * @param prevProps
 * @param nextProps
 * @returns
 */
const TextPropsAreEqual = (
  prevProps: { itemId: string; text: string },
  nextProps: { itemId: string; text: string }
) => {
  return (
    prevProps.itemId === nextProps.itemId && prevProps.text === nextProps.text
  );
};

export const MemoizedTextWrite = React.memo(TextWrite, TextPropsAreEqual);

/**
 * 사이드 옵션 박스
 *
 * @param prevProps
 * @param nextProps
 * @returns boolean
 */
const OptionBoxPropsAreEqual = (
  prevOptionBoxProps: { toggle: boolean },
  nextOptionBoxProps: { toggle: boolean }
) => {
  return prevOptionBoxProps.toggle === nextOptionBoxProps.toggle;
};

export const MemoizedOptionBox = React.memo(OptionBox, OptionBoxPropsAreEqual);
