import { Link } from "react-router-dom";
import { Router } from "../shared/consts";
import { useTranslation } from "react-i18next";
import { LoginForm } from "../view/login-form/login-form";

const PageLogin = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src="/public/avatar-DIE1AEpS.jpg"
                  className="rounded-circle"
                  alt={t("page-login.heading")}
                />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t("page-login.footerSpan")}</span>{" "}
                <Link to={Router.SIGNUP}>{t("page-login.footerLink")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageLogin };
