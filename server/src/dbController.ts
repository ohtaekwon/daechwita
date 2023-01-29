import fs, { fdatasync } from "fs";
import { resolve } from "path";

export enum DBField {
  DOCUMENTS = "documents",
  USERS = "users",
}

const basePath = resolve(); // 현재의 경로가 변수에 할당된다. == __dirname

const filedNames = {
  [DBField.DOCUMENTS]: resolve(basePath, "./src/db/documents.json"),
  [DBField.USERS]: resolve(basePath, "./src/db/users.json"),
};

export const readDB = (target: DBField) => {
  try {
    return JSON.parse(
      fs.readFileSync(filedNames[target], { encoding: "utf-8" })
    );
  } catch (err) {
    console.log("read", err);
  }
};

export const writeDB = (target: DBField, data: any) => {
  try {
    fs.writeFileSync(filedNames[target], JSON.stringify(data, null, "  "));
  } catch (err) {
    console.log("write", err);
  }
};
