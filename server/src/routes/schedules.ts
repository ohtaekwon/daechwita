import * as express from "express";
import { DBField, readDB, writeDB } from "../dbController";
import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  DocumentData,
  doc,
  orderBy,
  addDoc,
  serverTimestamp,
  where,
  query,
  limit,
  startAfter,
  updateDoc,
} from "firebase/firestore";

const getItems = () => readDB(DBField.SCHEDULES);
const setSchedules = (data: any) => writeDB(DBField.SCHEDULES, data);

const schedulesRoute = [
  // GET SCHEDULES
  {
    method: "get",
    route: "/schedules",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        body: { uid },
        params,
      } = req;
      const schedules = await collection(db, "schedule");
      const schedulesSnapshot = await getDocs(schedules);
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
      console.log("------------------", data);
      res.send(data);
      return data;
    },
  },
  {
    method: "get",
    route: "/schedule/:id",
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
];
export default schedulesRoute;
