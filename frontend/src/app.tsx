import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PageLogin } from "./pages/page-login";
import { PageNotFound } from "./pages/page-not-found";
import { MainLayout } from "./widgets/main-layout";
import { PageIndex } from "./pages/page-index";
import { Router } from "./shared/consts";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "admin",
            password: "admin",
          }),
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={Router.ROOT} element={<PageIndex />} />
          <Route path={Router.LOGIN} element={<PageLogin />} />
          <Route path={Router.NOT_FOUND} element={<PageNotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
