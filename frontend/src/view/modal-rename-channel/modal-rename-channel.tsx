import { Formik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import type { FormikHelpers } from "formik";
import {
  useFetchChannelsQuery,
  usePatchChannelMutation,
} from "../../model/channels/channels.api";
import { channelsActions } from "../../model/channels/channels.slice";
import { useAppSelector, useAppDispatch } from "../../@redux/hooks";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import leoProfanity from "leo-profanity";
import { createValidationSchema } from "./modal-rename-channel.schema";

const ModalRenameChannel = () => {
  const { data: channels } = useFetchChannelsQuery();
  const [patchChannel] = usePatchChannelMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const validationSchema = createValidationSchema(t, channels);

  const closeModal = () => {
    dispatch(
      channelsActions.setIsModalRenameOpen({ isOpen: false, channel: null }),
    );
  };

  const { channel, isOpen } = useAppSelector(
    (state) => state.channels.modalRenameOpen,
  );

  const initialValues = { name: channel?.name ?? "" };

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>,
  ) => {
    if (channel === null) {
      setFieldError("name", t("page-index.renameForm.errorChannelNotFound"));
      return;
    }

    try {
      const name = leoProfanity.clean(values.name);
      const response = await patchChannel({ name, id: channel.id }).unwrap();

      dispatch(channelsActions.select(response));
      closeModal();
      toast.success(t("page-index.renameForm.success"));
    } catch (error) {
      console.log(error);
      setFieldError("name", t("page-index.renameForm.errorNetwork"));
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
        <Modal.Title>{t("page-index.renameForm.heading")}</Modal.Title>
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
                  {t("page-index.renameForm.label")}
                </Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={handleCancel}
                >
                  {t("page-index.renameForm.resetButton")}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {t("page-index.renameForm.submitButton")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export { ModalRenameChannel };
