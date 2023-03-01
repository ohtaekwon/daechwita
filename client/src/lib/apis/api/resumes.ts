import { authInstance } from "../utils/instance";
import {
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from "../utils/methods";
import { getUsers, updateUsers } from "./users";
import { BASE_URL_RESUMES } from "utils/constants/url";

/**
 *  GET /resumes
 *
 */
export const getResumes = async () => {
  try {
    const response = await requestGet(BASE_URL_RESUMES);
    return response;
  } catch (err) {
    console.log(err);
  }
};
