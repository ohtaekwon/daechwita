/** @jsxImportSource @emotion/react */

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { FaTrashAlt } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { getClient, QueryKeys } from "queryClient";

import useResumes from "hooks/app/useResumes";
import { useInputReducer } from "hooks/app/useInputReducer";
import useItems, { ITEM_KEY } from "hooks/app/useItems";
import { getLatestResume, getResume } from "lib/apis/api/resumes";
import { postImageFile } from "lib/apis/api/formData";

import Section from "components/section";
import Text from "_common/components/text";
import Form from "_common/components/form";
import Box from "_common/components/box";
import Input from "_common/components/input";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";
import Grid from "_common/components/grid";
import Flex from "_common/components/flex";

import { emoji } from "utils/constants";
import { css } from "@emotion/react";

const WriteResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = getClient();
  const { onUpdate, onPublish } = useResumes(queryClient, QueryKeys);

  /**
   * @description 그리드의 반복(grid-repeat)의 개수(count)에 대한 상태관리
   * @default 1
   */
  const [count, setCount] = React.useState<number>(1);
  /**
   *  @description resume의 id에 대한 상태관리
   * @default ""
   */
  const [resumeId, setResumeId] = React.useState<string>("");

  /**
   * @description resumes의 apply {company, department}에 대한 상태관리
   * @param initialState company(회사명), department(부서명)
   * @default company ""
   * @default department ""
   */
  const [applyState, dispatch, setApplyState] = useInputReducer({
    company: "",
    department: "",
  });

  /**
   * @description 자기소개서 입력 폼의 컨텐츠에 대한 커스텀 훅(Hook)
   * @param itemKey useItems의 키 값 설정
   * @param addItem useItems의 추가할 아이템의 요소로 구성
   * @items 기본값으로 id, tag, text, title로 구성
   */
  const { add, update, _delete, items, setItems } = useItems(
    ITEM_KEY.DOCUMENTS,
    {
      id: uuid(),
      text: "",
      title: "",
      tag: "",
    }
  );
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = React.useState({});
  const [imageFile, setImageFile] = React.useState<any>();

  React.useEffect(() => {
    if (id) {
      getResume(id).then((res) => {
        setResumeId(res.data.id);
        dispatch({
          name: "department",
          value: res.data.apply.department,
        });
        dispatch({
          name: "company",
          value: res.data.apply.company,
        });
        setItems({ documents: res.data.documents });
      });
    } else {
      getLatestResume().then((res) => {
        setResumeId(res.data[0].id);
        setItems({ documents: res.data[0].documents });
      });
    }
  }, []);

  /**
   * @abstract 임시 저장 기능의 함수
   * @description Resume REST API UPDATE Request
   * @default resumeId resume의 id
   * @default body 업데이트할 내용
   */
  const onSave = async () => {
    /**
     * @description useResumes의 Return 요소 중 하나로 Resumes 데이터들을 useMutation으로 캐싱 데이터를 관리하는 훅
     * @abstract update시에, 쿼리 무효화를 하고 reFetch를 실행
     */
    await onUpdate({
      id: resumeId,
      company: applyState.company,
      department: applyState.department,
      documents: items.documents,
    });
  };
  const handlePublish = async () => {
    /**
     * resume REST API update request
     * @default resumeId
     * @default body publishing의 기본값 false에서 true로 변환
     */
    await onPublish({
      id: resumeId,
      publishing: true,
    });
    await alert("저장을 하셨습니까?");
    await navigate("/resumes");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "save") {
      await onSave();
    } else if (ariaLabel === "publish") {
      await handlePublish();
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(e.target.value as any);
  };

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const imageFile = files[0];
    setImageData(imageFile);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      if (!finishedEvent.currentTarget) throw Error("파일을 읽지 못했습니다.");
      const { result } = finishedEvent.currentTarget as FileReader;
      setImageFile(result);
    };
    if (Boolean(imageFile)) {
      reader.readAsDataURL(imageFile);
    }
  };
  const handleAttach = async (e: React.SyntheticEvent) => {
    const formData: any = new FormData();
    formData.append("files", imageData);
    await postImageFile({ data: imageFile });
  };

  const onCickImageUpload = () => {
    imageInputRef.current?.click();
  };

  React.useEffect(() => {
    document.body.style.backgroundImage =
      "linear-gradient(to right, #5f72bd 0%, #9b23ea 100%";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);
  return (
    <>
      <Flex
        css={css`
          margin: auto;
          width: 100%;
          background-color: transparent;
        `}
      >
        <Section
          width="100%"
          height="100%"
          margin="auto"
          display="flex"
          direction="column"
          paddingBottom={15}
          paddingRight={15}
          paddingLeft={15}
          paddingTop={15}
        >
          <Text
            fontSize="xxxl"
            fontWeight={700}
            textAlign="left"
            paddingBottom={30}
            paddingTop={30}
            marginTop={10}
            marginBottom={10}
            color="white"
          >
            나의 자기소개서 {emoji.WRITE}
          </Text>

          <Flex>
            <Box
              width="300px"
              height="300px"
              display="flex"
              direction="column"
              justifyContent="left"
              alignItems="center"
              margin={0}
              radius={8}
              css={css`
                box-sizing: border-box;
              `}
            >
              {imageFile && (
                <img
                  src={imageFile}
                  css={css`
                    width: 100%;
                    height: 100%;
                    background-image: ${imageFile};
                  `}
                />
              )}
              {!!!imageFile && (
                <Box
                  onClick={onCickImageUpload}
                  width={"100%"}
                  height={"100%"}
                  backgroundColor="transparent"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  css={css`
                    border: 3px solid #f8fafc;
                    cursor: pointer;
                  `}
                >
                  <Text color="white"> 기업의 로고 사진을 첨부해주세요</Text>
                </Box>
              )}

              <Button
                onClick={handleAttach}
                width="300px"
                variant="skyblue_100"
                areaLabel="publish"
              >
                이미지 확인
              </Button>
            </Box>

            <AdditionalSelect
              company={applyState.company}
              department={applyState.department}
              setAdditionalInfo={setApplyState}
            />
          </Flex>

          {/* 자소서 form */}

          <Grid gridTemplateColumns={`repeat(${count}, 1fr)`}>
            <FormList
              list={items.documents}
              deleteForm={_delete}
              onChange={update}
            />
          </Grid>
        </Section>

        {/*  사이드 옵션 박스 */}
        <Box
          as="aside"
          width="300px"
          height="100%"
          display="flex"
          direction="column"
          top={0}
          right={0}
          marginTop={50}
          backgroundColor="gray_100"
          css={css`
            position: absolute;
            box-shadow: rgb(0 0 0 / 10%) 10px 10px 30px;
            position: sticky;
            top: 200px;
            z-index: 9;
          `}
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
                padding: 0 1rem;
                font-size: 1.5rem;
              `}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <Button
              onClick={onCickImageUpload}
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
              ref={imageInputRef}
              placeholder="사진 첨부"
              onChange={onChangeImg}
              // 스타일
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              css={inputStyle}
            />
            <Button
              onClick={add}
              width="100%"
              height="100%"
              variant="default" // 스타일
            >
              <AiOutlinePlusSquare size={35} />
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
export default WriteResume;

const AdditionalSelect = React.memo(
  ({
    company,
    department,
    setAdditionalInfo,
  }: {
    company: string;
    department: string;
    setAdditionalInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    console.log("addition", company, department);
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
  }
);

const FormList = React.memo(
  ({
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
        {list?.map((item: any, key: React.Key) => (
          <FormItem
            key={key}
            item={item}
            onDelete={deleteForm}
            onChange={onChange}
          />
        ))}
      </>
    );
  }
);

const FormItem = ({
  item,
  onDelete,
  onChange,
}: {
  item: { title: string; text: string; tag: string; id: string };
  onDelete: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}) => {
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
        role="form"
        width="100%"
        height="100%"
        position="relative"
        backgroundColor="transparent"
        css={css`
          /* box-shadow: rgb(0 0 0 / 10%) 3px 3px 16px; */
          border: 0;
          border-color: transparent;
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
        >
          <Box
            display="flex"
            width="100%"
            height="100%"
            direction="column"
            padding={0}
          >
            <Input
              type="text"
              id="tag"
              name="tag"
              className="input__tag"
              value={item.tag}
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
            <Input
              type="text"
              id="title"
              name="title"
              className="input__title"
              value={item.title}
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
            <Textarea
              name="text"
              className="input__text"
              value={item.text}
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
              {item.text}
            </Textarea>
            <Text color="white">
              {item.text.length + item.title.length || 0} 자
            </Text>
          </Box>
        </Form>
      </Box>
    </>
  );
};
const inputStyle = css`
  border: 0;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%);
`;
const borderStyle = css`
  border: 0;
`;
