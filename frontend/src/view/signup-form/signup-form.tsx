import { useNavigate } from "react-router-dom";
import { Router } from "../../shared/consts";
import { Formik } from "formik";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { authActions } from "../../model/auth/auth.slice";
import { usePostSignupMutation } from "../../model/auth/auth.api";
import { useAppDispatch } from "../../@redux/hooks";
import type { FormikHelpers } from "formik";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";
import {
  PasswordLength,
  UsernameLength,
  createValidationSchema,
} from "./signup-form.schema";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postSignup] = usePostSignupMutation();
  const { t } = useTranslation();
  const validationSchema = createValidationSchema(t);

  const initialValues = {
    username: "",
    password: "",
    confirm: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>,
  ) => {
    postSignup(values)
      .unwrap()
      .then((response) => {
        dispatch(authActions.signIn(response));
        navigate(Router.ROOT);
      })
      .catch((error: FetchBaseQueryError) => {
        if (error.status === 409) {
          setFieldError("username", t("page-sing-up.error409"));
          return;
        }

        toast.error(t("page-sing-up.errorNetwork"));
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
          <h1 className="text-center mb-4">{t("page-sing-up.heading")}</h1>
          <FloatingLabel
            controlId="username"
            className="mb-3"
            label={t("page-sing-up.usernameLabel")}
          >
            <Form.Control
              placeholder={t("page-sing-up.usernameMinMax", {
                min: UsernameLength.MIN,
                max: UsernameLength.MAX,
              })}
              autoComplete="off"
              value={values.username}
              name="username"
              onChange={handleChange}
              isInvalid={!!errors.username}
              autoFocus
            />
            <Form.Control.Feedback tooltip type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            className="mb-4"
            label={t("page-sing-up.passwordLabel")}
          >
            <Form.Control
              placeholder={t("page-sing-up.passwordMinMax", {
                min: PasswordLength.MIN,
              })}
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
          <FloatingLabel
            controlId="confirm"
            className="mb-4"
            label={t("page-sing-up.confirmLabel")}
          >
            <Form.Control
              placeholder={t("page-sing-up.confirmOneOf")}
              autoComplete="off"
              value={values.confirm}
              name="confirm"
              onChange={handleChange}
              type="password"
              isInvalid={!!errors.confirm}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {errors.confirm}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
            disabled={isSubmitting}
          >
            {t("page-sing-up.submitButton")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { SignupForm };
