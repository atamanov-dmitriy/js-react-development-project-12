import { useTranslation } from "react-i18next";
import { SignupForm } from "../view/signup-form/signup-form";

const PageSignUp = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src="/public/avatar_1-D7Cot-zE.jpg"
                  alt={t("page-sing-up.heading")}
                />
              </div>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageSignUp };
