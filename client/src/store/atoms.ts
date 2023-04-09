import { atom } from "recoil";

export type SelectType =
  | "tag"
  | "title"
  | "text"
  | "company"
  | "department"
  | "";
export const resumesIdAtom = atom<string>({
  key: "RESUMES_ID",
  default: "",
});

export const tokenAtom = atom<string>({
  key: "TOKEN",
  default: "",
});

export const selectAtom = atom<SelectType>({
  key: "SELECT",
  default: "",
});

export const keywordAtom = atom<string>({
  key: "KEYWORD",
  default: "",
});
