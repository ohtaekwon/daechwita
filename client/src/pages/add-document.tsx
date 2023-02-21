import React from "react";
import { v4 as uuid } from "uuid";

import useInput from "hooks/app/useInput";

import Section from "components/section";

import Text from "_common/components/text";
import Form from "_common/components/form";
import Box from "_common/components/box";
import Input from "_common/components/input";
import Button from "_common/components/button";
import Textarea from "_common/components/textarea";
import form from "_common/components/form";
import {
  createApplications,
  updateApplications,
} from "lib/apis/api/applications";
import { useParams } from "react-router-dom";

type FormListType = {
  [key in string]: FormData[];
}[];
const AddDocument = () => {
  const params = useParams();
  const { id } = params;

  const [formList, setFormList] = React.useState<FormListType>([]);

  const addForm = React.useCallback(() => {
    console.log("Form을 추가합니다.");

    setFormList((allForms: any) => {
      // const newFormData = {
      //   [uuid()]: new FormData(),
      // };
      return [...allForms, { [uuid()]: new FormData() }];
    });
  }, [formList, setFormList]);

  const deleteForm = React.useCallback(
    (id: string) => {
      console.log(`Form ${id} 을 삭제 중입니다...`);

      setFormList((allForms) => {
        const newData = [...allForms];
        const targetIndex = newData.findIndex(
          (data) => Object.keys(data)[0] === id
        );
        if (targetIndex < 0) throw Error("없습니다.");
        newData.splice(targetIndex, 1);
        return newData;
      });
    },
    [formList, setFormList]
  );

  const handleSubmit = async () => {
    const list: any = document.getElementsByClassName("form__item");
    const dataList: any = [];

    for (let i = 0; i < list.length; i++) {
      let newObj: any = {};
      for (let j = 0; j < 3; j++) {
        newObj[list[i][j].name] = list[i][j].value;
      }
      dataList.push(newObj);
    }
    await updateApplications(id!, { documents: dataList });

    // const formDataList = Array.from({ length: list.length }, () => {
    //   const formData = new FormData();
    //   return formData;
    // });

    // for (let i = 0; i < formDataList.length; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     formDataList[i].append(list[i][j].name, list[i][j].value);
    //   }
    // }
    // await updateApplications(id!, formDataList);
    // for await (const data of list) {
    //   for (let i = 0; i < data.length; i++) {
    //     formData.append(data[i].name, JSON.stringify(data[i].value));
    //   }
    // }
    // console.log(formDataList);
  };

  // console.log(id, typeof Number(id));
  return (
    <>
      <Section
        width="1280px"
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
        <Button variant={"zinc_200"} onClick={addForm}>
          추가하기
        </Button>
        <Button variant={"zinc_200"} onClick={handleSubmit}>
          저장하기
        </Button>

        <FormList list={formList} deleteForm={deleteForm} />
      </Section>
    </>
  );
};
export default AddDocument;

const FormList = ({
  list,
  deleteForm,
}: {
  list: any;
  deleteForm: (id: string) => void;
}) => {
  return (
    <>
      {list &&
        list.map((item: any, i: React.Key) => (
          <FormItem key={i} item={item} onDelete={deleteForm} />
        ))}
    </>
  );
};

const FormItem = ({
  item,
  onDelete,
}: {
  item: any;
  onDelete: (id: string) => void;
}) => {
  const [tag, handleTagChange] = useInput("");
  const [title, handleTitleChange] = useInput("");
  const [text, handleTextChange] = useInput("");
  const formKey = Object.keys(item)[0];

  const handleDelete = () => {
    onDelete(formKey);
  };

  return (
    <>
      <Box width="100%" height="600px" margin="auto">
        <Form action="" style={{ position: "relative" }} className="form__item">
          <Box display="flex" direction="column">
            <Input
              type="text"
              id="tag"
              name="tag"
              className="input__tag"
              width="100%"
              height="50px"
              value={tag}
              onChange={handleTagChange}
              placeholder="tag를 입력해주세요"
            />
            <Input
              type="title"
              id="title"
              name="title"
              className="input__title"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
              width="100%"
              height="50px"
              borderColor="slate_700"
            />
            <Textarea
              name="text"
              width="100%"
              className="input__text"
              height={400}
              margin="auto"
              paddingBottom={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={30}
              fontSize="md"
              placeholder="본문을 입력해주세요"
              onChange={handleTextChange}
              fontWeight={500}
              value={text}
            >
              {text}
            </Textarea>
            {/* <Button type="submit" variant={"zinc_200"}>
              확인
            </Button> */}
          </Box>
        </Form>
        <Button
          type="button"
          variant="skyblue_300_fill"
          // position="absolute"
          onClick={handleDelete}
        >
          삭제하기
        </Button>
      </Box>
    </>
  );
};
