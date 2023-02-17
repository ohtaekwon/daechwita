import * as express from "express";
import { v4 } from "uuid";
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
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const PAGE_SIZE = 20;
const getDocuments = () => readDB(DBField.DOCUMENTS);
const setDocuments = (data: any) => writeDB(DBField.DOCUMENTS, data);

const documentsRoute = [
  // GET DOCUMENTS
  {
    method: "get",
    route: "/documents",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        query: { title, tag },
      } = req;

      // 토큰에서 uid 가져오기
      const uid = req.headers.authorization?.split(" ")[1].trim();
      if (!uid) throw Error("유저 아이디가 없습니다.");
      // console.log("-------------------", title, tag, uid);
      console.log('--------테스트--------', uid)

      const documents = await collection(db, "documents");
      const queryOptions: any = [orderBy("createdAt", "desc")];
      queryOptions.unshift(where("uid", "==", uid)); // 해당 uid값이 있는 스케쥴 정보를 select
      const q = query(documents, ...queryOptions, limit(PAGE_SIZE));
      const documentsSnapshot = await getDocs(q);
      const data: DocumentData[] = [];

      documentsSnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          ...d,
        });
      });
      const newData = data;
      console.log(newData);
      setDocuments(newData);
      res.send(newData);

      return data;
    },
  },
  // GET DOCUMENT
  {
    method: "get",
    route: "/documents/:id",
    handler: (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req.signedCookies;
      try {
        const docs = getDocuments();
        const doc = docs.find((doc: any) => doc.id === id);
        if (!doc) throw "해당 문서가 없습니다.";
        res.send(doc);
      } catch (err) {
        res.status(404).send({ error: err });
      }
    },
  },
  // CREATE DOCUMENTS
  {
    method: "post",
    route: "/documents",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        body: { apply, tag, text, title },
        params,
        query,
      } = req;

      const uid = req.headers.authorization?.split(" ")[1].trim();

      if (!uid) throw Error("유저 아이디가 없습니다.");

      const newDocument = {
        apply,
        tag,
        text,
        title,
        uid,
        createdAt: serverTimestamp(),
      };
      const addDocument = await addDoc(
        collection(db, "documents"),
        newDocument
      );
      const documentsSnapshot = await getDoc(addDocument);

      res.send(documentsSnapshot);

      return {
        ...documentsSnapshot.data(),
        id: documentsSnapshot.id,
      };
    },
  },
  // UPDATE DOCUMENTS
  {
    method: "put",
    route: "/documents/:id",
    handler: (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req;
      try {
        const docs = getDocuments();
        const targetIndex = docs.findIndex((doc: any) => doc.id === id);

        if (targetIndex < 0) throw "선택한 문서가 없습니다.";
        if (docs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        const newDocs = { ...docs[targetIndex], body: body.text };
        docs.splice(targetIndex, 1, newDocs);
        setDocuments(docs);
        res.send(newDocs);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
  // DELETE DOCUMENTS
  {
    method: "delete",
    route: "/documents/:id",
    handler: (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
      } = req;

      try {
        const docs = getDocuments();
        const targetIndex = docs.findIndex((doc: any) => doc.id === id);

        if (targetIndex < 0) throw "선택한 문서가 없습니다.";
        if (docs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        docs.splice(targetIndex, 1);
        setDocuments(docs);
        res.send(id);
      } catch (err) {
        res.status(500).send({ error: err });
      }
    },
  },
];
export default documentsRoute;
