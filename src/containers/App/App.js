import "./App.module.scss";
// import ScrollToTop from "../../hooks/ScrollToTop";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Header from "../../containers/Header/Header";
import Footer from "../Footer/Footer";
import PageHome from "../../pages/PageHome/PageHome";
import PageArchive from "../../pages/PageArchive/PageArchive";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <Header />
        <Routes>
          <Route index element={<PageHome />} />
          <Route path="/archive" element={<PageArchive />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
