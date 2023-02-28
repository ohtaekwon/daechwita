import * as express from "express";
import { v4 as uuid } from "uuid";

import { db } from "../../firebase";
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
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const PAGE_SIZE = 20;

const resumesRoute = [
  // GET APPLICATIONS
  {
    method: "get",
    route: "/resumes",
    handler: async (req: express.Request, res: express.Response) => {
      // 쿠키에서 uid 가져오기
      const cookie = req.headers.cookie;
      const uid = cookie?.split("%22")[3];
      if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

      const resumes = await collection(db, "resumes"); // resumes 컬렉션에 접근
      // 쿼리 조건문
      const queryOptions: any = [orderBy("createdAt", "asc")]; // 가장 최근이 먼저
      queryOptions.unshift(where("uid", "==", uid)); // 해당 uid값이 있는 스케쥴 정보를 select

      const q = query(resumes, ...queryOptions, limit(PAGE_SIZE));
      const resumesSnapshot = await getDocs(q);
      const data: DocumentData[] = [];

      resumesSnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          ...d,
        });
      });
      const newData = data;
      res.send(newData.map((data) => data.documents));
      return data;
    },
  },
  // GET APPLICATION
  {
    method: "get",
    route: "/resumes/:id",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        params: { id },
      } = req;

      // 쿠키에서 uid 가져오기
      const cookie = req.headers.cookie;
      const uid = cookie?.split("%22")[3];
      if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

      const resumesRef = await doc(db, "resumes", `${uid}-${id}`);
      if (!resumesRef) throw Error("선택한 데이터가 없습니다.");

      const snapShot = await getDoc(resumesRef);
      res.send(snapShot.data());

      return {
        id: snapShot.id,
        ...snapShot.data(),
      };
    },
  },
  // CREATE APPLICATIONS
  {
    method: "post",
    route: "/resumes",
    handler: async (req: express.Request, res: express.Response) => {
      const { body } = req;
      // 쿠키에서 uid 가져오기
      const cookie = req.headers.cookie;
      const uid = cookie?.split("%22")[3];
      if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");
      if (!body) throw Error("Request에 Body 정보가 없습니다.");

      const newApplications = {
        apply: {
          company: "",
          department: "",
        },
        documents: [{ id: uuid(), text: "", tag: "", title: "" }],
        uid,
        publishing: false,
        createdAt: serverTimestamp(),
      };

      const addApplication: any = await setDoc(
        doc(db, "resumes", body.id!),
        newApplications
      );

      const snapShot = await getDoc(addApplication);
      res.send(snapShot.data());
      return {
        id: body.id,
        // ...snapShot.data(),
      };
    },
  },
  // UPDATE APPLICATIONS
  {
    method: "put",
    route: "/resumes/:id",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req;

      // 토큰에서 uid 가져오기
      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const applicationsRef = doc(db, "applications", `${uid}-${id}`);
      if (!applicationsRef) throw Error("상품이 없습니다.");

      await updateDoc(applicationsRef, {
        ...body,
        createdAt: serverTimestamp(),
      });

      const snapShot = await getDoc(applicationsRef);
      console.log("---------업데이트----------", snapShot.data());
      res.send(snapShot.data());
      return {
        id: snapShot.id,
        ...snapShot.data(),
      };
    },
  },
];
export default resumesRoute;
