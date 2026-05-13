import { Link, useNavigate } from "react-router-dom";
import { Router } from "../shared/consts";
import { Formik, type FormikHelpers } from "formik";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppDispatch } from "../@redux/hooks";
import { authActions } from "../features/api/auth.slice";
import { postLogin } from "../features/api/auth";
import { AxiosError } from "axios";

const PageLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>,
  ) => {
    return postLogin(values)
      .then((response) => {
        // setToken(JSON.stringify(response.data));
        dispatch(authActions.signIn(response));
        navigate(Router.ROOT);
      })
      .catch((error) => {
        if (!(error instanceof AxiosError)) {
          return;
        }

        console.error(error);

        if (error.message === "Network Error") {
          toast.error("Ошибка сети");
          return;
        }

        if (error.response?.data.statusCode === 401) {
          setFieldError("username", "Неверное имя пользователя или пароль");
          setFieldError("password", "Неверное имя пользователя или пароль");
        }
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
                  alt="Войти"
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
                    <h1 className="text-center mb-4">Войти</h1>
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
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      Войти
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>{" "}
                <Link to={Router.SIGN_UP}>Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageLogin };
