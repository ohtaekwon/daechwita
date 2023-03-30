/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaHashtag } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImTree } from "react-icons/im";
import { FaBuilding } from "react-icons/fa";

import { ResumeCardProps, ScheduleCardProps } from "./index.types";
import * as Styled from "./index.styles";

import { getClient, QueryKeys } from "queryClient";

import Box from "_common/components/box";
import Button from "_common/components/button";
import Text from "_common/components/text";
import Flex from "_common/components/flex";
import Input from "_common/components/input";

import Modal from "components/modal";

import useResumes from "hooks/app/useResumes";
import useColumnDragAndDrop from "hooks/dnd/useColumnDragAndDrop";
import { useInputReducer } from "hooks/app/useInputReducer";

import {
  getFirebaseTimeToDate,
  getFirstSecondHalf,
  getSortedArray,
} from "utils/helpers";
import { emoji, scheduleDict } from "utils/constants";
import { media } from "utils/media";

/**
 * @description The Card Components About 입사 지원 현황
 */
export const ScheduleCard = ({
  index,
  column,
  onDelete,
  onUpdate,
  onSwap: handleDropHover,
  data,
}: React.PropsWithChildren<ScheduleCardProps>) => {
  const [schedule, _, onChange] = useInputReducer({
    company: data.company,
    department: data.department,
  });
  const [toggle, setToggle] = React.useState(false);
  const { ref, isDragging } = useColumnDragAndDrop<HTMLElement>(
    { data, index },
    handleDropHover
  );

  const firebaseDate = new Date(data.createdAt.seconds * 1000);

  const handleUpdate = () => {
    onUpdate({
      id: data.id,
      index: data.index,
      column: data.column,
      company: schedule.company,
      department: schedule.department,
      createdAt: data.createdAt,
    });
    setToggle(!toggle);
  };
  const handleDelete = () => {
    onDelete(data.id);
  };

  return (
    <Box
      as="div"
      role="group"
      variant="default"
      position="relative"
      display="flex"
      width="200px"
      height="200px"
      backgroundColor="amber_100"
      marginTop={20}
      marginBottom={20}
      cursor="grab"
      ref={ref}
      opacity={isDragging ? 0.5 : 1}
      css={scheduleCardStyle}
    >
      {toggle && (
        <Flex direction="column" as="div" width="100%" height="100%">
          <Input
            type="text"
            name="company"
            placeholder="회사를 입력해주세요"
            className={`input__${schedule.company}`}
            value={schedule.company}
            onChange={onChange}
            // 스타일
            variant="schedule"
            width="100%"
            boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
            radius={8}
            marginBottom={10}
            marginTop={10}
          />
          <Input
            type="text"
            name="department"
            placeholder="부서를 입력해주세요"
            className={`input__${schedule.department}`}
            value={schedule.department}
            onChange={onChange}
            // 스타일
            variant="schedule"
            width="100%"
            boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
            radius={8}
            marginBottom={10}
            marginTop={10}
          />
          <Flex justifyContent="space-between" width="100%">
            <Button
              aria-label="delete-task"
              variant="tdred_400_fill"
              areaLabel="delete"
              onClick={handleUpdate}
            >
              취소
            </Button>
            <Button
              aria-label="delete-task"
              variant="primary"
              areaLabel="delete"
              onClick={handleUpdate}
            >
              확인
            </Button>
          </Flex>
        </Flex>
      )}
      {!toggle && (
        <>
          <Flex
            as="div"
            width="100%"
            height="15%"
            justifyContent="space-between"
            css={css`
              top: 0;
              right: 0;
              position: absolute;
            `}
          >
            <Button
              aria-label="delete-task"
              variant="default"
              zIndex={100}
              areaLabel="delete"
              onClick={handleUpdate}
            >
              <AiOutlineEdit size={15} />
            </Button>
            <Button
              aria-label="delete-task"
              variant="default"
              zIndex={100}
              areaLabel="delete"
              onClick={handleDelete}
            >
              <RiDeleteBin6Line size={15} />
            </Button>
          </Flex>
          <Flex
            direction="column"
            height="85%"
            css={css`
              position: absolute;
              padding: 1rem;
              bottom: 0;
              left: 0;
              right: 0;
            `}
          >
            <Text fontWeight={700} marginTop={5} marginBottom={5}>
              {getFirstSecondHalf(firebaseDate)}
            </Text>
            <Text fontSize="lg" fontWeight={500} marginTop={5} marginBottom={5}>
              {`${emoji[data.column]} ${scheduleDict[data.column]}`}
            </Text>
            <Text fontWeight={700} marginTop={5} marginBottom={5}>
              {data.company || "회사를 입력해주세요"}
            </Text>
            <Text fontWeight={700} marginTop={5} marginBottom={5}>
              {data.department || "부서를 입력해주세요"}
            </Text>
            <Text fontSize="sm" fontWeight={500} marginTop={5} marginBottom={5}>
              {getFirebaseTimeToDate(firebaseDate)}
            </Text>
          </Flex>
        </>
      )}
    </Box>
  );
};

