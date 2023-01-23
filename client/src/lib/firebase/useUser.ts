import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useUser = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return { logout };
};

export default useUser;
