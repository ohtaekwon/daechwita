import { colors } from "utils/constants/color";

function pickRandomColor(variant = "") {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color + variant;
}
export default pickRandomColor;
