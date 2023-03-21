import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaHashtag } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImTree } from "react-icons/im";
import { FaBuilding } from "react-icons/fa";

import { ResumeCardProps, ScheduleCardProps } from "./index.types";
import * as Styled from "./index.styles";

import { QueryKeys } from "queryClient";
import { deleteResume } from "lib/apis/api/resumes";

import Box from "_common/components/box";
import Button from "_common/components/button";
import Text from "_common/components/text";
import Flex from "_common/components/flex";

import Modal from "components/modal";

import useColumnDragAndDrop from "hooks/dnd/useColumnDragAndDrop";
import { useInputReducer } from "hooks/app/useInputReducer";

import {
  getFirebaseTimeToDate,
  getFirstSecondHalf,
  getSortedArray,
  randomButtonColor,
} from "utils/helpers";
import { emoji, scheduleDict } from "utils/constants";
import Input from "_common/components/input";

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
      style={{ minHeight: "200px" }}
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
            style={{ position: "absolute", top: 0, right: 0 }}
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
            style={{
              position: "absolute",
              padding: "1rem",
              bottom: 0,
              left: 0,
              right: 0,
            }}
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

// The Card Components About Resume page
export const ResumeCard = ({
  id,
  uid,
  imgUrl,
  createdAt,
  updatedAt,
  resumes,
  tag,
  toggle,
  setToggle,
}: React.PropsWithChildren<ResumeCardProps>) => {
  const navigate = useNavigate();

  const [frontToBack, setFrontToBack] = React.useState<boolean>(false);

  /**
   * 모달 state
   */
  const firebaseDate = new Date(createdAt.seconds * 1000);
  const updateDate = updatedAt ? new Date(updatedAt.seconds * 1000) : null;
  const [updateModalShown, toggleUpdateModal] = React.useState(false);
  const [deleteModalShow, toggleDeleteModal] = React.useState(false);

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

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await deleteResume(id);
    setToggle(!toggle);
  };

  const handleUpdateButtonClick = () => {
    navigate(`write/${id}`);
  };

  return (
    <>
      <Styled.Wrapper as="div" onMouseLeave={() => setFrontToBack(false)}>
        <Box
          variant={frontToBack ? "front" : "gray_200_border"}
          width="100%"
          height="420px"
          zIndex={10}
          position="absolute"
        >
          <div style={{ position: "absolute", top: 0, right: 0 }}>
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

          <Flex direction="column">
            <img
              src={imgUrl}
              alt="이미지가 없습니다."
              loading="lazy"
              style={{
                width: "100%",
                height: "170px",
                backgroundSize: "cover",
              }}
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
            <Flex style={{ margin: ".3rem 0" }}>
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
            <Flex style={{ margin: ".3rem 0" }}>
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
            <Flex direction="column" style={{ margin: ".3rem 0" }}>
              <Text
                fontSize="md"
                fontWeight={500}
                marginLeft={10}
                marginBottom={5}
              >
                생성일 : {getFirebaseTimeToDate(firebaseDate)}
              </Text>
              <Text
                fontSize="md"
                fontWeight={500}
                marginLeft={10}
                marginBottom={5}
              >
                수정일 : {getFirebaseTimeToDate(updateDate)}
              </Text>
            </Flex>

            {tag[0] !== "" && (
              <Flex
                width="100%"
                height="100%"
                wrap="wrap"
                style={{
                  padding: ".5rem",
                }}
              >
                {getSortedArray(tag).map((item, index) =>
                  !item ? null : index < 3 ? (
                    <Button
                      key={`${tag}-${index}`}
                      variant={randomButtonColor()}
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
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 6,
              opacity: 0.6,
            }}
          />
          <Flex
            width="100%"
            height="100%"
            backgroundColor="transparent"
            direction="column"
            justifyContent="center"
            alignItems="center"
            wrap="wrap"
            style={{
              zIndex: 7,
              position: "absolute",
              margin: "auto",
              padding: "1rem",
            }}
          >
            {tag.map((item, index) => (
              <Button
                key={`${item}-${index}`}
                variant={randomButtonColor()}
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
        elementId="deleteModal"
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
            style={{ gridArea: "heading", height: "10px", padding: "2rem" }}
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
        width="50%"
        height="90%"
        show={updateModalShown}
        cancel={cancel}
      >
        <Box
          display="flex"
          direction="column"
          padding="1rem"
          width="100%"
          height="100%"
        >
          <Flex
            width="100%"
            justifyContent="space-around"
            style={{
              borderBottom: "1px solid #000",
              padding: "1rem 0",
            }}
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
            <Flex key={index} direction="column" style={{ marginTop: "1rem" }}>
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
            height="auto"
            position="sticky"
            marginTop={400}
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
