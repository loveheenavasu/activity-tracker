import { Route, Routes, HashRouter } from "react-router-dom";
import Login from "../screens/Login";
import ProjectsSummary from "../screens/ProjectsSummary";

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/ProjectsSummary" Component={ProjectsSummary} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
