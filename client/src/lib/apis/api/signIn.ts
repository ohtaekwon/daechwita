import { baseInstance } from "../utils/instance";

const signIn = async (userInfo: any) => {
  try {
    const { data } = await baseInstance("/login", userInfo);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export default signIn;
