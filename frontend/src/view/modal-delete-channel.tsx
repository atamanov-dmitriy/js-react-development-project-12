import { Modal, Button } from "react-bootstrap";
import {
  useDeleteChannelMutation,
  useLazyFetchChannelsQuery,
} from "../model/channels/channels.api";
import { channelsActions } from "../model/channels/channels.slice";
import { useAppSelector, useAppDispatch } from "../@redux/hooks";
import { toast } from "react-toastify";
import {
  useDeleteMessageMutation,
  useFetchMessagesQuery,
} from "../model/messages/messages.api";
import { useTranslation } from "react-i18next";

const ModalDeleteChannel = () => {
  const dispatch = useAppDispatch();

  const [fetchChannels] = useLazyFetchChannelsQuery();
  const [deleteChannel] = useDeleteChannelMutation();
  const { data: messages } = useFetchMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();
  const { t } = useTranslation();

  const { id, isOpen } = useAppSelector(
    (state) => state.channels.modalDeleteOpen,
  );

  const { selectedChannel } = useAppSelector((state) => state.channels);

  const deleteMessages = () => {
    if (messages === undefined) {
      return [];
    }

    return messages
      .filter(({ channelId }) => channelId === id)
      .map(({ id }) => deleteMessage({ id }).unwrap());
  };

  const closeModal = () => {
    dispatch(channelsActions.setIsModalDeleteOpen({ isOpen: false, id: null }));
  };

  const handleDelete = async () => {
    if (id === null) {
      toast.error(t("page-index.deleteForm.errorIdNotFound"));
      return;
    }

    try {
      await Promise.all([...deleteMessages(), deleteChannel({ id }).unwrap()]);

      closeModal();
      toast.success(t("page-index.deleteForm.success"));

      if (id !== selectedChannel?.id) {
        return;
      }

      const channels = await fetchChannels().unwrap();
      if (channels[0]) {
        dispatch(channelsActions.select(channels[0]));
      }
    } catch (error) {
      console.log(error);
      toast.error(t("page-index.deleteForm.errorNetwork"));
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
        <Modal.Title>{t("page-index.deleteForm.heading")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t("page-index.deleteForm.lead")}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            {t("page-index.deleteForm.resetButton")}
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={false}
            onClick={handleDelete}
          >
            {t("page-index.deleteForm.submitButton")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { ModalDeleteChannel };
