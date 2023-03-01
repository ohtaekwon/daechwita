import React from "react";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

import { updateApplications } from "lib/apis/api/applications";
import { requestGet } from "lib/apis/utils/methods";
import { useInputReducer } from "hooks/app/useInputReducer";

import Section from "components/section";
import Text from "_common/components/text";
import Form from "_common/components/form";
import Box from "_common/components/box";
import Input from "_common/components/input";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";
import Grid from "_common/components/grid";
import useItems from "hooks/app/useItems";
import { getResumes } from "lib/apis/api/resumes";

type FormList = {
  id: string;
  text: string;
  title: string;
  tag: string;
}[];

const WriteResume = () => {
  React.useEffect(() => {
    getResumes().then((res) => console.log(res));
  }, []);
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
        <Box width="100%" height="50px" display="flex"></Box>
        <Box width="200px" height="50px" display="flex" margin="0"></Box>
        <Grid gridTemplateColumns="repeat(2, 1fr)"></Grid>
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
            {/* {item.text.length || 0} 자 */}
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
