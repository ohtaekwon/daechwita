import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { FaTrashAlt } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";
import { AiOutlinePlusSquare } from "react-icons/ai";

import { useMutation, useQuery } from "react-query";
import { getClient, QueryKeys } from "queryClient";

import { useInputReducer } from "hooks/app/useInputReducer";
import useItems, { ItemList, ITEM_KEY } from "hooks/app/useItems";
import { getLatestResume, getResume, updateResume } from "lib/apis/api/resumes";
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
import { ResumesResponse, ResumesType } from "types/index.types";

/**
 *
 * 해야할 것들, publishing떄, 수정
 *
 * @param id
 *
 *
 * @returns
 */

function QueryFn<T>(id: string | undefined) {
  if (id) {
    console.log("useQuery");
    return () => getResume(id!);
  } else {
    console.log("useQuery");
    return () => getLatestResume();
  }
}

const WriteResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = getClient();

  const { data, isLoading, isError, refetch } = useQuery(
    id ? QueryKeys.RESUMES(id) : QueryKeys.RESUMES(),
    QueryFn(id)
  );
  const { mutate: onUpdate } = useMutation(
    ({
      id,
      company,
      department,
      documents,
    }: {
      id: string;
      company: string;
      department: string;
      documents: ItemList["documents"];
    }) =>
      updateResume(id, {
        apply: {
          company,
          department,
        },
        documents,
      }),
    {
      // onMutate: async (mutateData) => {
      //   const { id, company, department, documents } = mutateData;
      //   await queryClient.cancelQueries(QueryKeys.RESUMES());
      //   const response = queryClient.getQueriesData(QueryKeys.RESUMES()) || {};
      //   const [key, resumesData] = response[0];

      //   if (!resumesData) return null;

      //   const targetIndex = (resumesData as ResumesResponse[]).findIndex(
      //     (data) => data.id === id
      //   );

      //   if (!resumesData || targetIndex === undefined || targetIndex < 0) {
      //     return;
      //   }
      //   const copyResumes = [...(resumesData as ResumesResponse[])];

      //   const newData: Pick<ResumesResponse, "resumes"> = {
      //     resumes: {
      //       apply: {
      //         company,
      //         department,
      //       },
      //       documents,
      //     },
      //   };
      //   copyResumes.splice(targetIndex, 1, {
      //     ...copyResumes[targetIndex],
      //     // newData
      //   });

      //   console.log("resumesData", response);
      //   console.log("mutateData", mutateData);
      // },
      onSuccess: async (updateData: unknown = {}, variables, ctx) => {
        await queryClient.invalidateQueries(QueryKeys.RESUMES(), {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );
  const { mutate: onPublish } = useMutation(
    ({ id, publishing }: { id: string; publishing: boolean }) =>
      updateResume(id, {
        publishing,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QueryKeys.RESUMES(), {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  /**
   * 그리드의 반복(grid-repeat)의 개수(count)에 대한 상태관리
   * @default 1
   */
  const [count, setCount] = React.useState<number>(1);
  /**
   * resume의 id값을 관리하는 State
   * @default ""
   */
  const [resumeId, setResumeId] = React.useState<string>("");

  const [applyState, dispatch, setApplyState] = useInputReducer({
    company: "",
    department: "",
    // company: !!id ? data?.data.apply.company : "",
    // department: !!id ? data?.data.apply.department : "",
  });

  /**
   * 자기소개서 입력 폼의 컨텐츠들을 관리하는 Hook
   * @default itemKey useItems의 키 값 설정
   * @default defaultValue 기본값으로 id, tag, text, title로 구성
   */
  const { add, update, _delete, items, setItems } = useItems(
    ITEM_KEY.DOCUMENTS,
    // { documents: data?.data.documents },
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

  // 임시 저장 기능의 함수
  const onSave = async () => {
    /**
     * resume REST API update request
     * @default resumeId resume의 id
     * @default body 업데이트할 내용
     */
    // await updateResume(resumeId, {
    //   apply: applyState,
    //   documents: items.documents,
    // });
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
    await navigate("/");
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
    // console.log(imageData);
    const formData: any = new FormData();
    formData.append("files", imageData);
    await postImageFile({ data: imageFile });
  };

  const onCickImageUpload = () => {
    imageInputRef.current?.click();
  };
  return (
    <>
      <Flex
        style={{
          margin: "auto",
          width: "1680px",
          backgroundColor: "transparent",
        }}
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
            textAlign="center"
            paddingBottom={30}
            paddingTop={30}
            color="white"
          >
            나의 자기소개서 {emoji.WRITE}
          </Text>

          <Box
            display="flex"
            width="300px"
            height="300px"
            justifyContent="left"
            alignItems="center"
            margin={0}
            radius={8}
            style={{ boxSizing: "border-box" }}
          >
            {imageFile && (
              <img
                src={imageFile}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: imageFile,
                }}
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
                style={{ border: "3px solid #f8fafc", cursor: "pointer" }}
              >
                <Text color="white"> 기업의 로고 사진을 첨부해주세요</Text>
              </Box>
            )}

            <Button
              onClick={handleAttach}
              // 스타일
              width="300px"
              variant="skyblue_100"
              areaLabel="publish"
            >
              이미지 확인
            </Button>
          </Box>
          <CompanySelect
            company={applyState.company}
            department={applyState.department}
            setCompanyInfo={setApplyState}
          />

          <Grid gridTemplateColumns={`repeat(${count}, 1fr)`}>
            <FormList
              list={items.documents}
              deleteForm={_delete}
              onChange={update}
            />
          </Grid>
        </Section>

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
          style={{
            boxShadow: `rgb(0 0 0 / 10%) 10px 10px 30px`,
            position: "sticky",
            top: "200px",
          }}
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
          <Flex style={{ margin: "auto" }}>
            <select
              name="count"
              id="count-documents"
              onChange={handleSelect}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                marginInline: "1rem",
                fontSize: "1.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
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
              style={{
                display: "inline-block",
                lineHeight: "normal",
                verticalAlign: "middle",
              }}
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
              boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
              style={{ border: 0 }}
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

const CompanySelect = ({
  company,
  department,
  setCompanyInfo,
}: {
  company: string;
  department: string;
  setCompanyInfo: any;
}) => {
  return (
    <>
      <Box
        width="100%"
        height="70px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="transparent"
        padding={0}
        style={{ border: 0 }}
      >
        <Input
          type="text"
          name="company"
          placeholder="회사를 입력해주세요"
          className="input__company"
          value={company}
          onChange={setCompanyInfo}
          // 스타일
          width="100%"
          height="50px"
          variant="resume"
          boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
          radius={8}
          marginBottom={10}
          marginTop={10}
          marginLeft={10}
          marginRight={10}
        />
        <Input
          type="text"
          name="department"
          placeholder="부서를 입력해주세요"
          className="input__department"
          value={department}
          onChange={setCompanyInfo}
          // 스타일
          width="100%"
          height="50px"
          variant="resume"
          boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
          radius={8}
          marginBottom={10}
          marginTop={10}
          marginLeft={10}
          marginRight={10}
        />
      </Box>
    </>
  );
};

const FormList = ({
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
        boxShadow={`rgb(0 0 0 / 10%) 3px 3px 16px`}
        style={{
          border: "0",
          borderColor: "transparent",
        }}
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
          style={{ position: "relative" }}
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
              boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
              radius={8}
              marginTop={10}
              marginBottom={10}
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
              boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
              radius={8}
              marginTop={10}
              marginBottom={10}
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
              boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
              fontWeight={500}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={30}
              marginTop={10}
              marginBottom={10}
              style={{ border: 0 }}
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
