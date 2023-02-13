import * as express from "express";
import { v4 } from "uuid";
import { DBField, readDB, writeDB } from "../dbController";

const getDocuments = () => readDB(DBField.DOCUMENTS);
const setDocuments = (data: any) => writeDB(DBField.DOCUMENTS, data);

const documentsRoute = [
  // GET DOCUMENTS
  {
    method: "get",
    route: "/documents",
    handler: (req: express.Request, res: express.Response) => {
      const docs = getDocuments();
      res.send(docs);
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
    handler: (req: express.Request, res: express.Response) => {
      const { body, params, query } = req;
      const docs = getDocuments();
      const newDocs = {
        id: v4,
        text: body.text,
        userId: body.userId,
        timestamp: Date.now(),
      };
      docs.unshift(newDocs);
      setDocuments(docs); // json db에 추가
      res.send(newDocs); // post 응답
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
