/** @jsxImportSource @emotion/react */
import React from "react";
import _ from "lodash";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { useRecoilState } from "recoil";
import { SelectType, keywordAtom, selectAtom } from "store/atoms";

import Input from "_common/components/Input";
import Box from "_common/components/Box";
import Button from "_common/components/Button";
import Form from "_common/components/Form";
import Section from "_common/components/Section";
import { media } from "utils/media";

const options = [
  { value: "none", name: "선택" },
  { value: "company", name: "회사" },
  { value: "department", name: "부서" },
  { value: "tag", name: "유형" },
  { value: "title", name: "제목" },
  { value: "text", name: "본문" },
];

const Search = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useRecoilState(selectAtom);
  const [keyword, setKeyword] = useRecoilState(keywordAtom);
  const [value, setValue] = React.useState("");

  const onSelect = _.debounce((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value as SelectType);
  }, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (select === "none") return alert("세부항목을 선택해주세요");
    setKeyword(value);
    // navigate(`/resumes?${select}=${keyword}`);
  };
  React.useEffect(() => {}, [select]);

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
              {options.map(({ value, name }, index) => (
                <option key={`${value}-${index}`} value={value}>
                  {name}
                </option>
              ))}
            </select>
            <Input
              type="text"
              name="search"
              placeholder="검색어를 입력해주세요"
              value={value}
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
