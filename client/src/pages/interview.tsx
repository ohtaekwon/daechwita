/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { FcSpeaker } from "react-icons/fc";

import Spinner from "components/Spinner";

import Button from "_common/components/Button";
import Input from "_common/components/Input";
import Flex from "_common/components/Flex";
import Text from "_common/components/Text";

const getSpeech = (text: any) => {
  let voices: any[] = [];

  //디바이스에 내장된 voice를 가져온다.
  const setVoiceList = () => {
    voices = window.speechSynthesis.getVoices();
    // return voices[12];
    // console.log(voices[12]);
  };

  setVoiceList();

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    //voice list에 변경됐을때, voice를 다시 가져온다.
    window.speechSynthesis.onvoiceschanged = setVoiceList;
  }

  const speech = (txt: string | undefined) => {
    const lang = "ko-KR";
    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;
    /* 
      한국어 vocie 찾기
      디바이스 별로 한국어는 ko-KR 또는 ko_KR로 voice가 정의되어 있다.
    */
    const kor_voice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
    );

    // 한국어 voice가 있다면 ? utterance에 목소리를 설정한다 : 리턴하여 목소리가 나오지 않도록 한다.
    if (kor_voice) {
      utterThis.voice = kor_voice;
    } else {
      return;
    }

    //utterance를 재생(speak)한다.
    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};

const Interview = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");

  //음성 변환 목소리 preload
  React.useEffect(() => {
    window.speechSynthesis.getVoices();

    return () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleButton = () => {
    getSpeech(value);
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = "transparent";
    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);

  return (
    <Flex
      as="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      css={css`
        min-height: 100vh;
      `}
    >
      <Text
        fontSize="xxxl"
        fontWeight={700}
        textAlign="center"
        color="white"
        marginTop={10}
        marginBottom={10}
        css={textStyle}
      >
        나의 면접 대비
      </Text>
      <Text
        fontSize="xxl"
        fontWeight={700}
        textAlign="center"
        color="white"
        marginTop={10}
        marginBottom={10}
        lineHeight="xxl"
        css={textStyle}
      >
        면접 질문을 생각하고, 텍스트를 입력하여, <br />
        스피커 버튼을 클릭하면 음성이 <br />
        나옵니다.
      </Text>
      <Spinner />
      <Flex
        as="div"
        height="50px"
        css={css`
          margin-top: 20px;
          position: relative;
        `}
      >
        <Input
          type="text"
          name="interview"
          placeholder="면접의 질문을 넣어주세요."
          className="input__interview"
          ref={ref}
          value={value}
          onChange={handleInput}
          // 스타일
          width="500px"
          height="50px"
          variant="default"
          boxShadow={`0 4px 12px 0 rgb(0 0 0 / 40%), 0 4px 12px 0 rgb(0 0 0 /36%)`}
          radius={8}
          placeholderColor="white"
          css={css`
            color: black;
          `}
        />
        <Button
          onClick={handleButton}
          variant="default"
          height="100%"
          position="absolute"
          top={0}
          right={0}
        >
          <FcSpeaker size={30} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Interview;

const textStyle = css`
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  display: inline-block;
`;

const scheduleCardStyle = css`
  min-height: 200px;

  @media screen and (min-width: 320px) {
    width: 300px;
  }
  @media screen and (min-width: 420px) {
    width: 400px;
  }
  @media screen and (min-width: 520px) {
    width: 450px;
  }
  @media screen and (min-width: 620px) {
    width: 350px;
  }
  @media screen and (min-width: 720px) {
    width: 400px;
  }
  @media screen and (min-width: 820px) {
    width: 200px;
  }
  @media screen and (min-width: 920px) {
    width: 200px;
  }
  @media screen and (min-width: 1020px) {
    width: 200px;
  }
  @media screen and (min-width: 1120px) {
    width: 200px;
  }
  @media screen and (min-width: 1220px) {
    width: 200px;
  }
  @media screen and (min-width: 1280px) {
    width: 200px;
  }
`;
