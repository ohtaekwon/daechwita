let newError;

const emailCheck = ["invalid-email", "email-already-in-use"];
const passwordCheck = ["weak-password", "wrong-password"];
export const errorToKR = (error: string): string => {
  if (error.includes("email")) {
    newError = error.includes(emailCheck[0])
      ? "아이디가 유효하지 않습니다."
      : "이미 사용중인 이메일입니다.";
  } else {
    newError = error.includes(passwordCheck[0])
      ? "비밀번호는 6자리 이상이여야 합니다."
      : "비밀번호가 맞지 않습니다.";
  }

  return (newError as string) || "";
};
