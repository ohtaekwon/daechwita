import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import useInput from "hooks/app/useInput";

import Input from "_common/components/input";
import Box from "_common/components/box";
import Button from "_common/components/button";
import Form from "_common/components/form";
import Section from "components/section";

const Search = () => {
  const navigate = useNavigate();
  const [select, setSelect] = React.useState("all");
  const [search, onChange, setSearch] = useInput("");

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("serarch", search);
    navigate(`/resumes?${select}=${search}`);
  };
  return (
    <>
      <Section
        as="aside"
        width="100%"
        padding="1.5rem"
        className="sub_nav"
        backgroundColor="gray_100"
        backgroundImage={`linear-gradient(
      -90deg,
      rgb(118, 84, 219, .5) 0%,
      rgb(98, 136, 252, .8) 100%
    )
    
    `}
      >
        <Box
          width="1000px"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          position="relative"
          margin="auto"
        >
          <Form onSubmit={onSubmit}>
            <select
              name="count"
              id="count-documents"
              onChange={onSelect}
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                marginInline: "1rem",
                fontSize: "1.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                border: 0,
              }}
            >
              <option value="all">전체</option>
              <option value="tag">유형</option>
              <option value="title">제목</option>
              <option value="text">본문</option>
            </select>
            <Input
              type="text"
              name="search"
              placeholder="검색어를 입력해주세요"
              value={search}
              onChange={onChange}
              // 스타일
              variant="search_1"
              color="black"
              placeholderColor="gray_200"
            />
            <Button
              type="submit"
              variant="default"
              position="absolute"
              height="100%"
              top={0}
              right={0}
              style={{ padding: 0 }}
            >
              <AiOutlineSearch size={30} />
            </Button>
          </Form>
        </Box>
      </Section>
    </>
  );
};

export default Search;
