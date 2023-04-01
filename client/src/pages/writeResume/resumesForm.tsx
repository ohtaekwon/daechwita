/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { FaTrashAlt } from "react-icons/fa";

import Text from "_common/components/text";
import Form from "_common/components/form";
import Box from "_common/components/box";
import Input from "_common/components/input";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";

import {
  MemoizedTagInput,
  MemoizedTextWrite,
  MemoizedTitleInput,
} from "./memorized";

export const FormList = ({
  list,
  deleteForm,
  onChange,
  toggle,
}: {
  list: { id: string; title: string; text: string; tag: string }[];
  deleteForm: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  toggle: boolean;
}) => {
  return (
    <>
      {list?.map(
        (
          item: { id: string; title: string; text: string; tag: string },
          key: React.Key
        ) => (
          <FormItem
            key={key}
            item={item}
            onDelete={deleteForm}
            onChange={onChange}
            toggle={toggle}
          />
        )
      )}
    </>
  );
};

const FormItem = ({
  item,
  onDelete,
  onChange,
  toggle,
}: {
  item: { title: string; text: string; tag: string; id: string };
  onDelete: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  toggle: boolean;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, item.id);
  };

  // 삭제 버튼
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <Box
      width="100%"
      height="max-content"
      position="relative"
      backgroundColor="transparent"
      marginTop={30}
      marginBottom={20}
      css={css`
        box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px,
          rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px,
          rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;
      `}
    >
      <Button
        type="button"
        variant="tdred_400_fill"
        position="absolute"
        right={0}
        top={0}
        zIndex={9}
        onClick={handleDelete}
      >
        <FaTrashAlt />
      </Button>
      <Form
        id={item.id}
        className="form__item"
        position="relative"
        height="auto"
        css={css`
          border: 0;
        `}
      >
        <Box
          display="flex"
          width="100%"
          height="100%"
          direction="column"
          padding={0}
        >
          <MemoizedTagInput
            itemId={item.id}
            tag={item.tag}
            handleChange={handleChange}
          />

          <MemoizedTitleInput
            itemId={item.id}
            title={item.title}
            handleChange={handleChange}
          />

          <MemoizedTextWrite
            itemId={item.id}
            text={item.text}
            handleChange={handleChange}
          />

          <Text color="white">{item.title.length || 0} 자</Text>
        </Box>
      </Form>
    </Box>
  );
};
export default FormItem;

const labelStyle = css`
  width: 100%;
  color: #fff;
  margin-top: 0.8rem;
  margin-bottom: 0.2rem;
`;

const inputStyle = css`
  border: 0;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
`;

export const TagInput = React.forwardRef(function TagInput(
  {
    itemId,
    tag,
    handleChange,
  }: {
    itemId: string;
    tag: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <>
      <label css={labelStyle}> 질문 유형</label>

      <Input
        type="text"
        id="tag"
        name="tag"
        className="input__tag"
        value={tag}
        onChange={handleChange}
        placeholder="tag를 입력해주세요"
        // 스타일
        variant="resume"
        width="100%"
        height="50px"
        radius={8}
        marginTop={10}
        marginBottom={10}
        css={inputStyle}
      />
    </>
  );
});
export const TitleInput = React.forwardRef(function TagInput(
  {
    itemId,
    title,
    handleChange,
  }: {
    itemId: string;
    title: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <>
      <label css={labelStyle}> 제목 </label>

      <Input
        type="text"
        id="title"
        name="title"
        className="input__title"
        value={title}
        onChange={handleChange}
        placeholder="제목을 입력해주세요"
        // 스타일
        width="100%"
        height="50px"
        variant="resume"
        radius={8}
        marginTop={10}
        marginBottom={10}
        css={inputStyle}
      />
    </>
  );
});

export const TextWrite = React.forwardRef(function TagInput(
  {
    itemId,
    text,
    handleChange,
  }: {
    itemId: string;
    text: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  forwardedRef: React.Ref<HTMLInputElement>
) {
  return (
    <>
      <label css={labelStyle}> 내용 </label>
      <Textarea
        id="text"
        name="text"
        className="input__text"
        value={text}
        onChange={handleChange}
        placeholder="본문을 입력해주세요"
        // 스타일
        width="100%"
        height={400}
        fontSize="lg"
        color="white"
        backgroundColor="transparent"
        fontWeight={500}
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
        paddingTop={30}
        marginTop={10}
        marginBottom={10}
        css={inputStyle}
      >
        {text}
      </Textarea>
    </>
  );
});
