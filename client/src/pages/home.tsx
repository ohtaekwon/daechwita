import React from "react";
import Section from "components/section";
import useFetch from "hooks/useFetch";

const Home = () => {
  const { payload, loading } = useFetch("get", "/documents");
  // console.log("payload", loading, payload);

  return (
    // <Layout as="main" variant="default" >
    //   <Flex>
    //     <Section as="aside" width={20}>
    //       사이드 네브
    //     </Section>
    //     <Section as="section" width={80}>
    //       컨텐츠
    //     </Section>
    //   </Flex>
    // </Layout>

    <Section as="section" width={80}>
      <div>ㅇㅇ</div>
    </Section>
  );
};
export default Home;
