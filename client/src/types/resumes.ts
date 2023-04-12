import { color } from "utils/helpers";

export type Resume = {
  apply: {
    company: string;
    department: string;
  };
  documents: {
    id: string;
    tag: string;
    text: string;
    title: string;
  }[];
  id: string;
  publishing: boolean;
  uid: string;
  updatedAt: unknown;
};

export type TimeType = {
  seconds: number;
  nanoseconds: number;
};

export interface ResumesType {
  id: string;
  createdAt: TimeType;
  uid: string;
  imgUrl: string;
  updatedAt: null | TimeType;
  resumes: {
    apply: {
      company: string;
      department: string;
    };
    documents: {
      id: string;
      tag: string;
      text: string;
      title: string;
    }[];
  };
  tag: (string | undefined)[];
  colors: color[];
}
export interface ResumesResponse
  extends Omit<ResumesType, "apply" | "documents"> {
  resumes: {
    apply: { company: string; department: string };
    documents: {
      id: string;
      tag: string;
      text: string;
      title: string;
    }[];
  };
}
export interface ResumesServiceType {
  id: string;
  uid: string;
  imgUrl: string;
  apply: {
    company: string;
    department: string;
  };
  documents: {
    id: string;
    tag: string;
    text: string;
    title: string;
  }[];
  createdAt: TimeType;
  updatedAt: null | TimeType;
  publishing: boolean;
}
export type ResumeApi = {
  apply: {
    company: string;
    department: string;
  };
  documents: {
    id: string;
    tag: string;
    text: string;
    title: string;
  }[];
  id: string;
  publishing: boolean;
  uid: string;
  updatedAt: unknown;
};
