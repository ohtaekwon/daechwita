import * as express from "express";
import { v4 as uuid } from "uuid";
import { dbService, storageService } from "../firebase";
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
  query as firebaseQuery,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

const PAGE_SIZE = 15;

/**
 * POST MAN에서 사용시 Header에 token값으로 인증 사용
 * 그 외는 캐시 데이터의 uid로 인증 사용
 */

const resumesRoute = [
  // GET RESUMES
  {
    method: "get",
    route: "/resumes",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          query: { latest, publishing, page = "" },
        } = req;
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");
        const newLatest = latest ? JSON.parse(latest as string) : false;
        const newPublishing = publishing
          ? JSON.parse(publishing as string)
          : false;

        const resumes = await collection(dbService, "resumes"); // resumes 컬렉션에 접근
        // 쿼리 조건문
        const queryOptions: any = [orderBy("createdAt", "desc")]; // 가장 최근이 먼저 나오도록
        queryOptions.unshift(where("uid", "==", uid)); // 해당 uid값이 있는 스케쥴 정보를 select

        if (newLatest) {
          queryOptions.unshift(where("publishing", "==", newPublishing));
          queryOptions.unshift(limit(1));
        } else {
          queryOptions.unshift(where("publishing", "==", newPublishing));
          if (page) {
            const snapshot = await getDoc(
              doc(dbService, "resumes", page as string)
            );
            queryOptions.push(startAfter(snapshot));
          }
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
        res.send({ data });
      } catch (error) {
        res.status(404).send({ error: error });
      }
    },
  },
  // GET RESUME
  {
    method: "get",
    route: "/resumes/:id",

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

  // CREATE RESUME
  {
    method: "post",
    route: "/resumes",
    handler: async (req: express.Request, res: express.Response) => {
      const { body } = req;
      let newResume;
      try {
        // 쿠키에서 uid 가져오
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = req.headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("쿠키에 유저 인증키가 없습니다.");
        if (!body) throw Error("요청 정보에 body 정보가 없습니다.");

        if (body.imgUrL) {
          const fileRef = ref(storageService, `${uid}/${uuid()}`);
          const response = await uploadString(fileRef, body.imgUrl, "data_url"); // (  파일 ref , 보낼 파일 데이터 , 포맷)
          const photoUrl = await getDownloadURL(response.ref);
          newResume = {
            ...body,
            imgUrl: photoUrl,
            createdAt: serverTimestamp(),
            updatedAt: null,
          };
        } else {
          newResume = {
            ...body,
            uid,
            createdAt: serverTimestamp(),
            updatedAt: null,
          };
        }

        const addResume = await addDoc(
          collection(dbService, "resumes"),
          newResume
        );
        const resumeSnapshot = await getDoc(addResume);

        res.send({
          id: resumeSnapshot.id,
          ...resumeSnapshot.data(),
        });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  // UPDATE RESUME
  {
    method: "put",
    route: "/resumes/:id",
    handler: async (req: express.Request, res: express.Response) => {
      const {
        body,
        params: { id },
        headers,
      } = req;
      try {
        let newData;
        // 쿠키에서 uid 가져오기
        // const cookie = req.headers.cookie;
        // const uid = cookie?.split("%22")[3];

        // 토큰에서 uid 가져오기
        const uid = headers.authorization?.split(" ")[1].trim();
        if (!uid) throw Error("유저 아이디가 없습니다.");
        if (!id) throw Error("요청한 정보의 id값이 없습니다.");
        if (!body) throw Error("요청 정보에 body 정보가 없습니다.");

        const resumesRef = doc(dbService, "resumes", id);
        if (!resumesRef) throw Error("해당 id의 자기소개서가 없습니다.");

        if (body.imgUrL) {
          // body에 이미지 URL이 있을 경우
          const firstSnapshot = await getDoc(resumesRef);
          if (firstSnapshot.data()?.imgUrL) {
            // 기존에 이미지가 있는 확인 후, 있으면 스토리지에서 삭제
            await deleteObject(
              ref(storageService, firstSnapshot.data()?.imgUrL)
            );
          }
          // 삭제 후, 다시 업로드 후 변경된 이미지 URL을 업데이트 한다.
          const fileRef = ref(storageService, `${uid}/${uuid()}`);
          const response = await uploadString(fileRef, body.imgUrl, "data_url"); // (  파일 ref , 보낼 파일 데이터 , 포맷)
          const photoUrl = await getDownloadURL(response.ref);
          newData = {
            ...body,
            imgUrL: photoUrl,
            uid,
            updatedAt: serverTimestamp(),
          };
        } else {
          newData = {
            ...body,
            uid,
            updatedAt: serverTimestamp(),
          };
        }

        /**
         * 기존 상태 유지 body 요소
         *
         * uid : 유저 고유의 데이터로 고정
         * createdAt : 처음 만들어진 후 고정
         *
         * 업데이트로 변경될 body 요소
         *
         * apply : { company, department}
         * documents : [ {id, text, tag, title}]
         * publishing: true (출간 시) / false (기본)
         *
         *
         * updatedAt : 업데이트될 때마다 변경
         */

        await updateDoc(resumesRef, newData);

        const snapShot = await getDoc(resumesRef);
        res.send({
          id: snapShot.id,
          ...snapShot.data(),
        });
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
  // DELETE RESUME
  {
    method: "delete",
    route: "/resumes/:id",
    handler: async (req: express.Request, res: express.Response) => {
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

        const resumesRef = doc(dbService, "resumes", id);
        if (!resumesRef) throw Error("해당 id의 자기소개서가 없습니다.");

        const snapshot = await getDoc(resumesRef);
        if (snapshot.data()?.imgUrL) {
          // 삭제할 데이터에 이미지가 있을 경우 스토리지에서 삭제를 유도
          await deleteObject(ref(storageService, snapshot.data()?.imgUrL));
        }

        await deleteDoc(resumesRef).then(() => {
          console.log("성공적으로 삭제가 완료되었습니다.");
        });

        res.send(id);
      } catch (error) {
        res.status(500).send({ error: error });
      }
    },
  },
];
export default resumesRoute;
