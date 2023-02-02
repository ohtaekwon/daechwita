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
  // GET ITEM A
  {
    method: "get",
    route: "/itemA/:id",
    handler: (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req;
      try {
        const items = getItems();
        const userItem = items[id];
        if (!userItem) throw "해당 게시글이 없습니다.";
        res.send(userItem);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
];
export default itemARoute;
