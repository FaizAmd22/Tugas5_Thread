import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailThread from "./component/detailThread/index";
import MainLayout from "./layouts/MainLayout";
import Follows from "./pages/follows/index";
import Home from "./pages/home/index";
import Login from "./pages/login/index";
import NotFound from "./pages/notFound/NotFound";
import Profile from "./pages/profile/index";
import Register from "./pages/register/index";
import Search from "./pages/search/index";
import { Navigate, Outlet } from "react-router-dom";

function IsNotLogin() {
  if (sessionStorage.token) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follows" element={<Follows />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/details/:id" element={<DetailThread />} />
        </Route>

        <Route path="/" element={<IsNotLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
