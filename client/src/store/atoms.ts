import { atom } from "recoil";

export const resumesIdAtom = atom<string>({
  key: "RESUMES_ID",
  default: "",
});

export const tokenAtom = atom<string>({
  key: "TOKEN",
  default: "",
});