const scheduleCardStyle = css`
  min-height: 200px;

  @media screen and (min-width: 320px) {
    width: 300px;
  }
  @media screen and (min-width: 420px) {
    width: 400px;
  }
  @media screen and (min-width: 520px) {
    width: 450px;
  }
  @media screen and (min-width: 620px) {
    width: 550px;
  }
  @media screen and (min-width: 720px) {
    width: 620px;
  }
  @media screen and (min-width: 820px) {
    width: 100%;
  }
  @media screen and (min-width: 920px) {
    width: 200px;
  }
  @media screen and (min-width: 1020px) {
    width: 200px;
  }
  @media screen and (min-width: 1120px) {
    width: 200px;
  }
  @media screen and (min-width: 1220px) {
    width: 200px;
  }
  @media screen and (min-width: 1280px) {
    width: 200px;
  }
`;

/**
 * @description The Card Components About 자기소개서
 */
export const ResumeCard = ({
  id,
  uid,
  imgUrl,
  createdAt,
  updatedAt,
  resumes,
  tag,
  colors,
  toggle,
  setToggle,
}: React.PropsWithChildren<ResumeCardProps>) => {
  const navigate = useNavigate();
  const queryClient = getClient();

  const { onDelete } = useResumes(queryClient, QueryKeys);
  const [frontToBack, setFrontToBack] = React.useState<boolean>(false);

  /**
   * @description 모달과 관련한 상태관리
   */
  const [updateModalShown, toggleUpdateModal] = React.useState(false);
  const [deleteModalShow, toggleDeleteModal] = React.useState(false);

  const firebaseDate = new Date(createdAt.seconds * 1000);
  const updateDate = updatedAt ? new Date(updatedAt.seconds * 1000) : null;

  const showModal = (e: React.SyntheticEvent) => {
    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "update") {
      toggleUpdateModal(true);
    } else {
      toggleDeleteModal(true);
    }
  };

  const cancel = (e: React.SyntheticEvent) => {
    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "updateCancel") {
      toggleUpdateModal(false);
    } else {
      toggleDeleteModal(false);
    }
  };

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onDelete(id);
    setToggle(!toggle);
  };

  const handleUpdateButtonClick = () => {
    navigate(`write/${id}`);
  };

  return (
    <>
      <Styled.Wrapper
        as="div"
        onMouseLeave={_.debounce(() => setFrontToBack(false), 1000)}
      >
        <Box
          variant={frontToBack ? "front" : "gray_200_border"}
          width="100%"
          height="420px"
          zIndex={10}
          position="absolute"
        >
          <div css={rightPosition}>
            <Button areaLabel="update" onClick={showModal} variant="primary">
              <AiOutlineSearch color="white" />
            </Button>
            <Button
              areaLabel="delete"
              onClick={showModal}
              variant="tdred_400_fill"
            >
              <FaTrashAlt color="white" />
            </Button>
          </div>

          <Flex direction="column" backgroundColor="transparent">
            <img
              src={imgUrl}
              alt="이미지가 없습니다."
              loading="lazy"
              css={imageStyle}
            />
            <Text
              fontSize="xxl"
              fontWeight={900}
              paddingTop={10}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
            >
              {getFirstSecondHalf(firebaseDate)}
            </Text>
            <Flex css={marginStyle}>
              <Text
                fontSize="lg"
                fontWeight={700}
                marginLeft={10}
                marginRight={10}
              >
                지원 회사 :
              </Text>
              <Text fontSize="lg">{resumes.apply.company}</Text>
            </Flex>
            <Flex css={marginStyle}>
              <Text
                fontSize="lg"
                fontWeight={700}
                marginLeft={10}
                marginRight={10}
              >
                지원 부서 :
              </Text>
              <Text fontSize="lg" marginBottom={5}>
                {resumes.apply.department}
              </Text>
            </Flex>
            <Flex direction="column" css={marginStyle}>
              <Text
                fontSize="md"
                fontWeight={500}
                marginLeft={10}
                marginBottom={5}
                whiteSpace="nowrap"
                style={{ width: "100%" }}
              >
                생성일 : {getFirebaseTimeToDate(firebaseDate)}
              </Text>
              <Text
                fontSize="md"
                fontWeight={500}
                marginLeft={10}
                marginBottom={5}
                whiteSpace="nowrap"
              >
                수정일 : {getFirebaseTimeToDate(updateDate)}
              </Text>
            </Flex>

            {tag[0] !== "" && (
              <Flex
                width="100%"
                height="100%"
                wrap="wrap"
                css={css`
                  padding: 0.5rem; ;
                `}
              >
                {getSortedArray(tag).map((item, index) =>
                  !item ? null : index < 3 ? (
                    <Button
                      key={`${tag}-${index}`}
                      variant={colors[index]}
                      marginRight={5}
                      marginBottom={5}
                    >
                      <FaHashtag />
                      {item}
                    </Button>
                  ) : null
                )}
                {tag.length > 3 && (
                  <Button
                    variant="default"
                    onClick={() => setFrontToBack(true)}
                  >
                    더보기
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </Box>
        {/* 뒷 면 */}
        <Box
          variant="back"
          zIndex={5}
          position="absolute"
          width="100%"
          height="420px"
        >
          <img
            src={process.env.PUBLIC_URL + "images/resume_alt_01.jpg"}
            css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: 6;
              opacity: 0.6;
            `}
          />
          <Flex
            width="100%"
            height="100%"
            backgroundColor="transparent"
            direction="column"
            justifyContent="center"
            alignItems="center"
            wrap="wrap"
            css={css`
              z-index: 7;
              position: absolute;
              margin: auto;
              padding: 1rem;
            `}
          >
            {tag.map((item, index) => (
              <Button
                key={`${item}-${index}`}
                variant={colors[index]}
                radius={15}
                marginTop={5}
                marginBottom={5}
              >
                <FaHashtag />
                {item}
              </Button>
            ))}
          </Flex>
        </Box>
      </Styled.Wrapper>
      {/* 삭제하기 버튼 모달창 */}
      <Modal
        modalType="delete"
        elementId="modal"
        width="500px"
        height="300px"
        show={deleteModalShow}
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
            fontSize="xxxl"
            fontWeight={700}
            textAlign="center"
            marginTop={50}
            marginBottom={50}
            css={css`
              height: 10px;
              padding: 2rem;
            `}
          >
            정말 삭제하시겠습니까?
          </Text>
          <Flex>
            <Button
              onClick={handleDelete}
              variant="tdred_400_fill"
              width="200px"
              height="70px"
            >
              삭제
            </Button>
            <Button
              onClick={cancel}
              variant="tdred_100"
              width="200px"
              height="70px"
            >
              취소
            </Button>
          </Flex>
        </Box>
      </Modal>
      {/* 자세히 보기 버튼 모달창 */}
      <Modal
        modalType="update"
        elementId="modal"
        show={updateModalShown}
        cancel={cancel}
        css={modalStyle}
      >
        <Box
          display="flex"
          direction="column"
          padding="1rem"
          width="100%"
          height="90vh"
        >
          <Flex
            width="100%"
            justifyContent="space-around"
            css={css`
              border-bottom: 1px solid #000;
              padding: 1rem 0;
            `}
          >
            <Text
              fontSize="xxl"
              fontWeight={700}
              paddingTop={10}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              marginRight={10}
              whiteSpace="nowrap"
            >
              <FaBuilding size={30} /> 회사 : {resumes.apply.company}
            </Text>
            <Text
              fontSize="xxl"
              fontWeight={700}
              paddingTop={10}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              whiteSpace="nowrap"
            >
              <ImTree size={30} /> 부서 : {resumes.apply.department}
            </Text>
          </Flex>
          {resumes.documents.map((doc, index) => (
            <Flex
              key={index}
              direction="column"
              css={css`
                margin: 1rem 0;
                height: 100vh;
              `}
            >
              <Text
                fontSize="xl"
                fontWeight={700}
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                whiteSpace="nowrap"
              >
                유 형 : {doc.tag}
              </Text>
              <Text
                fontSize="xl"
                fontWeight={700}
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                whiteSpace="nowrap"
              >
                제 목 : {doc.title}
              </Text>
              <Text
                fontSize="xl"
                lineHeight="xl"
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
              >
                {doc.text}
              </Text>
            </Flex>
          ))}
          <Box
            width="100%"
            height="100px"
            position="sticky"
            bottom={0}
            left={0}
            right={0}
          >
            <Button
              width="100%"
              onClick={handleUpdateButtonClick}
              variant="tdred_400_fill"
              fontSize="xxl"
              radius={8}
              height="50px"
            >
              자세히 보기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const rightPosition = css`
  position: absolute;
  top: 0;
  right: 0;
`;
const imageStyle = css`
  width: 100%;
  height: 170px;
  background-size: cover;
  border-radius: 8px;
`;
const marginStyle = css`
  margin: 0.3rem 0;
`;

const modalStyle = css`
  ${media[0]} {
    width: 90%;
  }
  ${media[1]} {
    width: 70%;
  }
  ${media[2]} {
    width: 50%;
  }
`;
