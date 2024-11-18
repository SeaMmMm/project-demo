import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import pageData from "./pageData.json";

const ContentPage = () => {
  const pageInfo = pageData[location.pathname.split("/").pop()];

  return (
    <>
      <Header />
      <Outlet />
      <Footer
        data={{ description: pageInfo.description, codeurl: pageInfo.url }}
        index={pageInfo.number}
      />
    </>
  );
};

export default ContentPage;
