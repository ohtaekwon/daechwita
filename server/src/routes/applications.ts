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
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const PAGE_SIZE = 20;

const applicationsRoute = [
  // GET APPLICATIONS
  {
    method: "get",
    route: "/applications",
    handler: async (req: express.Request, res: express.Response) => {
      // 토큰에서 uid 가져오기
      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const applications = await collection(db, "applications");
      const queryOptions: any = [orderBy("createdAt", "desc")];
      queryOptions.unshift(where("uid", "==", uid)); // 해당 uid값이 있는 스케쥴 정보를 select

      const q = query(applications, ...queryOptions, limit(PAGE_SIZE));
      const applicationsSnapshot = await getDocs(q);
      const data: DocumentData[] = [];

      applicationsSnapshot.forEach((doc) => {
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
    route: "/applications/:id",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        params: { id },
      } = req;
      // 토큰에서 uid 가져오기
      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const applicationsRef = await doc(db, "applications", `${uid}-${id}`);
      const snapShot = await getDoc(applicationsRef);
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
    route: "/applications",
    handler: async (req: express.Request, res: express.Response) => {
      const { body } = req;

      // 토큰에서 uid 가져오기
      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");

      const newApplications = {
        apply: {
          company: "",
          department: "",
        },
        documents: [],
        uid,
        publishing: false,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "applications", body.id), newApplications);

      // const snapShot = await getDoc(addApplication);

      return {
        id: body.id,
        // ...snapShot.data(),
      };
    },
  },
  // UPDATE APPLICATIONS
  {
    method: "put",
    route: "/applications/:id",
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

      return {
        id: snapShot.id,
        ...snapShot.data(),
      };
    },
  },
];
export default applicationsRoute;
