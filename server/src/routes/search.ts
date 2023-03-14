import * as express from "express";
import { v4 as uuid } from "uuid";
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
  limit,
  onSnapshot,
  orderBy,
  query as firebaseQuery,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const PAGE_SIZE = 20;
const upload = multer();

/**
 * POST MAN에서 사용시 Header에 token값으로 인증 사용
 * 그 외는 캐시 데이터의 uid로 인증 사용
 */
const searchRoute = [
  // GET RESUMES
  {
    method: "get",
    route: "/resumes",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { latest },
        } = req;
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        console.log("여기", latest);
        const resumes = await collection(dbService, "resumes"); // resumes 컬렉션에 접근
        // 쿼리 조건문
        const queryOptions: any = [orderBy("createdAt", "desc")]; // 가장 최근이 먼저 나오도록
        queryOptions.unshift(where("uid", "==", uid)); // 해당 uid값이 있는 스케쥴 정보를 select

        if (latest === "true") {
          queryOptions.unshift(limit(1));
        } else {
          queryOptions.unshift(limit(PAGE_SIZE));
        }
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
        res.send({ data: data });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  // GET RESUME
  {
    method: "get",
    route: "/resumes/:id",
    upload: upload.none(),
    handler: async (req: express.Request, res: express.Response) => {
      const {
        params: { id },
      } = req;
      try {
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");
        if (!id) throw Error("요청한 정보의 id값이 없습니다.");

        const resumesRef = await doc(dbService, "resumes", id);
        if (!resumesRef) throw Error("해당 id의 자기소개서가 없습니다.");

        const resumeSnapshot = await getDoc(resumesRef);
        res.send({
          data: {
            id: resumeSnapshot.id,
            ...resumeSnapshot.data(),
          },
        });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
];
export default searchRoute;
