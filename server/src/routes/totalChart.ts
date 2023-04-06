import * as express from "express";
import { dbService } from "../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query as firebaseQuery,
} from "firebase/firestore";

const totalCharts = [
  // GET TOTAL SCHEDULES
  {
    method: "get",
    route: "/api/v1/total/schedules",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { category = "" },
        } = req;
        // GET uid from middleware

        // const uid = (req as any).decodedToken!.uid;
        // if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const schedules = await collection(dbService, "schedules");
        const queryOptions: any = [orderBy("createdAt", "desc")];

        const q = firebaseQuery(schedules, ...queryOptions);
        const schedulesSnapshot = await getDocs(q);
        const data: DocumentData[] = [];

        schedulesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            application: d.application,
          });
        });
        let refinedData: DocumentData[] = [];

        // company의 데이터만 정제

        if (category === "company") {
          const newArray = data.filter(
            (item) => item.application.company !== ""
          );

          newArray.forEach((item) => {
            const targetIndex = refinedData.findIndex(
              (d) => d.company === item.application.company
            );

            if (targetIndex < 0) {
              refinedData.push({
                company: item.application.company,
                count: 1,
              });
            } else {
              refinedData.splice(targetIndex, 1, {
                ...refinedData[targetIndex],
                count: refinedData[targetIndex].count + 1,
              });
            }
          });
        }
        // department의 데이터만 정제
        else if (category === "department") {
          const newArray = data.filter(
            (item) => item.application.department !== ""
          );
          newArray.forEach((item) => {
            const targetIndex = refinedData.findIndex(
              (d) => d.department === item.application.department
            );

            if (targetIndex < 0) {
              refinedData.push({
                department: item.application.department,
                count: 1,
              });
            } else {
              refinedData.splice(targetIndex, 1, {
                ...refinedData[targetIndex],
                count: refinedData[targetIndex].count + 1,
              });
            }
          });
        }

        res.send({ data: refinedData });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  // GET TOTAL RESUMES
  {
    method: "get",
    route: "/api/v1/total/resumes",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { category = "" },
        } = req;

        // GET uid from middleware
        // const uid = (req as any).decodedToken!.uid;
        // if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const resumes = await collection(dbService, "resumes");
        const queryOptions: any = [orderBy("createdAt", "desc")];

        const q = firebaseQuery(resumes, ...queryOptions);
        const resumesSnapshot = await getDocs(q);
        let data: DocumentData[] = [];
        let refinedResumes: DocumentData[] = [];

        resumesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            company: d.apply.company,
            department: d.apply.department,
            tag: d.documents
              .map((document: any) => document.tag)
              .filter((item: string) => item !== "" && item !== undefined),
          });
        });

        if (category === "tag") {
          const newData = data.filter((item) => item.tag[0] !== undefined);

          newData.forEach((item) => {
            item.tag.map((t: string) => {
              const targetIndex = refinedResumes.findIndex((d) => d.tag === t);

              if (targetIndex < 0) {
                refinedResumes.push({
                  tag: t,
                  count: 1,
                });
              } else {
                refinedResumes.splice(targetIndex, 1, {
                  ...refinedResumes[targetIndex],
                  count: refinedResumes[targetIndex].count + 1,
                });
              }
            });
          });
        } else if (category === "company") {
          const newData = data.filter(
            (item) => item.company !== "" && item.company !== undefined
          );

          newData.forEach((item) => {
            const targetIndex = refinedResumes.findIndex(
              (d) => d.company === item.company
            );

            if (targetIndex < 0) {
              refinedResumes.push({
                company: item.company,
                count: 1,
              });
            } else {
              refinedResumes.splice(targetIndex, 1, {
                ...refinedResumes[targetIndex],
                count: refinedResumes[targetIndex].count + 1,
              });
            }
          });
        } else if (category === "department") {
          resumesSnapshot.forEach((doc) => {
            const d = doc.data();
            data.push({
              id: doc.id,
              department: d.apply.department,
            });
          });

          const newData = data.filter(
            (item) => item.department !== "" && item.department !== undefined
          );

          newData.forEach((item) => {
            const targetIndex = refinedResumes.findIndex(
              (d) => d.department === item.department
            );

            if (targetIndex < 0) {
              refinedResumes.push({
                department: item.department,
                count: 1,
              });
            } else {
              refinedResumes.splice(targetIndex, 1, {
                ...refinedResumes[targetIndex],
                count: refinedResumes[targetIndex].count + 1,
              });
            }
          });
        } else {
          refinedResumes = data;
        }

        res.send({ data: refinedResumes });
      } catch (error) {
        res.send(500).send({ error: error });
      }
    },
  },
];
export default totalCharts;
