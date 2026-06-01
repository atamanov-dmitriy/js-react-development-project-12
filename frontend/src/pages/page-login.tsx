import { Link, useNavigate } from "react-router-dom";
import { Router } from "../shared/consts";
import { Formik } from "formik";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { authActions } from "../model/auth/auth.slice";
import { usePostLoginMutation } from "../model/auth/auth.api";
import { useAppDispatch } from "../@redux/hooks";
import type { FormikHelpers } from "formik";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";

const PageLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postLogin] = usePostLoginMutation();
  const { t } = useTranslation();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>,
  ) => {
    postLogin(values)
      .unwrap()
      .then((response) => {
        dispatch(authActions.signIn(response));
        navigate(Router.ROOT);
      })
      .catch((error: FetchBaseQueryError) => {
        if (error.status === 401) {
          setFieldError("username", t("page-login.error401"));
          setFieldError("password", t("page-login.error401"));
          return;
        }

        toast.error(t("page-login.errorNetwork"));
      });
  };

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
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({
                  values,
                  isSubmitting,
                  errors,
                  handleChange,
                  handleSubmit,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-md-0"
                  >
                    <h1 className="text-center mb-4">
                      {t("page-login.heading")}
                    </h1>
                    <FloatingLabel
                      className="mb-3"
                      label={t("page-login.usernameLabel")}
                    >
                      <Form.Control
                        id="username"
                        placeholder={t("page-login.usernameLabel")}
                        autoComplete="username"
                        value={values.username}
                        name="username"
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      className="mb-4"
                      label={t("page-login.passwordLabel")}
                    >
                      <Form.Control
                        id="password"
                        placeholder={t("page-login.passwordLabel")}
                        autoComplete="current-password"
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                        type="password"
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback tooltip type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      {t("page-login.submitButton")}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t("page-login.footerSpan")}</span>{" "}
                <Link to={Router.SIGN_UP}>{t("page-login.footerLink")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageLogin };
