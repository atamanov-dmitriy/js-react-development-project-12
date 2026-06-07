import { Formik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import type { FormikHelpers } from "formik";
import {
  useFetchChannelsQuery,
  usePostChannelMutation,
} from "../../model/channels/channels.api";
import { channelsActions } from "../../model/channels/channels.slice";
import { useAppSelector, useAppDispatch } from "../../@redux/hooks";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import leoProfanity from "leo-profanity";
import { createValidationSchema } from "./modal-add-channel.schema";

const ModalAddChannel = () => {
  const { data: channels } = useFetchChannelsQuery();
  const [postChannel] = usePostChannelMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const validationSchema = createValidationSchema(t, channels);

  const closeModal = () => {
    dispatch(channelsActions.setIsModalAddOpen(false));
  };

  const { isOpen } = useAppSelector((state) => state.channels.modalAddOpen);

  const initialValues = { name: "" };

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>,
  ) => {
    const name = leoProfanity.clean(values.name);

    try {
      const channel = await postChannel({ name }).unwrap();

      dispatch(channelsActions.select(channel));
      closeModal();
      toast.success(t("page-index.addForm.success"));
    } catch (error) {
      console.log(error);
      setFieldError("name", t("page-index.addForm.errorNetwork"));
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleHide = () => {
    closeModal();
  };

  return (
    <Modal show={isOpen} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("page-index.addForm.heading")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
        >
          {({ values, isSubmitting, errors, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="position-relative mb-2">
                <Form.Control
                  autoComplete="off"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  autoFocus
                />
                <Form.Label className="visually-hidden">
                  {t("page-index.addForm.label")}
                </Form.Label>
                <Form.Control.Feedback tooltip type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={handleCancel}
                >
                  {t("page-index.addForm.resetButton")}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {t("page-index.addForm.submitButton")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export { ModalAddChannel };
