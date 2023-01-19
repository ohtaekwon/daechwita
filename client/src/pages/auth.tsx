import React, { SyntheticEvent } from "react";
import Button from "_common/components/button";

const Auth = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChange = (e: SyntheticEvent) => {
    // console.log((e.target as HTMLInputElement).name);
    const {
      target: { name, value },
    } = e as any;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Auth 페이지 입니다.</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email.."
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password..."
          onChange={onChange}
          required
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <Button variant={"primary"}>Continue with Google</Button>
        <Button variant={"primary"}>Continue with Github</Button>
      </div>
    </>
  );
};

export default Auth;
