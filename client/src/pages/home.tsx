import React from "react";
import Section from "components/section";
import Flex from "_common/components/flex";
import useFetch from "hooks/app/useFetch";
import { getUsers } from "lib/apis/api/users";

const Home = () => {
  const [data, setData] = React.useState<any>();

  const handleClick = () => {};

  const handleSpeech = () => {};

  React.useEffect(() => {
    getUsers().then((res) => setData(res));
  }, []);
  console.log(data);

  return (
    <>
      <Section
        as="section"
        width="100vw"
        height="100vh"
        display="grid"
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
    </>
  );
};
export default Home;
