import React from "react";
import Section from "components/section";
import useFetch from "hooks/app/useFetch";
import Flex from "_common/components/flex";

const Home = ({ leftNav }: { leftNav: React.ReactNode }) => {
  // const { payload, loading } = useFetch("get", "/item");
  const { payload: usersPayload, loading, doFetch } = useFetch("get", "/users");
  const {
    payload: ttsPayload,
    loading: ttsLoading,
    doFetch: ttsDoFetch,
  } = useFetch("get", "/tts");

  const handleClick = () => {
    // doFetch({
    //   method: "post",
    //   data: {
    //     "test4@gmail.com": {
    //       email: "test4@gmail.com",
    //       nickName: "테스트3",
    //       pw: 1234,
    //       itemOfUser: [],
    //     },
    //   },
    // });
  };

  const handleSpeech = () => {
    ttsDoFetch({
      method: "get",
    });
  };

  return (
    <>
      <div className="homepage">
        <Flex as="main">
          {leftNav}
          <Section
            as="section"
            sectionType="grid"
            gridTemplateColumns="repeat(5, 1fr)"
          >
            <div style={{ backgroundColor: "rosybrown" }} onClick={handleClick}>
              섹션1
            </div>
            <div>섹션2</div>
            <div>섹션3</div>
            <div>섹션4</div>
            <div>섹션5</div>
            <div>섹션6</div>
            <div>섹션7</div>
            <div>섹션8</div>
            <div>섹션9</div>
            <div style={{ backgroundColor: "rosybrown" }}>섹션10</div>
            <div>섹션11</div>
            <div>섹션12</div>
            <button onClick={handleSpeech}>버튼</button>
          </Section>
        </Flex>
      </div>
    </>
  );
};
export default Home;
