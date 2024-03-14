import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../screens/Login";
import ProjectsSummary from "../screens/ProjectsSummary";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/ProjectsSummary" Component={ProjectsSummary} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
