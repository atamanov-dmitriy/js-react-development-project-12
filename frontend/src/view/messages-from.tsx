import { Formik } from "formik";
import { useAppSelector } from "../@redux/hooks";
import { toast } from "react-toastify";
import type { FormikHelpers } from "formik";
import { usePostMessageMutation } from "../model/messages/messages.api";
import { Form, InputGroup } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";

const MessagesForm = () => {
  const channelId = useAppSelector(
    (state) => state.channels.selectedChannel,
  )?.id;

  const { username } = useAppSelector((state) => state.auth);

  const initialValues = {
    message: "",
  };

  const [postMessage] = usePostMessageMutation();

  const handleSubmit = async (
    { message }: typeof initialValues,
    { setFieldError, resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    if (!channelId) {
      toast.error("Канал не найден");
      return;
    }

    if (!username) {
      toast.error("Пользователь не найден");
      return;
    }

    try {
      await postMessage({
        body: message,
        channelId,
        username,
      }).unwrap();

      resetForm();
    } catch (error) {
      console.log(error);
      setFieldError("name", "Ошибка сети");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({ values, isSubmitting, errors, handleChange, handleSubmit }) => (
          <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <Form.Label className="visually-hidden" htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
            <InputGroup hasValidation>
              <Form.Control
                className="border-0 p-0 ps-2"
                autoComplete="off"
                value={values.message}
                name="message"
                onChange={handleChange}
                autoFocus
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={values.message === "" || isSubmitting}
              >
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">Отправить</span>
              </button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { MessagesForm };
