import type { FC, PropsWithChildren } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PageLogin } from "./pages/page-login";
import { PageNotFound } from "./pages/page-not-found";
import { MainLayout } from "./widgets/main-layout";
import { PageIndex } from "./pages/page-index";
import { Router } from "./shared/consts";
import { useAppSelector } from "./@redux/hooks";

const PrivateRouter: FC<PropsWithChildren> = ({ children }) => {
  const isAuthorized = useAppSelector((state) => state.auth.token) !== null;
  return isAuthorized ? children : <Navigate to={Router.LOGIN} replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={Router.LOGIN} element={<PageLogin />} />
          <Route path={Router.NOT_FOUND} element={<PageNotFound />} />
          <Route
            path={Router.ROOT}
            element={
              <PrivateRouter>
                <PageIndex />
              </PrivateRouter>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
