import { atom } from "recoil";

export const resumesIdAtom = atom<string>({
  key: "RESUMES_ID",
  default: "",
});
