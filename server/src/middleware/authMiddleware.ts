import * as express from "express";
import admin from "../firebaseAdmin";

const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header is missing or invalid");
    }
    const idToken = authorizationHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).decodedToken = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase Auth middleware error:", error);
    res.status(401).send({ error: "Unauthorized" });
  }
};

export default authMiddleware;
