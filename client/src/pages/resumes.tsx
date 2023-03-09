import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { v4 as uuid } from "uuid";

import { createResume, getAllResumes } from "lib/apis/api/resumes";

import Section from "components/section";
import { ResumeCard as Card } from "components/card";
import Text from "_common/components/text";
import Button from "_common/components/button";
import { getResumesService } from "lib/apis/service/getResumes";
import Box from "_common/components/box";
import Grid from "_common/components/grid";
import useInterSection from "hooks/app/useInterSection";
import { emoji } from "utils/constants";

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
  const fetchMoreRef = React.useRef<HTMLDivElement>(null);
  const intersecting = useInterSection(fetchMoreRef);
  const [resumes, setResumes] = React.useState<ResumesResponse[]>([]);
  const [toggle, setToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    // if (!intersecting) {
    //   return;
    // }
    getAllResumes()
      .then(getResumesService)
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
    await navigate("/write/resume");
  };

  console.log("intersecting", intersecting, "fetchMoreRef", fetchMoreRef);

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
          // gridTemplateRows="repeat(2, 1fr)"
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
            ({
              id,
              createdAt,
              imgUrl,
              updatedAt,
              uid,
              resumes,
              tag,
            }: ResumesResponse) => (
              <Card
                key={id}
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
        <div className="fetchMore" ref={fetchMoreRef}></div>
      </Section>
    </>
  );
};

export default Resumes;
