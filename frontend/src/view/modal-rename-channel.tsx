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

const InputLength = {
  MIN: 3,
  MAX: 20,
};

const ModalRenameChannel = () => {
  const { data: channels } = useFetchChannelsQuery();
  const [patchChannel] = usePatchChannelMutation();
  const dispatch = useAppDispatch();

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
      .required("Обязательное поле")
      .test(
        "len",
        `От ${InputLength.MIN} до ${InputLength.MAX} символов`,
        (value) =>
          value.length >= InputLength.MIN && value.length <= InputLength.MAX,
      )
      .notOneOf(
        channels ? channels.map(({ name }) => name) : [],
        "Должно быть уникальным",
      ),
  });

  const handleSubmit = async (
    { name }: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>,
  ) => {
    if (channel === null) {
      setFieldError("name", "Канал не найден");
      return;
    }

    try {
      const response = await patchChannel({ name, id: channel.id }).unwrap();

      dispatch(channelsActions.select(response));
      closeModal();
      toast.success("Канал переименован");
    } catch (error) {
      console.log(error);
      setFieldError("name", "Ошибка сети");
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
        <Modal.Title>Переименовать канал</Modal.Title>
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
                Имя канала
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
                  Отменить
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Отправить
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
