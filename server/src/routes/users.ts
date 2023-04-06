import * as express from "express";
import { DBField, readDB, writeDB } from "../dbController";
import { v4 as uuid } from "uuid";

import { dbService } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const getUsers = () => readDB(DBField.USERS);
const setUsers = (data: any) => writeDB(DBField.USERS, data);

const usersRoute = [
  // 유저 회원 정보 관련 메서드
  // GET USERS
  {
    method: "get",
    route: "/users",
    handler: async (req: express.Request, res: express.Response) => {
      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const users = await collection(dbService, "users");
      const q = query(users, where("uid", "==", uid));
      const usersSnapshot = await getDocs(q);
      const data: DocumentData[] = [];
      usersSnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          ...d,
        });
      });
      const newData = data;
      res.send(newData);

      return {
        data,
      };
    },
  },
  // GET USER
  {
    method: "get",
    route: "/users/:id",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        params: { id },
      } = req;

      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const users = await collection(dbService, "users");
      const q = query(users, where("uid", "==", id));
      const usersSnapshot = await getDocs(q);
      const data: DocumentData[] = [];
      usersSnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          ...d,
        });
      });
      const newData = data;
      res.send(newData);
      return data;
    },
  },
  // CREATE USERS
  {
    method: "post",
    route: "/users",
    handler: (req: express.Request, res: express.Response) => {
      const { body, params, query } = req.signedCookies;
      const email = Object.keys(body)[0];
      const users = getUsers();

      const newUsers = {
        email: body[email].email,
        nickName: body[email].nickName,
        pw: body[email].pw,
        itemOfUser: body[email].itemOfUser,
        subscription: Date.now(),
      };

      users[`${newUsers.email}`] = newUsers;
      setUsers(users); // json dbService에 추가
      res.send(newUsers); // post 응답
    },
  },
  // UPDATE USERS
  {
    method: "put",
    route: "/users/:id",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req;
      try {
        const userRef = doc(dbService, "users", id);

        if (!userRef) throw Error("유저 정보가 없습니다.");

        const updatedRef = await updateDoc(userRef, {
          ...body,
          createdAt: serverTimestamp(),
        });
        const snapShot = await getDoc(userRef);

        res.send(snapShot.data());

        return {
          id: snapShot.id,
          ...snapShot.data(),
        };
      } catch (error) {
        console.error(error, "nope");
      }
    },
  },
];
export default usersRoute;
