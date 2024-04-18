
import { Route, Routes } from "react-router-dom";
import Signup from "../component/signup/Signup";
import Login from "../component/login/Login";
import Forget_password from "../component/forget_password/Forget_password";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forget-password" element={<Forget_password/>} />
        <Route path="/signup" element={<Signup/>} />
        {/* <Route path="/products" element={<Products />} /> */}
      </Routes>
    </>
  );
}
export default AllRoutes;
