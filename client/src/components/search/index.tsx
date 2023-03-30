/** @jsxImportSource @emotion/react */
import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import useInput from "hooks/app/useInput";

import Input from "_common/components/input";
import Box from "_common/components/box";
import Button from "_common/components/button";
import Form from "_common/components/form";
import Section from "components/section";
import { css } from "@emotion/react";
import { media } from "utils/media";

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
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          position="relative"
          margin="auto"
          css={responsive}
        >
          <Form onSubmit={onSubmit}>
            <select
              name="count"
              id="count-documents"
              onChange={onSelect}
              css={css`
                display: flex;
                margin: auto;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
                margin-inline: 1rem;
                font-size: 1.5rem;
                padding-left: 1rem;
                padding-right: 1rem;
                border: 0;
              `}
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
              css={css`
                padding: 0;
              `}
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

const responsive = css`
  height: 100%;
  ${media[0]} {
    width: 100%;
  }
  ${media[1]} {
    width: 100%;
  }
  ${media[2]} {
    width: 1300px;
  }
`;
