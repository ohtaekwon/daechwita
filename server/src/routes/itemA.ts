import * as express from "express";
import { v4 } from "uuid";
import { DBField, readDB, writeDB } from "../dbController";

const getItems = () => readDB(DBField.ITEM_A);
const setItems = (data: any) => writeDB(DBField.ITEM_A, data);

const itemARoute = [
  // GET ITEM_A
  {
    method: "get",
    route: "/users",
    handler: (req: express.Request, res: express.Response) => {
      const item_A = getItems();

      res.send();
    },
  },
];
export default itemARoute;
