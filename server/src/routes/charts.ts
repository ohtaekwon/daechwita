import * as express from "express";
import { dbService } from "../firebase";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query as firebaseQuery,
  where,
} from "firebase/firestore";

/**
 * POST MAN에서 사용시 Header에 token값으로 인증 사용
 * 그 외는 캐시 데이터의 uid로 인증 사용
 */
const charts = [
  // GET TOTAL SCHEDULES
  {
    method: "get",
    route: "/total/schedules",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { category = "" },
        } = req;
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
    route: "/total/resumes",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { category = "" },
        } = req;

        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

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
  {
    method: "get",
    route: "/user/schedules",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { category = "" },
        } = req;
        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const schedules = await collection(dbService, "schedules");
        const queryOptions: any = [orderBy("createdAt", "desc")];
        queryOptions.unshift(where("uid", "==", uid));

        const q = firebaseQuery(schedules, ...queryOptions);
        const schedulesSnapshot = await getDocs(q);
        let data: DocumentData[] = [];
        let refinedSchedules: DocumentData[] = [];

        schedulesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            column: d.column,
            application: d.application,
          });
        });

        if (category === "column") {
          // column의 데이터만 정
          data.forEach((item) => {
            const targetIndex = refinedSchedules.findIndex(
              (d) => d.column === item.column
            );

            if (targetIndex < 0) {
              refinedSchedules.push({
                column: item.column,
                count: 1,
              });
            } else {
              refinedSchedules.splice(targetIndex, 1, {
                ...refinedSchedules[targetIndex],
                count: refinedSchedules[targetIndex].count + 1,
              });
            }
          });
        } else if (category === "company") {
          // company의 데이터만 정제
          const newArray = data.filter(
            (item) => item.application.company !== ""
          );
          newArray.forEach((item) => {
            const targetIndex = refinedSchedules.findIndex(
              (d) => d.company == item.application.company
            );

            if (targetIndex < 0) {
              refinedSchedules.push({
                company: item.application.company,
                count: 1,
              });
            } else {
              refinedSchedules.splice(targetIndex, 1, {
                ...refinedSchedules[targetIndex],
                count: refinedSchedules[targetIndex].count + 1,
              });
            }
          });
        } else if (category === "department") {
          // department의 데이터만 정제
          const newArray = data.filter(
            (item) => item.application.department !== ""
          );
          newArray.forEach((item) => {
            const targetIndex = refinedSchedules.findIndex(
              (d) => d.department == item.application.department
            );

            if (targetIndex < 0) {
              refinedSchedules.push({
                department: item.application.department,
                count: 1,
              });
            } else {
              refinedSchedules.splice(targetIndex, 1, {
                ...refinedSchedules[targetIndex],
                count: refinedSchedules[targetIndex].count + 1,
              });
            }
          });
        } else {
          schedulesSnapshot.forEach((doc) => {
            const d = doc.data();
            data.push({
              id: doc.id,
              ...d,
            });
          });

          data.forEach((item) => {
            refinedSchedules.push({
              application: item.application,
              column: item.column,
            });
          });
          refinedSchedules = data;
        }

        res.send({ data: refinedSchedules });
      } catch (error) {
        res.send(500).send({ error: error });
      }
    },
  },
  {
    method: "get",
    route: "/user/resumes",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { category = "", publishing },
        } = req;

        const newPublishing = publishing
          ? JSON.parse(publishing as string)
          : false;

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const resumes = await collection(dbService, "resumes");
        const queryOptions: any = [orderBy("createdAt", "desc")];
        queryOptions.unshift(where("uid", "==", uid));
        queryOptions.unshift(where("publishing", "==", newPublishing));

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

  {
    method: "get",
    route: "/user/resumes/all",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { publishing },
        } = req;

        const newPublishing = publishing
          ? JSON.parse(publishing as string)
          : false;

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");

        const resumes = await collection(dbService, "resumes");
        const queryOptions: any = [orderBy("createdAt", "desc")];
        queryOptions.unshift(where("uid", "==", uid));

        const q = firebaseQuery(resumes, ...queryOptions);
        const resumesSnapshot = await getDocs(q);
        let data: DocumentData[] = [];

        resumesSnapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            id: doc.id,
            publishing: d.publishing,
          });
        });

        res.send({
          data: {
            isPublishing: data.filter((item) => item.publishing === true)
              .length,
            isNotPublishing: data.filter((item) => item.publishing === false)
              .length,
          },
        });
      } catch (error) {
        res.send(500).send({ error: error });
      }
    },
  },
];
export default charts;
