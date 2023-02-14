import * as express from "express";
import { DBField, readDB, writeDB } from "../dbController";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const getItems = () => readDB(DBField.SCHEDULES);
const setSchedules = (data: any) => writeDB(DBField.SCHEDULES, data);

const schedulesRoute = [
  // GET SCHEDULES
  {
    method: "get",
    route: "/schedules",
    handler: async (req: express.Request, res: express.Response) => {
      const { body, params } = req;
      const targetIndex = req.rawHeaders.findIndex(
        (item) => item === "Authorization"
      );
      const uid = req.rawHeaders[targetIndex + 1].split("+")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const schedules = await collection(db, "schedule");
      const queryOptions: any = [orderBy("createdAt", "desc")];

      queryOptions.unshift(where("uid", "==", uid)); // 해당 uid값이 있는 스케쥴 정보를 select

      const q = query(schedules, ...queryOptions);
      const schedulesSnapshot = await getDocs(q);
      const data: DocumentData[] = [];

      schedulesSnapshot.forEach((doc: DocumentData) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          ...d,
        });
      });
      const newData = data;

      setSchedules(newData);
      res.send(data);
      return data;
    },
  },
  {
    method: "get",
    route: "/schedules/:id",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        body: { uid },
        params,
      } = req;
      const schedulesSnapshot = await getDoc(doc(db, "schedule", uid));
      res.send(schedulesSnapshot);
      return {
        ...schedulesSnapshot.data(),
        id: schedulesSnapshot.id,
      };
    },
  },
  // CREATE SCHEDULES
  {
    method: "post",
    route: "/schedules",
    handler: async (req: express.Request, res: express.Response) => {
      const { body, params } = req;

      const { apply, column, text, title, uid } = body;
      const newSchedule = {
        apply,
        column,
        text,
        title,
        uid,
        createdAt: serverTimestamp(),
      };

      const addSchedule = await addDoc(collection(db, "schedule"), newSchedule);
      const schedulesSnapshot = await getDoc(addSchedule);

      res.send(schedulesSnapshot);

      return {
        ...schedulesSnapshot.data(),
        id: schedulesSnapshot.id,
      };
    },
  },
];
export default schedulesRoute;
