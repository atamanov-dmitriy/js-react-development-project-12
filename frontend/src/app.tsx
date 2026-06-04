import type { FC, PropsWithChildren } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PageLogin } from "./pages/page-login";
import { PageNotFound } from "./pages/page-not-found";
import { MainLayout } from "./view/main-layout";
import { PageIndex } from "./pages/page-index";
import { Router } from "./shared/consts";
import { useAppSelector } from "./@redux/hooks";
import { ModalAddChannel } from "./view/modal-add-channel/modal-add-channel";
import { ModalRenameChannel } from "./view/modal-rename-channel/modal-rename-channel";
import { ModalDeleteChannel } from "./view/modal-delete-channel";
import { PageSignUp } from "./pages/page-signup";

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
          <Route path={Router.SIGNUP} element={<PageSignUp />} />
          <Route path={Router.NOT_FOUND} element={<PageNotFound />} />
          <Route
            path={Router.ROOT}
            element={
              <PrivateRouter>
                <PageIndex />
                <ModalAddChannel />
                <ModalRenameChannel />
                <ModalDeleteChannel />
              </PrivateRouter>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
