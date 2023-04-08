/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useInfiniteQuery } from "react-query";
import { QueryKeys } from "queryClient";

import useInterSection from "hooks/app/useInterSection";

import { getAllResumes } from "lib/apis/api/resumes";
import { getTempResumesService } from "lib/apis/service/getResumes";

import { TempResumeCard as Card } from "components/Card";

import Text from "_common/components/Text";
import Grid from "_common/components/Grid";

import { media } from "utils/media";
import { ResumesType } from "types/resumes";
import { theme } from "styles";
import Spinner from "components/Spinner";

const TempResumes = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteQuery<ResumesType[]>(
    QueryKeys.TEMP(),
    ({ pageParam = "" }) =>
      getAllResumes({ publishing: false, pageParam }).then(
        getTempResumesService
      ),
    {
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.at(-1)?.id;
      },
    }
  );

  /** *@description  resumes 데이터를 위한 상태관리 */
  const [tempResumes, setTempResumes] = React.useState<
    ResumesType[][] | undefined
  >([]);

  /** *@description  맨 밑의 무한스크롤을 감지하기 위한 DIV 태그 */
  const fetchMoreRef = React.useRef<HTMLDivElement>(null);

  /** * @description 무한스크롤을 위한 커스텀 훅 @params targetRef */
  const intersecting = useInterSection(fetchMoreRef);

  /** @description 화면 맨 마지막에 도달할 시, 다음 id값을 기준으로 데이터패칭 */
  React.useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  }, [intersecting]);

  React.useEffect(() => {
    if (!data?.pages) return;
    setTempResumes(data?.pages);
  }, [data?.pages]);

  /** @description mount시 색상 */
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.colors.lightBlue_50;
    return () => {
      document.body.style.backgroundColor = theme.colors.transparent;
    };
  }, []);

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, []);

  if (error)
    return (
      <Grid placeItems="center" css={errorStyle}>
        <h1 css={errorTextStyle}> Error - 재접속해주시기 바랍니다.</h1>
      </Grid>
    );
  if (isLoading) return <Spinner individualLoader />;

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
        임시 글 목록
      </Text>
      <Grid
        gridTemplateColumns="repeat(1, 1fr)"
        gridTemplateRows="repeat(1, 1fr)"
        placeItems="center"
        css={gridStyle}
      >
        {tempResumes?.map((page) =>
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
                imgUrl={imgUrl}
                createdAt={createdAt}
                uid={uid}
                updatedAt={updatedAt}
                resumes={resumes}
                tag={tag}
                colors={colors}
              />
            )
          )
        )}
      </Grid>
      <div className="fetchMore" ref={fetchMoreRef} css={fetchMoreStyle}></div>
    </>
  );
};

export default TempResumes;

const gridStyle = css`
  padding: 1rem 0;
  width: 100%;

  ${media[0]} {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
  ${media[1]} {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
  ${media[2]} {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
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
