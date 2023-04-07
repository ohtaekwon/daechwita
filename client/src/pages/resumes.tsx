/** @jsxImportSource @emotion/react */
import React from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import _ from "lodash";
import { useInfiniteQuery } from "react-query";
import { QueryKeys } from "queryClient";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useRecoilValue } from "recoil";
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

const Resumes = () => {
  const navigate = useNavigate();

  /** *@description search의 select박스와 검색 Keyword의 전역상태 */
  // const select = useRecoilValue(selectAtom);
  const keyword = useRecoilValue(keywordAtom);

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
    if (!data?.pages) return;
    setResumes(data?.pages);
  }, [data?.pages]);

  // React.useEffect(() => {
  //   // if (select === "company") {
  //   //   setResumes((allData: any) => {
  //   //     return allData?.filter((page: any) =>
  //   //       page.filter((item: any) => item.resumes.apply.company === keyword)
  //   //     );
  //   //   });
  //   // } else {
  //   //   setResumes(data?.pages);
  //   // }
  // }, [keyword]);

  if (error) return null;
  if (isLoading)
    return (
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        css={css`
          height: 10px;
          padding: 2rem 0;
        `}
      >
        로딩중입니다.
      </Text>
    );
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
          gridTemplateRows="repeat(4, 1fr)"
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
