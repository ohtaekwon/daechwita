import * as express from "express";

import { dbService } from "../firebase";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query as firebaseQuery,
  where,
  startAfter,
} from "firebase/firestore";

const PAGE_SIZE = 20;

const searchRoute = [
  // GET RESUMES
  {
    method: "get",
    route: "/api/v1/search",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { tag = "", company = "", department = "", page = "" },
        } = req;
        // 토큰에서 uid 가져오기
        const uid = (req as any).decodedToken!.uid;
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const resumes = await collection(dbService, "resumes");
        const queryOptions: any = [orderBy("createdAt", "desc")];
        queryOptions.unshift(where("uid", "==", uid));
        queryOptions.unshift(where("publishing", "==", true));

        // queryOptions.unshift(where("apply.", "==", true));
        if (tag) {
        } else if (company) {
          const keyword = (company as string).replace(/\s+/g, "");

          queryOptions.unshift(where("apply.company", ">=", keyword));
          queryOptions.unshift(where("apply.company", "<", keyword));
        } else if (department) {
          const keyword = (department as string).replace(/\s+/g, "");

          queryOptions.unshift(where("apply.department", ">=", keyword));
          queryOptions.unshift(where("apply.department", "<", keyword));
        }
        queryOptions.unshift(limit(PAGE_SIZE));

        const q = firebaseQuery(resumes, ...queryOptions);
        const resumesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        if (page) {
          const snapshot = await getDoc(
            doc(dbService, "resumes", page as string)
          );
          queryOptions.push(startAfter(snapshot));
        }

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
];
export default searchRoute;
