import { Formik } from "formik";
import { useAppSelector } from "../@redux/hooks";
import { toast } from "react-toastify";
import type { FormikHelpers } from "formik";
import { usePostMessageMutation } from "../model/messages/messages.api";
import { Form, InputGroup } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import filter from "leo-profanity";

const MessagesForm = () => {
  const channelId = useAppSelector(
    (state) => state.channels.selectedChannel,
  )?.id;

  const { username } = useAppSelector((state) => state.auth);

  const initialValues = {
    message: "",
  };

  const { t } = useTranslation();

  const [postMessage] = usePostMessageMutation();

  const handleSubmit = async (
    { message }: typeof initialValues,
    { setFieldError, resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    if (!channelId) {
      toast.error(t("page-index.errorChannelNotFound"));
      return;
    }

    if (!username) {
      toast.error(t("page-index.errorUserNotFound"));
      return;
    }

    const body = filter.clean(message);
    try {
      await postMessage({
        body,
        channelId,
        username,
      }).unwrap();

      resetForm();
    } catch (error) {
      console.log(error);
      setFieldError("name", t("page-index.errorNetwork"));
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
                aria-label={t("page-index.messageAriaLabel")}
                placeholder={t("page-index.messagePlaceholder")}
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={values.message === "" || isSubmitting}
              >
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">
                  {t("page-index.messageSubmit")}
                </span>
              </button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { MessagesForm };
