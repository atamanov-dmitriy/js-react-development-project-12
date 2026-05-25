import { Modal, Button } from "react-bootstrap";
import { useDeleteChannelMutation } from "../features/model/channels/channels.api";
import { channelsActions } from "../features/model/channels/channels.slice";
import { useAppSelector, useAppDispatch } from "../@redux/hooks";
import { toast } from "react-toastify";

const ModalDeleteChannel = () => {
  const [deleteChannel] = useDeleteChannelMutation();
  const dispatch = useAppDispatch();

  const { id, isOpen } = useAppSelector(
    (state) => state.channels.modalDeleteOpen,
  );
  const closeModal = () => {
    dispatch(channelsActions.setIsModalDeleteOpen({ isOpen: false, id: null }));
  };

  const handleDelete = async () => {
    if (id === null) {
      toast.error("Неверный id канала");
      return;
    }

    try {
      await deleteChannel({ id }).unwrap();

      closeModal();
      toast.success("Канал удалён");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка сети");
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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Отменить
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={false}
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { ModalDeleteChannel };
