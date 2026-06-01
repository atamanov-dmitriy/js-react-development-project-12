import { Formik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";
import type { FormikHelpers } from "formik";
import {
  useFetchChannelsQuery,
  usePatchChannelMutation,
} from "../model/channels/channels.api";
import { channelsActions } from "../model/channels/channels.slice";
import { useAppSelector, useAppDispatch } from "../@redux/hooks";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const InputLength = {
  MIN: 3,
  MAX: 20,
};

const ModalRenameChannel = () => {
  const { data: channels } = useFetchChannelsQuery();
  const [patchChannel] = usePatchChannelMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const closeModal = () => {
    dispatch(
      channelsActions.setIsModalRenameOpen({ isOpen: false, channel: null }),
    );
  };

  const { channel, isOpen } = useAppSelector(
    (state) => state.channels.modalRenameOpen,
  );

  const initialValues = { name: channel?.name ?? "" };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t("page-index.renameForm.required"))
      .test(
        "len",
        t("page-index.renameForm.minMax", {
          min: InputLength.MIN,
          max: InputLength.MAX,
        }),
        (value) =>
          value.length >= InputLength.MIN && value.length <= InputLength.MAX,
      )
      .notOneOf(
        channels ? channels.map(({ name }) => name) : [],
        t("page-index.renameForm.notOneOf"),
      ),
  });

  const handleSubmit = async (
    { name }: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>,
  ) => {
    if (channel === null) {
      setFieldError("name", t("page-index.renameForm.errorChannelNotFound"));
      return;
    }

    try {
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
              <Form.Control
                className="mb-2"
                id="name"
                autoComplete="off"
                value={values.name}
                name="name"
                onChange={handleChange}
                isInvalid={!!errors.name}
                autoFocus
              />
              <Form.Label className="visually-hidden" htmlFor="name">
                {t("page-index.renameForm.label")}
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
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
