/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import { FaTrashAlt } from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";

import useModal from "hooks/app/useGoBack";

import Text from "_common/components/Text";
import Form from "_common/components/Form";
import Box from "_common/components/Box";
import Input from "_common/components/Input";
import Button from "_common/components/Button";
import Textarea from "_common/components/Textarea";

import {
  MemoizedTagInput,
  MemoizedTextWrite,
  MemoizedTitleInput,
} from "./Memorized";
import Modal from "components/Modal";
import Flex from "_common/components/Flex";
import { theme } from "styles";

export const FormList = ({
  list,
  deleteForm,
  onChange,
}: {
  list: { id: string; title: string; text: string; tag: string }[];
  deleteForm: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
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
}: {
  item: { title: string; text: string; tag: string; id: string };
  onDelete: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}) => {
  const { modalShow, toggleModal, cancel } = useModal();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, item.id);
  };

  // 삭제 버튼
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <>
      <Box
        width="100%"
        height="max-content"
        position="relative"
        backgroundColor="zinc_100"
        marginTop={30}
        marginBottom={20}
        css={css`
          box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px,
            rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px,
            rgb(255, 156, 85) 0px 0px 0px 12px,
            rgb(255, 85, 85) 0px 0px 0px 15px;
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
            <Text color="zinc_900">{item.title.length || 0} 자</Text>
          </Box>
        </Form>
      </Box>
    </>
  );
};
export default FormItem;

const labelStyle = css`
  width: 100%;
  color: #000;
  margin-top: 0.8rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
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
  const { modalShow, toggleModal, cancel } = useModal();

  return (
    <>
      <label css={labelStyle}>
        질문 유형
        <Button variant="default" onClick={() => toggleModal((prev) => !prev)}>
          <MdLiveHelp size={20} />
        </Button>
      </label>

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
      <Modal
        modalType="delete"
        elementId="modal"
        width="900px"
        height="900px"
        show={modalShow}
        cancel={cancel}
      >
        <Box
          variant="default"
          display="flex"
          direction="column"
          padding="5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize="xxl"
            fontWeight={700}
            textAlign="center"
            css={css`
              width: 100%;
              height: 10px;
              padding: 2rem;
              margin-top: 20px;
              margin-bottom: 30px;
            `}
          >
            질문 유형의 작성 방법
          </Text>
          <Flex width="80%%" direction="column" justifyContent="center">
            <Text fontSize="xl" fontWeight={500} css={mainTextStyle}>
              1. 기업, 직무관련 지원동기 유형 작성 예시
            </Text>
            {["지원동기", "직무경험", "직무준비과정"].map((item, index) => (
              <h4 key={`${item}-${index}`} css={subTextStyle}>
                {item}
              </h4>
            ))}

            <Text fontSize="xl" fontWeight={500} css={mainTextStyle}>
              2. 인성 및 생활신조와 가치관 유형 작성 예시
            </Text>
            {["회사선택기준", "갈등경험", "n년후 목표"].map((item, index) => (
              <h4 key={`${item}-${index}`} css={subTextStyle}>
                {item}
              </h4>
            ))}
            <Text fontSize="xl" fontWeight={500} css={mainTextStyle}>
              3. 자기PR, 자기소개 유형 작성 예시
            </Text>
            {[
              "성장과정",
              "노력경험",
              "협업경험",
              "목표달성경험",
              "공동의 목표달성",
            ].map((item, index) => (
              <h4 key={`${item}-${index}`} css={subTextStyle}>
                {item}
              </h4>
            ))}
            <Text fontSize="xl" fontWeight={500} css={mainTextStyle}>
              4. 장단점 유형 작성 예시
            </Text>
            {["성격의 장점", "성격의 단점", "단점해결"].map((item, index) => (
              <h4 key={`${item}-${index}`} css={subTextStyle}>
                {item}
              </h4>
            ))}
          </Flex>
        </Box>
      </Modal>
    </>
  );
});
const mainTextStyle = css`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-inline: 3rem;
`;

const subTextStyle = css`
  height: 20px;
  font-weight: 500;

  margin: 0;
  margin-bottom: 5px;
  margin-inline: 3rem;

  color: ${theme.colors.gray_400};

  ::before {
    content: "-";
    margin-left: 10px;
    margin-inline: 10px;
  }
`;

