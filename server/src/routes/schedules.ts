import { Request, Response } from "express";
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
  query as firebaseQuery,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const upload = multer();

const MAX_SIZE = 100;

const schedulesRoute = [
  // GET SCHEDULES
  {
    method: "get",
    route: "/schedules",
    upload: upload.none(),
    handler: async (req: Request, res: Response) => {
      const { headers } = req;
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const schedules = await collection(dbService, "schedules");
        const queryOptions: any = [orderBy("createdAt", "desc")];
        queryOptions.unshift(where("uid", "==", uid));

        const q = firebaseQuery(schedules, ...queryOptions);
        const scheduleSnapShot = await getDocs(q);
        const data: DocumentData[] = [];
        scheduleSnapShot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            ...d,
          });
        });
        res.send({ data: data });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  {
    method: "get",
    route: "/schedules/:id",
    upload: upload.none(),

    handler: async (req: Request, res: Response) => {
      const {
        headers,
        params: { id },
      } = req;
      try {
        const uid = headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");
        if (!id) throw Error("요청한 정보의 id값이 없습니다.");

        const schedulesRef = await doc(dbService, "schedules", id);
        if (!schedulesRef) throw Error("해당 id의 자기소개서가 없습니다.");

        const scheduleSnapShot = await getDoc(schedulesRef);
        res.send({
          data: {
            id: scheduleSnapShot.id,
            ...scheduleSnapShot.data(),
          },
        });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  // CREATE SCHEDULES
  {
    method: "post",
    route: "/schedules",
    upload: upload.none(),
    handler: async (req: Request, res: Response) => {
      const { body } = req;
      try {
        // 쿠키에서 uid 가져오
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");
        if (!body) throw Error("요청 정보에 body 정보가 없습니다.");

        const newSchedule = {
          ...body,
          uid,
          createdAt: serverTimestamp(),
        };
        const addSchedule = await addDoc(
          collection(dbService, "schedules"),
          newSchedule
        );
        const scheduleSnapShot = await getDoc(addSchedule);

        res.send({
          id: scheduleSnapShot.id,
          ...scheduleSnapShot.data(),
        });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  // UPDATE SCHEDULES
  {
    method: "put",
    route: "/schedules/:id",
    upload: upload.none(),
    handler: async (req: Request, res: Response) => {
      const {
        body,
        params: { id },
        headers,
      } = req;
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("유저 아이디가 없습니다.");
        if (!id) throw Error("요청한 정보의 id값이 없습니다.");
        if (!body) throw Error("요청 정보에 body 정보가 없습니다.");

        const scheduleRef = doc(dbService, "schedules", id);
        if (!scheduleRef) throw Error("해당 id의 자기소개서가 없습니다.");

        await updateDoc(scheduleRef, {
          ...body,
          uid,
          updatedAt: serverTimestamp(),
        });
        const snapShot = await getDoc(scheduleRef);
        res.send({
          id: snapShot.id,
          ...snapShot.data(),
        });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  // DELETE SCHEDULES
  {
    method: "delete",
    route: "/schedules/:id",
    upload: upload.none(),

    handler: async (req: Request, res: Response) => {
      const {
        params: { id },
        headers,
      } = req;
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("유저 아이디가 없습니다.");
        if (!id) throw Error("요청한 정보의 id값이 없습니다.");

        const scheduleRef = doc(dbService, "schedules", id);
        if (!scheduleRef) throw Error("해당 id의 자기소개서가 없습니다.");

        await deleteDoc(scheduleRef).then(() => {
          console.log("성공적으로 삭제가 완료되었습니다.");
        });

        res.send(id);
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
];
export default schedulesRoute;
