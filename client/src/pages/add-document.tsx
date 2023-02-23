import React from "react";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

import { updateApplications } from "lib/apis/api/applications";
import useFetch from "hooks/app/useFetch";

import Section from "components/section";
import Text from "_common/components/text";
import Form from "_common/components/form";
import Box from "_common/components/box";
import Input from "_common/components/input";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";
import Grid from "_common/components/grid";
import { requestGet } from "lib/apis/utils/methods";
import { useUserFormInput } from "hooks/app/useFormInput";

type FormList = {
  id: string;
  title: string;
  text: string;
  tag: string;
}[];
const AddDocument = () => {
  const { id } = useParams();
  const { payload: data } = useFetch(`applications/${id}`);
  const [formList, setFormList] = React.useState<FormList>([]);
  const initalState = {
    company: "",
    department: "",
  };
  const [companyInfo, setCompanyInfo] = useUserFormInput(initalState);

  React.useEffect(() => {
    requestGet(`applications/${id}`).then((res) => {
      setFormList(res.documents);
    });
  }, []);

  const addForm = React.useCallback(() => {
    console.log("Form을 추가합니다.");

    setFormList((allForms: any) => {
      return [
        ...allForms,
        {
          id: uuid(),
          text: "",
          title: "",
          tag: "",
        },
      ];
    });
  }, [formList, setFormList]);

  const updateForm = React.useCallback(
    (id: string, data = {}) => {
      setFormList((allForms: any) => {
        const newData = [...allForms];
        const targetIndex = newData.findIndex((data) => data.id === id);
        if (targetIndex < 0) throw Error("없습니다.");
        newData.splice(targetIndex, 1, data);
        return newData;
      });
    },
    [formList, setFormList]
  );

  const deleteForm = React.useCallback(
    (id: string) => {
      console.log(`Form ${id} 을 삭제 중입니다...`);

      setFormList((allForms) => {
        const newData = [...allForms];
        const targetIndex = newData.findIndex((data) => data.id === id);
        if (targetIndex < 0) throw Error("없습니다.");
        newData.splice(targetIndex, 1);
        return newData;
      });
    },
    [formList, setFormList]
  );

  const updateDocuments = async () => {
    // const inputs: any = Array.from(document.querySelectorAll("input"));
    // const forms: any = document.getElementsByClassName("form__item");
    // let apply: any = {};
    // let documents: any = [];
    // /**
    //  * company, department 입력
    //  */
    // for await (let inputItem of inputs.slice(0, 2)) {
    //   apply[inputItem.name] = inputItem.value;
    // }
    // /**
    //  * title, text, tag 입력
    //  */
    // for (let i = 0; i < forms.length; i++) {
    //   let newObj: any = {};
    //   for (let j = 0; j < 3; j++) {
    //     newObj.id = forms[i].id;
    //     newObj[forms[i][j].name] = forms[i][j].value;
    //   }
    //   documents.push(newObj);
    // }

    // console.log("update", apply, documents);
    await updateApplications(id!, { apply: companyInfo, documents: formList });
  };

  const handleSubmit = async () => {
    await updateApplications(id!, { apply: companyInfo, documents: formList });
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
          <Button variant={"zinc_200"} onClick={addForm}>
            추가하기
          </Button>
          <Button variant={"zinc_200"} onClick={handleSubmit}>
            저장하기
          </Button>
        </Box>
        <Box width="200px" height="50px" display="flex" margin="0">
          <CompanySelect
            company={companyInfo.company}
            department={companyInfo.department}
            setCompanyInfo={setCompanyInfo}
          />
        </Box>
        <Grid gridTemplateColumns="repeat(2, 1fr)">
          <FormList
            list={formList}
            deleteForm={deleteForm}
            updateForm={updateForm}
          />
        </Grid>
      </Section>
    </>
  );
};
export default AddDocument;

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
  updateForm,
  deleteForm,
}: {
  list: any;
  updateForm: (id: string, data: any) => void;
  deleteForm: (id: string) => void;
}) => {
  return (
    <>
      {list &&
        list.map((item: any, key: React.Key) => (
          <FormItem
            key={key}
            item={item}
            onDelete={deleteForm}
            onUpdate={updateForm}
          />
        ))}
    </>
  );
};

const FormItem = ({
  item,
  onUpdate,
  onDelete,
}: {
  item: { title: string; text: string; tag: string; id: string };
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}) => {
  const initalDocumentState = {
    id: item.id,
    tag: item.tag,
    title: item.title,
    text: item.text,
  };
  const [documentInfo, setDocumentInfo] = useUserFormInput(initalDocumentState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentInfo(e);
    onUpdate(item.id, {
      id: item.id,
      tag: documentInfo.tag,
      title: documentInfo.title,
      text: documentInfo.text,
    });
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
          action=""
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
              value={documentInfo.tag}
              onChange={onChange}
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
              value={documentInfo.title}
              onChange={onChange}
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
              value={documentInfo.text}
              onChange={onChange}
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
              {documentInfo.text}
            </Textarea>
            {documentInfo.text.length} 자
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

// const { value: tag, onChange: handleTagChange } = useInput(item.tag || "");
// const { value: title, onChange: handleTitleChange } = useInput(
//   item.title || ""
// );
// const { value: text, onChange: handleTextChange } = useInput(item.text || "");
