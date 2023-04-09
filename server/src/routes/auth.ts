import * as express from "express";
import * as jwt from "jsonwebtoken";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase";
import admin from "../firebaseAdmin";

import "dotenv/config";
const secreteKey = process.env.SECRET_KEY;

const authRoute = [
  // GET RESUMES
  {
    method: "post",
    route: "/api/v1/signup",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const {
          body: { email, password },
        } = req;

        const userRecord = await admin.auth().createUser({
          email,
          password,
          emailVerified: false,
          disabled: false,
          // displayName,
        });

        const token = jwt.sign(
          {
            uid: userRecord.uid,
            email: userRecord.email,
            // displayName: userRecord.displayName,
          },
          secreteKey!
        );
        res.send(token);
      } catch (error) {
        res.send(500).send({ error: error });
      }
    },
  },
  {
    method: "post",
    route: "/api/v1/login",
    handler: async (req: express.Request, res: express.Response) => {
      try {
        const { email, password } = req.body;

        // const userRecord = await admin.auth().getUserByEmail(email);

        const userCredential: any = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
        const user = userCredential.user;

        const token = jwt.sign(
          {
            uid: user.uid,
            email: user.email,
          },
          secreteKey!
        );

        res.send(token);
      } catch (error) {
        res.send(500).send({ error: error });
      }
    },
  },
  {
    method: "post",
    route: "/api/v1/logout",
    handler: async (req: express.Request, res: express.Response) => {
      const authHeader = req.headers.authorization;

      const token = authHeader!.split(" ")[1];
      // JWT 토큰 검증
      const decodedToken = jwt.verify(token, secreteKey!);

      // Firebase Authentication에서 로그아웃
      await admin
        .auth()
        .revokeRefreshTokens((decodedToken as DecodedToken).uid);

      res.send({ data: "Logged out" });
    },
  },
];
export default authRoute;

type DecodedToken = { uid: string; email: string; iat: number };
