import { breakpoint } from "styles/theme";

const breakpoints = [breakpoint.mobile, breakpoint.tablet, breakpoint.desktop];

export const media = breakpoints.map(
  (bp) => `@media screen and (min-width:${bp})`
);
