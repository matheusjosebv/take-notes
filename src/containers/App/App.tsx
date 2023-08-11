import "./App.module.scss";
import ScrollToTop from "../../hooks/ScrollToTop";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import PageHome from "../../pages/PageHome/PageHome";
import PageArchive from "../../pages/PageArchive/PageArchive";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route index element={<PageHome />} />
          <Route path="/archive" element={<PageArchive />} />
          <Route path="*" element={<PageHome />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
