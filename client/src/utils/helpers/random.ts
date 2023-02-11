import { theme } from "styles";
import { colors } from "utils/constants/color";

function pickRandomColor(variant = "") {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (color + variant) as keyof typeof theme.colors;
}
export default pickRandomColor;
