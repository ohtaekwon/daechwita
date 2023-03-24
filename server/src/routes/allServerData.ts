import * as express from "express";
import multer from "multer";

import { dbService } from "../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query as firebaseQuery,
  where,
} from "firebase/firestore";

const upload = multer();

/**
 * POST MAN에서 사용시 Header에 token값으로 인증 사용
 * 그 외는 캐시 데이터의 uid로 인증 사용
 */
const allServerData = [
  // GET RESUMES
  {
    method: "get",
    route: "/all/resumes",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기

        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const resumes = await collection(dbService, "resumes"); // resumes 컬렉션에 접근
        // 쿼리 조건문
        const queryOptions: any = [orderBy("createdAt", "desc")]; // 가장 최근이 먼저 나오도록
        queryOptions.unshift(where("publishing", "==", true)); // 해당 uid값이 있는 스케쥴 정보를 select

        const q = firebaseQuery(resumes, ...queryOptions);
        const resumesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        resumesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            ...d,
          });
        });

        const refinedData: DocumentData[] = [];
        data.forEach((item) => {
          refinedData.push({
            apply: item.apply,
            tag: item.documents.map((d: any) => d.tag),
          });
        });

        res.send({ data: refinedData });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },

  {
    method: "get",
    route: "/all/schedules",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const schedules = await collection(dbService, "schedules");
        const queryOptions: any = [orderBy("createdAt", "desc")];

        const q = firebaseQuery(schedules, ...queryOptions);
        const schedulesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        schedulesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            ...d,
          });
        });

        const refinedData: DocumentData[] = [];
        data.forEach((item) => {
          refinedData.push({
            application: item.application,
            column: item.column,
          });
        });

        res.send({ data: refinedData });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
];
export default allServerData;
