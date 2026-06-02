import { useNavigate } from "react-router-dom";
import { Router } from "../shared/consts";
import { Formik } from "formik";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { authActions } from "../model/auth/auth.slice";
import { usePostSignupMutation } from "../model/auth/auth.api";
import { useAppDispatch } from "../@redux/hooks";
import type { FormikHelpers } from "formik";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const UsernameLength = {
  MIN: 3,
  MAX: 20,
};

const PasswordLength = {
  MIN: 6,
};

const PageSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postSignup] = usePostSignupMutation();
  const { t } = useTranslation();

  const validationSchema = yup.object({
    username: yup
      .string()
      .test(
        "len",
        t("page-sing-up.usernameMinMax", {
          min: UsernameLength.MIN,
          max: UsernameLength.MAX,
        }),
        (value) =>
          !!(
            value &&
            value.length >= UsernameLength.MIN &&
            value.length <= UsernameLength.MAX
          ),
      )
      .matches(/^[a-zA-Z0-9_]+$/, t("page-sing-up.usernameMatches")),

    password: yup.string().test(
      "len",
      t("page-sing-up.passwordMinMax", {
        min: PasswordLength.MIN,
      }),
      (value) => !!(value && value.length >= PasswordLength.MIN),
    ),

    confirm: yup
      .string()
      .test(
        "passwords-match",
        t("page-sing-up.confirmOneOf"),
        function (value) {
          return !!(value && this.parent.password === value);
        },
      ),
  });

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
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
              >
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
                      {t("page-sing-up.heading")}
                    </h1>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageSignUp };
