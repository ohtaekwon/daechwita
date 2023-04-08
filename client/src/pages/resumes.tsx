/** @jsxImportSource @emotion/react */
import React from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import _ from "lodash";
import { useInfiniteQuery } from "react-query";
import { QueryKeys } from "queryClient";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { selectAtom } from "store/atoms";

import { getAllResumes } from "lib/apis/api/resumes";
import { getResumesService } from "lib/apis/service/getResumes";
import useInterSection from "hooks/app/useInterSection";

import Section from "_common/components/Section";
import { ResumeCard as Card } from "components/Card";
import Text from "_common/components/Text";
import Button from "_common/components/Button";
import Box from "_common/components/Box";
import Grid from "_common/components/Grid";

import { emoji } from "utils/constants";
import { media } from "utils/media";

import { ResumesType } from "types/resumes";
import { theme } from "styles";
import { keywordAtom } from "store/atoms";
import Skeleton from "components/Skeleton";
import Spinner from "components/Spinner";

const Resumes = () => {
  const navigate = useNavigate();

  /** *@description search의 select박스와 검색 Keyword의 전역상태 */
  const [select, setSelect] = useRecoilState(selectAtom);
  const [keyword, setKeyword] = useRecoilState(keywordAtom);

  /** *@description  resumes 데이터를 위한 상태관리 */
  const [resumes, setResumes] = React.useState<ResumesType[][] | undefined>([]);

  /** *@description  모달 창 open/close를 위한 상태관리 */
  const [toggle, setToggle] = React.useState<boolean>(false);

  /** *@description  맨 밑의 무한스크롤을 감지하기 위한 DIV 태그 */
  const fetchMoreRef = React.useRef<HTMLDivElement>(null);

  /** * @description 무한스크롤을 위한 커스텀 훅 @params targetRef */
  const intersecting = useInterSection(fetchMoreRef);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ResumesType[]>(
    QueryKeys.RESUMES(),
    ({ pageParam = "" }) =>
      getAllResumes({ pageParam }).then(getResumesService),
    {
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.at(-1)?.id;
      },
    }
  );
  /** @description 화면 맨 마지막에 도달할 시, 다음 id값을 기준으로 데이터패칭 */
  React.useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  }, [intersecting]);

  /**
   * @description Resumes 서버 데이터의 상태관리를 위한 훅 Resumes의 쿼리 데이터를 useMutation하여 CRUD를 하는 훅
   * @param queryClient 쿼리 클라이언트 @param QueryKeys 쿼리키 @return onCreate onDelete onUpdate onPublishing
   */
  const handleAddClick = async () => {
    await navigate("write", { replace: true });
  };

  /** @description mount시 배경색 색상 변경 */
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.colors.lightBlue_50;
    return () => {
      document.body.style.backgroundColor = theme.colors.transparent;
    };
  }, []);

  React.useEffect(() => {
    setKeyword("");
    setSelect("none");
  }, []);

  React.useEffect(() => {
    if (!data?.pages) return;

    if (!keyword) {
      setResumes(data?.pages);
    } else {
      const snapshot = data?.pages;

      if (select === "company") {
        const newData = snapshot.map((page) =>
          page.filter((item) => {
            const newCompany = item.resumes.apply.company.replace(/\s+/g, "");
            const newKeyword = keyword.replace(/\s+/g, "");
            return newCompany.length >= newKeyword.length
              ? newCompany.includes(newKeyword)
              : newKeyword.includes(newCompany);
          })
        );
        setResumes(newData);
      } else if (select === "department") {
        const newData = snapshot.map((page) =>
          page.filter((item) => {
            const newDep = item.resumes.apply.department.replace(/\s+/g, "");
            const newKeyword = keyword.replace(/\s+/g, "");
            return newDep.length >= newKeyword.length
              ? newDep.includes(newKeyword)
              : newKeyword.includes(newDep);
          })
        );
        setResumes(newData);
      } else if (select === "tag") {
        const newData = snapshot.map((page) =>
          page.filter((item) => {
            const newItemTag = item.tag.map((t) => t?.replace(/\s+/g, ""));
            const newKeyword = keyword.replace(/\s+/g, "");
            return newItemTag.find((t) =>
              t && t?.length > newKeyword.length
                ? t?.includes(newKeyword)
                : newKeyword.includes(t!)
            );
          })
        );
        setResumes(newData);
      } else if (select === "title") {
        const newData = snapshot.map((page) =>
          page.filter((item) => {
            const newItemTitle = item.resumes.documents.map((d) =>
              d.title?.replace(/\s+/g, "")
            );
            const newKeyword = keyword.replace(/\s+/g, "");
            return newItemTitle.find((title) =>
              title && title?.length > newKeyword.length
                ? title?.includes(newKeyword)
                : newKeyword.includes(title!)
            );
          })
        );
        setResumes(newData);
      } else if (select === "text") {
        const newData = snapshot.map((page) =>
          page.filter((item) => {
            const newItemText = item.resumes.documents.map((d) =>
              d.text?.replace(/\s+/g, "")
            );
            const newKeyword = keyword.replace(/\s+/g, "");
            return newItemText.find((text) =>
              text && text?.length > newKeyword.length
                ? text?.includes(newKeyword)
                : newKeyword.includes(text!)
            );
          })
        );
        setResumes(newData);
      } else {
        setResumes(data?.pages);
      }
    }
    // return () => {
    //   setKeyword("");
    //   // setResumes([]);
    // };
  }, [data?.pages, select, keyword]);

  if (error)
    return (
      <Grid placeItems="center" css={errorStyle}>
        <h1 css={errorTextStyle}> Error - 재접속해주시기 바랍니다.</h1>
      </Grid>
    );
  if (isLoading) return <Spinner individualLoader />;

  console.log(resumes);
  return (
    <>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        css={css`
          height: 10px;
          padding: 2rem 0;
        `}
      >
        나의 자소서 목록 {emoji.DOCUMENT}
      </Text>
      <Section
        as="section"
        width="100%"
        height="100%"
        paddingBottom={10}
        paddingRight={10}
        paddingLeft={10}
        paddingTop={10}
      >
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          // gridTemplateRows="repeat(4, 1fr)"
          placeItems="center"
          css={gridStyle}
        >
          <Box
            as="div"
            role="alert"
            variant="gray_200_border"
            width="100%"
            height="420px"
            marginTop={20}
            marginBottom={20}
            gap={20}
          >
            <Button
              width="100%"
              height="100%"
              variant="zinc_200"
              onClick={handleAddClick}
            >
              <AiOutlinePlusSquare size={100} />
            </Button>
          </Box>
          {resumes?.map((page) =>
            page.map(
              (
                {
                  id,
                  createdAt,
                  imgUrl,
                  updatedAt,
                  uid,
                  resumes,
                  tag,
                  colors,
                }: ResumesType,
                index: number
              ) => (
                <Card
                  key={`${id}-${index}`}
                  id={id}
                  uid={uid}
                  imgUrl={imgUrl}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  resumes={resumes}
                  tag={tag}
                  toggle={toggle}
                  colors={colors}
                  setToggle={setToggle}
                  loading={isLoading}
                />
              )
            )
          )}
        </Grid>
        <div
          className="fetchMore"
          ref={fetchMoreRef}
          css={fetchMoreStyle}
        ></div>
      </Section>
    </>
  );
};

export default Resumes;

const gridStyle = css`
  padding: 1rem 0;
  width: 100%;
  height: 100%;

  ${media[0]} {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
  ${media[1]} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  ${media[2]} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

const fetchMoreStyle = css`
  height: 1px;
  padding-bottom: 1px;
  margin-bottom: 5rem;
  height: 100px;
`;

const errorStyle = css`
  width: 100%;
  height: 100%;
`;
const errorTextStyle = css`
  font-size: 4rem;
  color: red;
`;
