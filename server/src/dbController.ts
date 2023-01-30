import fs, { fdatasync } from "fs";
import { resolve } from "path";

export enum DBField {
  DOCUMENTS = "documents",
  USERS = "users",
  ITEM_A = "itemA",
  ITEM_B = "itemB",
  ITEM_C = "itemC",
}

const basePath = resolve(); // 현재의 경로가 변수에 할당된다. == __dirname

const filedNames = {
  [DBField.DOCUMENTS]: resolve(basePath, "./src/db/documents.json"),
  [DBField.USERS]: resolve(basePath, "./src/db/users.json"),
  [DBField.ITEM_A]: resolve(basePath, "./src/db/itemA.json"),
  [DBField.ITEM_B]: resolve(basePath, "./src/db/itemB.json"),
  [DBField.ITEM_C]: resolve(basePath, "./src/db/itemC.json"),
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
