import { useNavigate } from "react-router-dom";
import { Router } from "../shared/consts";
import { Formik } from "formik";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { authActions } from "../features/model/auth/auth.slice";
import { usePostSignupMutation } from "../features/model/auth/auth.api";
import { useAppDispatch } from "../@redux/hooks";
import type { FormikHelpers } from "formik";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import * as yup from "yup";

const InputLength = {
  MIN: 3,
  MAX: 20,
};

const validationSchema = yup.object({
  username: yup
    .string()
    .test(
      "len",
      `От ${InputLength.MIN} до ${InputLength.MAX} символов`,
      (value) =>
        Boolean(
          value &&
          value.length >= InputLength.MIN &&
          value.length <= InputLength.MAX,
        ),
    )
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Имя пльзователя может содержать только буквы, цифры и подчеркивание",
    )
    .required("Обязательное поле"),

  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Введите пароль"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});

const PageSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postSignup] = usePostSignupMutation();

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
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
          setFieldError(
            "username",
            "Пользователь с таким именем уже существует",
          );
          setFieldError(
            "password",
            "Пользователь с таким именем уже существует",
          );
          return;
        }

        toast.error("Ошибка сети");
      });
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="/public/avatar_1-D7Cot-zE.jpg" alt="Войти" />
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
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <FloatingLabel className="mb-3" label="Ваш ник">
                      <Form.Control
                        id="username"
                        placeholder="Ваш ник"
                        autoComplete="username"
                        value={values.username}
                        name="username"
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback tooltip type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel className="mb-4" label="Пароль">
                      <Form.Control
                        id="password"
                        placeholder="Пароль"
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
                    <FloatingLabel className="mb-4" label="Пароль">
                      <Form.Control
                        id="confirmPassword"
                        placeholder="Подтвердите пароль"
                        autoComplete="current-password"
                        value={values.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                        type="password"
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback tooltip type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      Зарегистрироваться
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
