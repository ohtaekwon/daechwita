import * as express from "express";
import { v4 } from "uuid";
import { DBField, readDB, writeDB } from "../dbController";

const getItems = () => readDB(DBField.ITEM_A);
const setItems = (data: any) => writeDB(DBField.ITEM_A, data);

const itemARoute = [
  // GET ITEM_A
  {
    method: "get",
    route: "/itemA",
    handler: (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req;
      const item_A = getItems();
      res.send(item_A);
    },
  },
];
export default itemARoute;
