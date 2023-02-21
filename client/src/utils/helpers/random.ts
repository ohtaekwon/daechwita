import { theme } from "styles";
import { colors } from "utils/constants/color";

/**
 * 칸반의 색상을 랜덤으로 설정해주는 함수
 */
function pickRandomColor(variant = "") {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (color + variant) as keyof typeof theme.colors;
}
export default pickRandomColor;
