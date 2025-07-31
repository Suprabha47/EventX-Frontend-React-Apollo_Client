import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
};
export default HomePage;
