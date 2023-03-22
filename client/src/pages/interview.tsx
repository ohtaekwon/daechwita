import { getLatestResume } from "lib/apis/api/resumes";
import React from "react";

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
  const [value, setValue] = React.useState("안녕하세요");

  //음성 변환 목소리 preload
  React.useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const handleInput = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleButton = () => {
    getSpeech(value);
  };

  // React.useEffect(() => {
  //   getLatestResume({ latest: true }).then((res) => {
  //     console.log(res);
  //   });
  // }, []);
  return (
    <>
      <h1>TTS(한국어)</h1>
      <p>텍스트를 입력하고 음성 변환 버튼을 클릭하세요.</p>
      <div className="box">
        <input onChange={handleInput} value={value} />
        <button onClick={handleButton}>음성 변환</button>
      </div>
    </>
  );
};

export default Interview;
