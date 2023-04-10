import { Route, Routes } from "react-router-dom";
import { Layout } from "components/Layout";
import Auth from "pages/Auth";

const DefaultRouter = () => {
  return (
    <Routes>
      <Route element={<Layout variant="default" />}>
        <Route path="/" element={<Auth />} />
      </Route>
    </Routes>
  );
};
export default DefaultRouter;
