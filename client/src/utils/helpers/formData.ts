/**
 * formData를 가져오도록 도와주는 함수
 */
export function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}
