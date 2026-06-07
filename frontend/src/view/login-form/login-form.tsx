import { useNavigate } from "react-router-dom";
import { Router } from "../../shared/consts";
import { Formik } from "formik";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { authActions } from "../../model/auth/auth.slice";
import { usePostLoginMutation } from "../../model/auth/auth.api";
import { useAppDispatch } from "../../@redux/hooks";
import type { FormikHelpers } from "formik";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";
import { createValidationSchema } from "./login-form.schema";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postLogin] = usePostLoginMutation();
  const { t } = useTranslation();
  const validationSchema = createValidationSchema(t);

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
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      {({ values, isSubmitting, errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">{t("page-login.heading")}</h1>
          <FloatingLabel
            controlId="username"
            className="mb-3"
            label={t("page-login.usernameLabel")}
          >
            <Form.Control
              placeholder={t("page-login.usernameLabel")}
              autoComplete="off"
              value={values.username}
              name="username"
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            {errors.password !== errors.username && (
              <Form.Control.Feedback tooltip type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            className="mb-4"
            label={t("page-login.passwordLabel")}
          >
            <Form.Control
              placeholder={t("page-login.passwordLabel")}
              autoComplete="off"
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
  );
};

export { LoginForm };
