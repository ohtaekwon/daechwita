import * as express from "express";
import { text } from "stream/consumers";
import { v4 } from "uuid";
import { DBField, readDB, writeDB } from "../dbController";

const getUsers = () => readDB(DBField.USERS);
const setUsers = (data: any) => writeDB(DBField.USERS, data);

const usersRoute = [
  // GET USERS
  {
    method: "get",
    route: "/users",
    handler: (req: express.Request, res: express.Response) => {
      const users = getUsers();
      console.log(users, "-------------");
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
        console.log(id);
        const users = getUsers();
        const user = users[id];
        if (!user) throw "유저 정보를 찾을 수 없습니다.";
        res.send(user);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
  // CREATE USERS
  {
    method: "post",
    route: "/users",
    handler: (req: express.Request, res: express.Response) => {
      const { body, params, query } = req;
      const users = getUsers();
      const newUsers = {
        email: body.userEmail,
        pw: body.userPw,
        name: body.userName,
        itemOfUser: {},
        subscription: Date.now(),
      };
      users[`${newUsers.email}`] = newUsers;
      setUsers(users); // json db에 추가
      res.send(newUsers); // post 응답
    },
  },
  // UPDATE USERS
  {
    method: "put",
    route: "/users/:id",
    handler: (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
        query,
      } = req;
      try {
        const users = getUsers();
        const user = users[id];
        if (!user) throw "유저 정보를 찾을 수 없습니다.";

        if (users.userEmail !== body.userEmail) {
          throw "사용자가 다릅니다.";
        }
        const newUsers = { ...user, body };
        users[`${newUsers.email}`] = newUsers;
        setUsers(users);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
];
export default usersRoute;
