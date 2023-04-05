import * as express from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
const secreteKey = process.env.SECRET_KEY;

const verifyTokenAuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secreteKey!, (error, decoded) => {
      if (error) {
        res.status(401).send("토큰이 유효하지 않습니다.");
      } else {
        const decodeToken = decoded;
        console.log("decoded", decodeToken);
        (req as any).user = decoded; // 디코드한 JWT를 USER에 할당
        next();
      }
    });
  } else {
    res.status(401).send("인증이 필요합니다.");
  }
};
export default verifyTokenAuthMiddleware;
