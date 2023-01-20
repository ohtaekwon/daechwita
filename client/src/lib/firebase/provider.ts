import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./firebase.config";

export const authService = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(authService, googleProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const githubProvider = new GithubAuthProvider();
