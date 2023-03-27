/** @jsxImportSource @emotion/react */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";

import { v4 as uuid } from "uuid";

import { getClient, QueryKeys } from "queryClient";

import useResumes from "hooks/app/useResumes";
import { useInputReducer } from "hooks/app/useInputReducer";
import useItems, { ITEM_KEY } from "hooks/app/useItems";
import { getLatestResume, getResume } from "lib/apis/api/resumes";
import { postImageFile } from "lib/apis/api/formData";

import { MemoizedOptionBox, MemoizedAdditionalSelect } from "./memorized";

import Section from "components/section";
import Text from "_common/components/text";
import Box from "_common/components/box";
import Flex from "_common/components/flex";
import Button from "_common/components/button";
import Grid from "_common/components/grid";

import { emoji } from "utils/constants";
import { FormList } from "./resumesForm";
import { OptionBox } from "./optionBox";

function QueryFn<T>(id: string | undefined) {
  if (id) {
    console.log("useQuery");
    return () => getResume(id!);
  } else {
    console.log("useQuery");
    return () => getLatestResume();
  }
}
// const { data, isLoading, isError, refetch } = useQuery(
//   id ? QueryKeys.RESUMES(id) : QueryKeys.RESUMES(),
//   QueryFn(id)
// );

const WriteResume = () => {
  const queryClient = getClient();

  /**
   * @description Basic Hook, Custom Hook
   *
   * 1. Resumes 서버 데이터의 상태관리를 위한 훅
   * 2. Resumes의 apply(company, department)에 대한 상태관리
   * 3. 자기소개서 입력 폼의 컨텐츠에 대한 커스텀 훅(Hook
   */

  const { id } = useParams();
  const navigate = useNavigate();
  /**
   * @description Resumes 서버 데이터의 상태관리를 위한 훅
   * @description Resumes의 쿼리 데이터를 useMutation하여 CRUD를 하는 훅
   * @param queryClient 쿼리 클라이언트
   * @param QueryKeys 쿼리키
   * @return onCreate onDelete onUpdate onPublishing
   */
  const { onUpdate, onPublish } = useResumes(queryClient, QueryKeys);

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

  /**
   * @description 상태관리(state)
   *
   * 1. 그리드에 쓰이는 숫자(count) 상태관리
   * 2. 이력서 ID 데이터 상태관리
   * 3. 이미지 데이터 상태관리
   * 4. 토글 상태관리
   */

  /**
   * @description 그리드의 반복(grid-repeat)의 개수(count)에 대한 상태관리
   * @default 1
   */
  const [count, setCount] = React.useState<number>(1);

  /**
   * @description resume의 id에 대한 상태관리
   * @default ""
   */
  const [resumeId, setResumeId] = React.useState<string>("");

  const [imageData, setImageData] = React.useState({});
  const [imageFile, setImageFile] = React.useState<any>();
  const [toggle, setToggle] = React.useState(false);

  /**
   * @description Ref
   *
   * 1. 이미지 박스 input ref
   */
  const imageInputRef = React.useRef<HTMLInputElement>(null);

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
   * @description 임시 저장 기능의 함수
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
     * @description Resume REST API update request
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
    // setToggle(!toggle);
    const findIndex = items.documents.findIndex((item) => item.tag === "");

    if (applyState.company === "" || applyState.department === "") {
      alert("회사명 또는 부서명은 필수 입력 사항입니다.");
      return;
    }

    if (findIndex < 0) {
      alert("태그는 필수 입력 사항입니다.");
      return;
    }

    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "save") {
      await onSave();
    } else if (ariaLabel === "publish") {
      await handlePublish();
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setToggle(!toggle);
    setCount(Number(e.target.value as string));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCickImageUpload = (e: React.SyntheticEvent) => {
    // setToggle(!toggle);
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
                  onClick={handleCickImageUpload}
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
            {/* additionalSelect (회사/부서명) 추가 선택 컴포넌트*/}
            <MemoizedAdditionalSelect
              company={applyState.company}
              department={applyState.department}
              setAdditionalInfo={setApplyState}
            />
          </Flex>

          {/* resumesForm 자기소개서 작성 폼 컴포넌트 */}
          <Grid gridTemplateColumns={`repeat(${count}, 1fr)`}>
            <FormList
              list={items.documents}
              deleteForm={_delete}
              onChange={update}
              toggle={toggle}
            />
          </Grid>
        </Section>

        {/* optionBox 사이드 옵션 박스 컴포넌트 */}
        <OptionBox
          toggle={toggle}
          handleSubmit={handleSubmit}
          handleSelect={handleSelect}
          handleCickImageUpload={handleCickImageUpload}
          handleChangeImg={handleChangeImg}
          handleAdd={add}
          ref={imageInputRef}
        />
      </Flex>
    </>
  );
};
export default WriteResume;
