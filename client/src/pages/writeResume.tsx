import React from "react";
import { v4 as uuid } from "uuid";

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
import { requestPost } from "lib/apis/utils/methods";
import { postImageFile } from "lib/apis/api/formData";

const WriteResume = () => {
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
        <Text fontSize="xxxl" fontWeight={700} textAlign="center">
          자소서 쓰기
        </Text>
        <Box width="100%" height="50px" display="flex">
          <Button variant="zinc_200" onClick={add}>
            추가 하기
          </Button>
          <Button variant="zinc_200" areaLabel="save" onClick={handleSubmit}>
            저장 하기
          </Button>
          <Button variant="zinc_200" areaLabel="publish" onClick={handleSubmit}>
            확인
          </Button>
          <button onClick={handleAttach}>이미지 전송</button>
          <select name="count" id="count-documents" onChange={handleSelect}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <Input
            type="file"
            id="image-upload"
            accept="image/*"
            name="image"
            onChange={onChangeImg}
          />
        </Box>
        <Box width="200px" height="200px" display="flex" margin="0">
          <img
            src={imageFile}
            style={{
              height: "100%",
              backgroundImage: imageFile,
            }}
          />
        </Box>
        <Box width="200px" height="50px" display="flex" margin="0">
          <CompanySelect
            company={applyState.company}
            department={applyState.department}
            setCompanyInfo={setApplyState}
          />
        </Box>
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
      <Form className="form__select">
        <Input
          type="text"
          name="company"
          placeholder="회사를 입력해주세요"
          className="input__company"
          // 스타일
          width="500px"
          backgroundColor="white"
          borderColor="vigreen_500"
          radius={8}
          value={company}
          onChange={setCompanyInfo}
        />
        <Input
          type="text"
          name="department"
          placeholder="부서를 입력해주세요"
          className="input__department"
          // 스타일
          width="500px"
          backgroundColor="white"
          borderColor="vigreen_500"
          radius={8}
          value={department}
          onChange={setCompanyInfo}
        />
      </Form>
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
      <Box width="100%" height="100%" margin="auto">
        <Form
          id={item.id}
          className="form__item"
          style={{ position: "relative" }}
          height="auto"
        >
          <Box display="flex" height="100%" direction="column">
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
              backgroundColor="white"
              borderColor="vigreen_500"
              radius={8}
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
              backgroundColor="white"
              borderColor="vigreen_500"
              radius={8}
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
              margin="auto"
              fontSize="lg"
              fontWeight={500}
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={30}
              backgroundColor="white"
              borderColor="vigreen_500"
            >
              {item.text}
            </Textarea>
            {item.text.length + item.title.length || 0} 자
            <Button
              type="button"
              variant="skyblue_300_fill"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  );
};
