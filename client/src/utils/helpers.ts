import { theme } from "styles";
import { colors } from "./constants";
/**
 * debounce를 가져오도록 도와주는 함수
 * @param callback 지연시킨뒤 실행할 함수
 * @param delay 지연시킬 시간 (초)
 */

export function debounce<Params extends any[]>(
  callback: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}

export const throttler = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let throttleCheck: NodeJS.Timeout | any;
  const throttled = (...args: Parameters<F>) => {
    if (!throttleCheck) {
      throttleCheck = setTimeout(() => {
        func(...args);
        throttleCheck = null;
      }, waitFor);
    }
    return throttled as (...args: Parameters<F>) => ReturnType<F>;
  };
};

/**
 * formData를 가져오도록 도와주는 함수
 * @param object formData
 */
export function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}
/**
 * 배열의 자리를 바꿔주는 함수
 *
 * @param array 자리 바꿀 배열
 * @param i 자리를 바꿔야할 배열의 자리
 * @param j 자리를 이동해줄 배열의 자리
 */
export function swap<T>(array: T[], i: number, j: number): T[] {
  const snapShot = [...array];
  const temp = snapShot[i];
  snapShot[i] = snapShot[j];
  snapShot[j] = temp;
  return snapShot;
}
/**
 * 칸반의 색상을 랜덤으로 설정해주는 함수
 * @param variant theme에 지정한 색상에 맞게 랜덤으로 색상을 반환한다.
 *
 */
export function pickRandomColor(variant = "") {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (color + variant) as keyof typeof theme.colors;
}

/**
 * 랜덤으로 숫자를 출력해주는 함수
 * @param number 숫자를 넣으면, 최대 숫자가 param의 숫자만큼인 수를 랜덤으로 반환한다.
 */
export function generatorRandomCount(count: number) {
  const randomNum = Math.floor(Math.random() * count + 1);
  //Math.random 0~1 사이의 난수 생성
  //Math.floor 소수점을 내림시켜 정수로 만듦
  return randomNum;
}

/**
 * 날짜를 출력해주는 함수
 * @param date Date 타입을 넣어주면 0000년 00월 00일 00시 00분 으로 반환한다.
 */
export function getFirebaseTimeToDate(date: Date | null) {
  if (date === null) return "아직 수정을 하지 않았습니다.";
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}

/**
 * 날짜에 따라, 상반기/하반기를 나타내주는 함수
 * @param date 현재의 Date를 넣어주면, 1월 ~ 6월까지는 상반기, 7월부터 12월까지 하반기를 반환한다.
 */
export function getFirstSecondHalf(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  return `${year}년 ${month >= 6 ? "하반기" : "상반기"}`;
}
/**
 * String의 배열안의 글자의 길이에 따른 오름차순 정렬하는 함수
 * @param array 배열을 넣어주면, 글자 길이에 따른 오름 차순 정렬한 배열을 반환한다.
 */
export function getSortedArray(array: (string | undefined)[]) {
  if (array[0] === "") return array;
  return array.sort((a, b) => (a as string).length - (b as string).length);
}

type color =
  | "primary"
  | "default"
  | "zinc_200_filled"
  | "vermillion_400_fill"
  | "tdred_400_fill"
  | "skyblue_500_fill"
  | "zinc_700_fill"
  | "tdblue_300_fill"
  | "blackText_1_fill"
  | "skyblue_300_fill"
  | "skyblue_400_fill";

export function randomButtonColor(): color {
  const colorArray: color[] = [
    "primary",
    "zinc_200_filled",
    "vermillion_400_fill",
    "tdred_400_fill",
    "skyblue_500_fill",
    "zinc_700_fill",
    "tdblue_300_fill",
    "blackText_1_fill",
    "skyblue_300_fill",
    "skyblue_400_fill",
  ];
  return colorArray[Math.floor(Math.random() * colorArray.length)] as color;
}
