import * as express from "express";
import { text } from "stream/consumers";
import { v4 } from "uuid";
import { DBField, readDB, writeDB } from "../dbController";

const getUsers = () => readDB(DBField.USERS);
const setUsers = (data: any) => writeDB(DBField.USERS, data);

const documentsRoute = [
  // GET USERS
  {
    method: "get",
    route: "/users",
    handler: (req: express.Request, res: express.Response) => {
      const users = getUsers();
      res.send(users);
    },
  },
  // GET USER
  {
    method: "get",
    route: "/users/:id",
    handler: (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req;
      try {
        const users = getUsers();
        const user = users.find((user: any) => user.id === id);
        if (!user) throw "해당 문서가 없습니다.";
        res.send(user);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
];
export default documentsRoute;
