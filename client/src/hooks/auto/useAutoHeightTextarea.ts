import React from "react";

function useAutoHeightTextarea() {
  // 사용자 입력 저장
  const [checkItemContent, setCheckItemContent] = React.useState("");
  // 줄바꿈 위치를 저장하는 Dictionary
  const [lineBreakIndexDict, setLineBreakIndexDict] = React.useState<any>({});
  // 줄 수 (높이)
  const [lineHeight, setLineHeight] = React.useState(0);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  // 사용자 입력 업데이트 및 줄바꿈 감지
  const checkItemChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCheckItemContent(event.target.value);

    // Scroll이 생기면 line break
    if (event.target.scrollHeight !== event.target.clientHeight) {
      setLineHeight((prev) => prev + 1); // textarea 높이 늘리고
      setLineBreakIndexDict({
        ...lineBreakIndexDict,
        [event.target.value.length - 1]: 1,
      }); // 줄바꿈 위치 저장
    } else {
      // 다시 줄바꿈 지점으로 오면 line break 취소
      if (lineBreakIndexDict[event.target.value.length]) {
        setLineHeight((prev) => prev - 1); // textarea 높이 줄이고
        setLineBreakIndexDict({
          ...lineBreakIndexDict,
          [event.target.value.length]: 0,
        }); // Dictionary에서 삭제
      }
    }
  };

  // 너비 초과로 인한 줄바꿈 말고 사용자가 엔터를 입력했을 때의 줄바꿈 처리
  const checkItemEnterHandler: (e: any) => void = (
    event: React.KeyboardEventHandler<HTMLTextAreaElement>
  ) => {
    if ((event as any).key === "Enter") {
      // textarea 높이는 checkItemChangeHandler에서 변경됨
      setLineBreakIndexDict({
        ...lineBreakIndexDict,
        [(event as any).target.value.length]: 1,
      }); // 줄바꿈 위치 저장
    }
  };

  return {
    textAreaRef,
    lineHeight,
    checkItemEnterHandler,
    checkItemChangeHandler,
  };
}
export default useAutoHeightTextarea;
