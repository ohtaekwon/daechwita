import * as express from "express";
import multer from "multer";

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
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const upload = multer();

const schedulesRoute = [
  // GET SCHEDULES
  {
    method: "get",
    route: "/schedules",
    upload: upload.none(),

    handler: async (req: express.Request, res: express.Response) => {
      const targetIndex = req.rawHeaders.findIndex(
        (item) => item === "Authorization"
      );
      const uid = req.rawHeaders[targetIndex + 1].split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const schedules = await collection(dbService, "schedule");
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

      res.send(data);
      return data;
    },
  },
  {
    method: "get",
    route: "/schedules/:id",
    upload: upload.none(),

    handler: async (req: express.Request, res: express.Response) => {
      const {
        body: { uid },
        params,
      } = req;
      const schedulesSnapshot = await getDoc(doc(dbService, "schedule", uid));
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
    upload: upload.none(),

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

      const addSchedule = await addDoc(
        collection(dbService, "schedule"),
        newSchedule
      );
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
