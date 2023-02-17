import React from "react";
import Section from "components/section";
import Flex from "_common/components/flex";

const Home = ({ leftNav }: { leftNav: React.ReactNode }) => {
  const handleClick = () => {};

  const handleSpeech = () => {};

  return (
    <>
      <div className="homepage">
        <Flex as="main">
          {leftNav}
          <Section
            as="section"
            sectionType="grid"
            width={100}
            gridTemplateColumns="repeat(5, 1fr)"
            paddingBottom={10}
            paddingRight={10}
            paddingLeft={10}
            paddingTop={10}
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