export const TitleInput = React.forwardRef(function TitleInput(
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
  const { modalShow, toggleModal, cancel } = useModal();

  return (
    <>
      <label css={labelStyle}>
        제목
        <Button variant="default" onClick={() => toggleModal((prev) => !prev)}>
          <MdLiveHelp size={20} />
        </Button>
      </label>

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
      <Modal
        modalType="delete"
        elementId="modal"
        width="800px"
        height="400px"
        show={modalShow}
        cancel={cancel}
      >
        <Box
          variant="default"
          display="flex"
          direction="column"
          padding="5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize="xxl"
            fontWeight={700}
            textAlign="center"
            css={css`
              width: 100%;
              height: 10px;
              padding: 2rem;
              margin-top: 20px;
              margin-bottom: 30px;
            `}
          >
            질문 유형의 작성 방법
          </Text>
          <Text fontSize="xl" fontWeight={500} marginBottom={30}>
            기업의 자소서 항목의 제목을 넣어주세요.
          </Text>
          <h3>
            예시 {")"}
            <br />
          </h3>
          <h4>
            다른 사람과 구별되는 본인의 경쟁력과 입사 후 포부를 설명해 주십시오.
          </h4>
        </Box>
      </Modal>
    </>
  );
});

export const TextWrite = React.forwardRef(function TextWrite(
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
  const { modalShow, toggleModal, cancel } = useModal();

  return (
    <>
      <label css={labelStyle}>
        내용
        <Button variant="default" onClick={() => toggleModal((prev) => !prev)}>
          <MdLiveHelp size={20} />
        </Button>
      </label>
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
        color="black"
        backgroundColor="stone_200"
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
      <Modal
        modalType="delete"
        elementId="modal"
        width="900px"
        height="700px"
        show={modalShow}
        cancel={cancel}
      >
        <Box
          variant="default"
          display="flex"
          direction="column"
          padding="5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize="xxl"
            fontWeight={700}
            textAlign="center"
            css={css`
              width: 100%;
              height: 10px;
              padding: 2rem;
              margin-top: 20px;
              margin-bottom: 30px;
            `}
          >
            내용 항목의 작성 방법
          </Text>

          <Flex width="100%" direction="column" justifyContent="center">
            <Text fontSize="xl" fontWeight={700} css={mainTextStyle}>
              자기소개서를 작성해주세요. 제목을 포함하는 것이 권장됩니다.
            </Text>

            <Box width="100%">
              <h3>
                예시 {")"} 해외 경험을 통해서 실무경험을 쌓다. <br />
              </h3>
              국제적인 흐름 속에서 한국과 세계의 무역 업무 및 영업 직무에
              종사하고 싶은 목표가 있습니다.
              <br />
              인도네시아어를 전공하게 된 이유도 아세안 국가에 대한 언어와 문화에
              숙련도를 길러 한국과 해외 고객 간의 트레이딩을 조율하는 일을
              싶다는 꿈을 항상 가지고 있었기 때문입니다. 최근 2개월간 LX
              인터내셔널 인도네시아 서부 깔리만 딴 팜 법인에서 인턴으로
              근무하면서 1000명이 넘는 현지인들을 단 6명의 한국인이 관리함과
              동시에 매일 생산량을 증진시키기 위해 강수량을 예측하고, 팜 종자별
              계보와 그 특징을 분석해 현지 토양에 어떤 종자가 가장 부합할지를
              비교 산출하는 작업을 직접 경험하면서 다양한 일을 경험할 수 있는
              종합상사의 매력을 실감하게 되었습니다. GS 글로벌은 인도네시아
              깔리만 딴에 석탄광을 인수해 지분을 보유하고 석탄과 바이오매스를
              수출하고 있습니다. 그 운영에 있어서 시황을 빠르게 분석하고 적용해
              최고의 생산량을 산출해 내는 프로세스를 구축해 보고 싶다는 열망을
              하게 되었습니다.
            </Box>
          </Flex>
        </Box>
      </Modal>
    </>
  );
});
