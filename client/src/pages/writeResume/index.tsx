/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-restricted-globals

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { getClient, QueryKeys } from "queryClient";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import useResumes from "hooks/app/useResumes";
import { useInputReducer } from "hooks/app/useInputReducer";
import useItems, { ITEM_KEY } from "hooks/app/useItems";
import useModal from "hooks/app/useGoBack";

import { deleteResume, getResume } from "lib/apis/api/resumes";
import { MemoizedAdditionalSelect, MemoizedImageBox } from "./memorized";

import Modal from "components/modal";
import { OptionBox } from "./optionBox";
import { FormList } from "./resumesForm";

import Section from "components/section";
import Text from "_common/components/text";
import Box from "_common/components/box";
import Flex from "_common/components/flex";
import Button from "_common/components/button";
import Grid from "_common/components/grid";

import { emoji } from "utils/constants";
import { resumesIdAtom } from "store/atoms";
import { media } from "utils/media";

const WriteResume = () => {
  const queryClient = getClient();
  const { id } = useParams();
  const navigate = useNavigate();

  // ------------------ 1. Custom Hook ------------------

  /**
   * @description Resumes 서버 데이터의 상태관리를 위한 Hokk입니다. Resumes의 쿼리 데이터를 useMutation하여 CRUD를 하는 훅
   * @param queryClient 쿼리 클라이언트 @param QueryKeys 쿼리키 @return onCreate onDelete onUpdate onPublishing
   */
  const { onCreate, onUpdate, onPublish } = useResumes(queryClient, QueryKeys);

  /**
   * @description resumes의 apply {company, department}에 대한 상태관리 Hook입니다.
   * @param initialState company(회사명), department(부서명)  @default company ""  @default department ""
   */
  const [applyState, dispatch, setApplyState] = useInputReducer({
    company: "",
    department: "",
  });

  /** * @description 자기소개서 입력 폼의 컨텐츠에 대한 Hook입니다. */
  const { add, update, _delete, items, setItems } = useItems(
    ITEM_KEY.DOCUMENTS,
    { id: uuid(), text: "", title: "", tag: "" }
  );

  /** * @description 뒤로가기시 모달을 내려주는 훅(Hook)  */
  const { modalShow, toggleModal, cancel, handleGoBackAction } = useModal({
    route: "/",
    replace: true,
  });

  // ------------------ 2. 상태관리 ------------------

  /** * @description Recoil 전역상태 관리로 id값을 관리합니다. @default "" */
  const [resumeId, setResumeId] = useRecoilState(resumesIdAtom);

  /** * @description 그리드의 반복(grid-repeat)의 개수(count)에 대한 상태관리 @default 1 */
  const [count, setCount] = React.useState<number>(1);

  /** * @description 이미지 데이터 상태관리 @default "" */
  const [imageFile, setImageFile] = React.useState<any>("");

  /** * @description 토글 상태관리 @default false*/
  const [toggle, setToggle] = React.useState(false);

  const [toolToggle, setToolToggle] = React.useState(false);

  /** * @description 이미지 Input 박스의 Ref @default null */
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  // ------------------ 3. Functions ------------------

  /** * @description SELECT 기능. - 입력폼 보여지는 개수 */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(Number(e.target.value as string));
  };

  /** * @description Image onChange기능 */
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const imgFile = files![0];
    setToggle(true);

    if (files![0].size > 1 * 1024 * 1024) {
      // 1mb로 사이즈 제한
      alert("이미지 파일 용량이 너무 큽니다.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      if (!finishedEvent.currentTarget) throw Error("파일을 읽지 못했습니다.");
      const { result } = finishedEvent.currentTarget as FileReader;
      setImageFile(result);
    };

    if (Boolean(imgFile)) {
      reader.readAsDataURL(imgFile); // 파일 읽기
    }
  };

  /** * @description 이미지를 삭제하는 기능 */
  const handleClear = () => setImageFile(null);

  /** * @description 이미지를 업로드 창을 불러오는 기능 */
  const handleClickImageUpload = () => {
    imageInputRef.current?.click();
  };

  /** * @description 뒤로가기시에 발생하는 이벤트 기능 */
  const preventGoBack = () => {
    history.pushState(null, "", location.href);
    toggleModal(true);
  };

  /** * @description 임시 저장 기능입니다. */
  /** * @description  resumeId가 없을 경우 POST 요청을 위한 useMutation - onCreate */
  /** * @description  있을 경우 PUT요청을 위한 useMutation - onUpdate */
  const handleSave = async () => {
    /**
     * @description useResumes의 Return 요소 중 하나로 Resumes 데이터들을 useMutation으로 캐싱 데이터를 관리하는 훅
     * @description UPDATE시에, 쿼리 무효화를 하고 reFetch를 실행
     */
    if (resumeId && toggle) {
      // 이미지를 변경했을 경우
      await onUpdate({
        id: resumeId,
        imgUrl: imageFile,
        company: applyState.company,
        department: applyState.department,
        documents: items.documents,
      });
    } else if (resumeId && !toggle) {
      // 이미지는 변경하지 않고 내용만 변경했을 경우 이미지 URL은 보내지 않음음
      await onUpdate({
        id: resumeId,
        company: applyState.company,
        department: applyState.department,
        documents: items.documents,
      });
    } else {
      /**
       * @description useResumes의 Return 요소 중 하나로 Resumes 데이터들을 useMutation으로 캐싱 데이터를 관리하는 훅
       * @description POST 요청시에, 쿼리 무효화를 하고 reFetch를 실행
       */
      await onCreate({
        imgUrl: imageFile,
        apply: applyState,
        documents: items.documents,
        publishing: false,
      });
    }
  };

  /** * @description 확인 버튼 시, 임시 상태에서 출간 상태로 변경 기능입니다.  */
  const handlePublish = async () => {
    /**
     * @description Resume REST API update request
     * @default resumeId @default body publishing의 기본값 false에서 true로 변환
     */
    if (!resumeId) return alert("먼저 저장을 완료 하셔야합니다.");
    await onPublish({
      id: resumeId,
      publishing: true,
    });
    await alert("해당 자기소개서를 저장하셨습니까?");
    await navigate("/resumes", { replace: false });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    const targetIndex = items.documents.findIndex((item) => item.tag === "");

    if (applyState.company === "" || applyState.department === "") {
      alert("회사명 또는 부서명은 필수 입력 사항입니다.");
      return;
    }
    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "save") {
      await handleSave();
    } else if (ariaLabel === "publish") {
      await handlePublish();
    }
  };

  // ------------------ 4. component mount / unMount ------------------

  /** * @description mount시 url에 param이 있을 떄, 없을 때 구분하여 request  */
  /** * @description 없을 경우, id값 전역상태를 default로 설정  */
  /** * @description 있을 경우, 해당 param의 데이터를 가져온다.  */
  React.useEffect(() => {
    if (!id) return setResumeId("");
    getResume(id!).then((res) => {
      setResumeId(res.data?.id);
      dispatch({
        name: "department",
        value: res.data?.apply.department,
      });
      dispatch({
        name: "company",
        value: res.data?.apply.company,
      });
      setItems({ documents: res.data?.documents });
      setImageFile(res.data?.imgUrl);
    });
  }, []);

  /** * @description 뒤로가기를 막고 이벤트 핸들러를 넣어주는 로직  */
  React.useEffect(() => {
    // 브라우저에 렌더링 시 한 번만 실행하는 코드

    (() => {
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", preventGoBack);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  /** *@description mount시 색상 배경 이미지 변경 */
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
          padding: 2px;
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

          <Flex css={flexStyle}>
            {/* 이미지 선택 컴포넌트 */}
            <MemoizedImageBox
              imageFile={imageFile}
              onClear={handleClear}
              onImageUpload={handleClickImageUpload}
            />
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
          handleCickImageUpload={handleClickImageUpload}
          handleChangeImg={handleChangeImg}
          handleAdd={add}
          ref={imageInputRef}
        />
      </Flex>
      <div
        css={css`
          top: 90%;
          transition: all 1s ease-out;
          // 90%
          position: fixed;
          ${media[0]} {
            display: block;
            left: ${toolToggle ? "90%" : "38%"};
          }
          ${media[1]} {
            display: block;
            left: ${toolToggle ? "90%" : "58%"};
          }
          ${media[2]} {
            display: none;
          }
        `}
      >
        {toolToggle && (
          <img
            src={`${process.env.PUBLIC_URL}/images/gear.jpg`}
            onClick={() =>
              setToolToggle((prev) => {
                return !prev;
              })
            }
            css={gearStyle}
          />
        )}
        {!toolToggle && (
          <Box
            backgroundColor="violet_50"
            display="flex"
            width="300px"
            height="300px"
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
              저장
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
            <Button
              onClick={add}
              // 스타일
              variant="default"
              width="100%"
              height="70px"
              fontSize="lg"
              marginTop={10}
              marginBottom={10}
            >
              <AiOutlinePlusSquare size={25} />
            </Button>
            <Button
              areaLabel="publish"
              onClick={() =>
                setToolToggle((prev) => {
                  return !prev;
                })
              } // 스타일
              variant="default"
              width="100%"
              height="70px"
              fontSize="lg"
              marginTop={10}
              marginBottom={10}
            >
              <ImCancelCircle size={25} />
            </Button>
          </Box>
        )}
        {/* {!toolToggle  } */}
      </div>
      {/* 뒤로가기 할때 모달창 */}
      <Modal
        modalType="delete"
        elementId="modal"
        width="500px"
        height="300px"
        show={modalShow}
        cancel={cancel}
      >
        <Box
          variant="default"
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize="xxl"
            fontWeight={700}
            textAlign="center"
            marginTop={50}
            marginBottom={50}
            css={css`
              height: 10px;
              padding: 2rem;
            `}
          >
            글 작성을 취소하시겠습니까?
          </Text>
          <Flex>
            <Button
              onClick={handleGoBackAction}
              variant="vermillion_400_fill"
              css={modalButtonStyle}
            >
              네
            </Button>
            <Button onClick={cancel} variant="tdred_100" css={modalButtonStyle}>
              취소
            </Button>
          </Flex>
        </Box>
      </Modal>
    </>
  );
};
export default WriteResume;

const modalButtonStyle = css`
  width: 200px;
  height: 70px;
`;

const flexStyle = css`
  ${media[0]} {
    flex-direction: row;
    height: 100%;
  }
  ${media[1]} {
    flex-direction: row;
    height: 100%;
  }
  ${media[2]} {
    flex-direction: row;
    height: 250px;
  }
`;
const gearStyle = css`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 9;
  border-radius: 70%;
  cursor: pointer;
`;
