import React from "react";
import { v4 as uuid } from "uuid";
import { FaTrashAlt } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useInputReducer } from "hooks/app/useInputReducer";
import useItems from "hooks/app/useItems";

import Section from "components/section";
import Text from "_common/components/text";
import Form from "_common/components/form";
import Box from "_common/components/box";
import Input from "_common/components/input";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";
import Grid from "_common/components/grid";
import { getLatestResume, updateResume } from "lib/apis/api/resumes";
import { postImageFile } from "lib/apis/api/formData";
import Flex from "_common/components/flex";

const WriteResume = () => {
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = React.useState({});
  const [imageFile, setImageFile] = React.useState<any>();
  const [count, setCount] = React.useState<number>(1);
  const [resumeId, setResumeId] = React.useState<string>("");
  const [applyState, setApplyState] = useInputReducer({
    company: "",
    department: "",
  });
  const { add, update, _delete, items, setItems } = useItems("documents", {
    id: uuid(),
    text: "본문을 입력해주세요.",
    title: "제목을 입력해주세요.",
    tag: "태그를 입력해주세요.",
  });
  React.useEffect(() => {
    getLatestResume({ latest: true }).then((res) => {
      setResumeId(res.data[0].id);
      setItems({ documents: res.data[0].documents });
    });
  }, []);

  const onSave = async () => {
    /**
     * 임시 저장
     */
    await updateResume(resumeId, {
      /**
       * 확인하여 Publishing
       */
      apply: applyState,
      documents: items.documents,
    });
  };
  const onPublish = async () => {
    await updateResume(resumeId, {
      publishing: true,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    const { ariaLabel } = e.currentTarget;
    if (ariaLabel === "save") {
      onSave();
    } else if (ariaLabel === "publish") {
      onPublish();
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
    await postImageFile(
      { data: formData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const onCickImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <>
      <Section
        width="100%"
        height="100vh"
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
          marginTop={30}
          marginBottom={30}
        >
          자소서 쓰기
        </Text>
        <Box
          width="100%"
          height="130px"
          display="flex"
          style={{
            boxShadow: `rgb(0 0 0 / 10%) 0px 0px 8px`,
          }}
        >
          <Button
            onClick={handleSubmit}
            // 스타일
            width="100%"
            height="100px"
            variant="tdred_400"
            areaLabel="save"
            style={{ marginInline: "1rem" }}
          >
            임시 저장 하기
          </Button>
          <Button
            onClick={handleSubmit}
            // 스타일
            width="100%"
            height="100px"
            variant="tdred_400_fill"
            areaLabel="publish"
            fontSize="lg"
            style={{ marginInline: "1rem" }}
          >
            출간하기
          </Button>
          <select
            name="count"
            id="count-documents"
            onChange={handleSelect}
            style={{
              width: "200px",
              height: "100%",
              display: "flex",
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
          <Flex direction="column">
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
        <Box
          display="flex"
          direction="column"
          width="300px"
          height="400px"
          justifyContent="center"
          alignItems="center"
          margin="auto"
          style={{ boxSizing: "border-box" }}
        >
          <img
            src={imageFile}
            style={{
              width: "300px",
              height: "100%",
              backgroundImage: imageFile,
            }}
          />
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
        backgroundColor="light_blue"
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
          backgroundColor="gray_50"
          borderColor="slate_50"
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
          backgroundColor="gray_50"
          borderColor="slate_50"
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
  list: { id: string; title: string; text: string; tag: string }[] | any;
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
        // margin="auto"
        position="relative"
        backgroundColor="light_blue"
        style={{ border: "0", borderColor: "transparent" }}
      >
        <Button
          type="button"
          variant="skyblue_300_fill"
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
          <Box display="flex" width="100%" height="100%" direction="column">
            <Input
              type="text"
              id="tag"
              name="tag"
              className="input__tag"
              value={item.tag}
              onChange={handleChange}
              placeholder="tag를 입력해주세요"
              // 스타일
              width="100%"
              height="50px"
              backgroundColor="gray_50"
              borderColor="slate_50"
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
              backgroundColor="gray_50"
              borderColor="slate_50"
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
              backgroundColor="gray_50"
              borderColor="slate_50"
              fontWeight={500}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={30}
              marginTop={10}
              marginBottom={10}
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
