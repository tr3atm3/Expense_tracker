import { Navigate, Outlet, Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { useContext } from "react";
import appContext from "./components/context/appContext";

const PrivateRoute = () => {
  let ctx = useContext(appContext);
  return ctx.userLoginInfo !== null ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mt-12">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
