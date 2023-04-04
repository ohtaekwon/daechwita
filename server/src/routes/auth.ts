import * as express from "express";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "../firebase";
import admin from "../firebaseAdmin";

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

        const userResponse = await admin.auth().createUser({
          email,
          password,
          emailVerified: false,
          disabled: false,
        });
        admin.dbService;

        console.log(userResponse);

        // const userResponse = await createUserWithEmailAndPassword(
        //   authService,
        //   email,
        //   password
        // );

        res.send({ data: userResponse });
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
        const {
          body: { email, password },
        } = req;

        const userResponse = await admin.auth().signUser(email, password);

        res.send({ data: userResponse });
      } catch (error) {
        res.send(500).send({ error: error });
      }
    },
  },
];
export default authRoute;
