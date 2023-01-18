import React from "react";
import Layout from "../components/layout";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// import { auth } from "../firebase.config";

const Home = () => {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const [user, setUser] = React.useState({});

  // onAuthStateChanged(auth, (currentUser: any) => {
  //   setUser(currentUser);
  // });

  const register = async () => {
    // try {
    //   const user = await createUserWithEmailAndPassword(
    //     auth,
    //     registerEmail,
    //     registerPassword
    //   );
    //   console.log(user);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const login = async () => {};
  const logout = async () => {};

  return (
    <Layout variant="default">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h3>회원가입</h3>
          <input
            placeholder="Email.."
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password..."
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          <button onClick={register}>회원가입</button>
        </div>
        <div>
          <h3>Login</h3>
          <input
            placeholder="Email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <button>Login</button>
        </div>

        <h4>logged In :</h4>
        {(user as any).email}
        <button>로그아웃</button>
      </div>
    </Layout>
  );
};
export default Home;
