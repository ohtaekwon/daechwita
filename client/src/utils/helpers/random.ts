import { theme } from "styles";
import { colors } from "utils/constants/color";

/**
 * 칸반의 색상을 랜덤으로 설정해주는 함수
 */
export function pickRandomColor(variant = "") {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (color + variant) as keyof typeof theme.colors;
}

export function generatorRandomCount(count: number) {
  const randomNum = Math.floor(Math.random() * count + 1);
  //Math.random 0~1 사이의 난수 생성
  //Math.floor 소수점을 내림시켜 정수로 만듦
  return randomNum;
}
