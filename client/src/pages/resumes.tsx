import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { v4 as uuid } from "uuid";

import { createResume, getAllResumes } from "lib/apis/api/resumes";
import { getOnlyPublishedResumesService } from "lib/apis/service/getResumes";
import useInterSection from "hooks/app/useInterSection";
import { emoji } from "utils/constants";

import Section from "components/section";
import { ResumeCard as Card } from "components/card";
import Text from "_common/components/text";
import Button from "_common/components/button";
import Box from "_common/components/box";
import Grid from "_common/components/grid";

type TimeType = {
  seconds: number;
  nanoseconds: number;
};

interface ResumesResponse {
  id: string;
  createdAt: TimeType;
  uid: string;
  imgUrl: string;
  updatedAt: null | TimeType;
  resumes: {
    apply: {
      company: string;
      department: string;
    };
    documents: {
      id: string;
      tag: string;
      text: string;
      title: string;
    }[];
  };
  tag: (string | undefined)[];
}

const Resumes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const decodeUri = decodeURI(location?.search);
  const [resumes, setResumes] = React.useState<ResumesResponse[]>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);

  const fetchMoreRef = React.useRef<HTMLDivElement>(null); // 맨 밑의 무한스크롤을 감지하기 위한 DIV 태그
  /**
   * 무한스크롤 커스텀 훅
   * @params targetRef
   */
  const intersecting = useInterSection(fetchMoreRef);

  React.useEffect(() => {
    // if (!intersecting) {
    //   return;
    // }

    getAllResumes()
      .then(getOnlyPublishedResumesService)
      .then((res) => setResumes(res));
  }, [, toggle]);

  const handleAddClick = async () => {
    await createResume({
      imgUrl: "",
      apply: {
        company: "",
        department: "",
      },
      documents: [
        {
          id: uuid(),
          title: "",
          text: "",
          tag: "",
        },
      ],
      publishing: false,
    });
    await navigate("write");
  };
  console.log("decodeUri", decodeUri);
  return (
    <>
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        style={{ height: "10px", padding: "2rem 0" }}
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
          gridTemplateColumns="repeat(3, 1fr)"
          gridTemplateRows="repeat(3, 1fr)"
          placeItems="center"
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

          {resumes.map(
            (
              {
                id,
                createdAt,
                imgUrl,
                updatedAt,
                uid,
                resumes,
                tag,
              }: ResumesResponse,
              index
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
                setToggle={setToggle}
              />
            )
          )}
        </Grid>
        {/* <div className="fetchMore" ref={fetchMoreRef}></div> */}
      </Section>
    </>
  );
};

export default Resumes;
