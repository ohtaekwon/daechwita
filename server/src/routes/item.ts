import * as express from "express";
import { v4 } from "uuid";
import { DBField, readDB, writeDB } from "dbController";

const getItems = () => readDB(DBField.ITEM_A);
const setItems = (data: any) => writeDB(DBField.ITEM_A, data);

const itemARoute = [
  // GET ALL ITEM A
  {
    method: "get",
    route: "/itemA",
    handler: (req: express.Request, res: express.Response) => {
      const { body, params } = req;
      const allItemA = getItems();
      res.send(allItemA);
    },
  },
];
export default itemARoute;
